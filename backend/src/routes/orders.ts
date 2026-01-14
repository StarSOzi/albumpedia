import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Create order
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { albumModelId, categoryIds, deliveryAddress, paymentMethod } = req.body;

    if (!userId || !albumModelId || !deliveryAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get album model
    const albumModel = await prisma.albumModel.findUnique({
      where: { id: albumModelId },
    });

    if (!albumModel) {
      return res.status(404).json({ error: 'Album model not found' });
    }

    // Calculate total price
    let totalPrice = albumModel.basePrice;

    const orderItems = await Promise.all(
      categoryIds.map(async (categoryId: string) => {
        const category = await prisma.albumCategory.findUnique({
          where: { id: categoryId },
        });

        if (!category) {
          throw new Error('Category not found');
        }

        totalPrice += category.priceModifier;

        return {
          categoryId,
          price: category.priceModifier,
        };
      })
    );

    // Generate order number (e.g., ORD-2024-001)
    const orderCount = await prisma.order.count();
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(orderCount + 1).padStart(3, '0')}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        albumModelId,
        totalPrice,
        deliveryAddress,
        paymentMethod: paymentMethod || 'COD',
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            category: true,
          },
        },
      },
    });

    res.status(201).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user orders
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            category: true,
          },
        },
        albumModel: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get order details
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const order = await prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: {
          include: {
            category: true,
          },
        },
        albumModel: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
