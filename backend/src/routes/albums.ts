import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all album models (public)
router.get('/models', async (req: Request, res: Response) => {
  try {
    const albumModels = await prisma.albumModel.findMany({
      include: {
        categoryOptions: true,
      },
    });

    res.json({ albumModels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create album model (admin only - later)
router.post('/models', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description, size, basePrice } = req.body;

    if (!name || !size || !basePrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const albumModel = await prisma.albumModel.create({
      data: {
        name,
        description,
        size,
        basePrice: parseFloat(basePrice),
      },
    });

    res.status(201).json({ albumModel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get categories for an album model
router.get('/models/:id/categories', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const categories = await prisma.albumCategory.findMany({
      where: { albumModelId: id },
    });

    res.json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add category to album model
router.post('/models/:id/categories', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, priceModifier } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Missing category name' });
    }

    const category = await prisma.albumCategory.create({
      data: {
        name,
        priceModifier: parseFloat(priceModifier || '0'),
        albumModelId: id,
      },
    });

    res.status(201).json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
