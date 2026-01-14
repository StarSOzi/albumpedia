'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Albumpedia</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.firstName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-xl font-semibold mb-4">Hoş Geldiniz!</h2>
            <p className="text-gray-600 mb-4">
              Albüm siparişi oluşturmaya başlamak için aşağıdaki bölümleri kullanabilirsiniz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Yeni Sipariş</h3>
                <p className="text-gray-600 mb-4">Albüm seçin, dosyalarınızı yükleyin</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Sipariş Oluştur
                </button>
              </div>

              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Siparişlerim</h3>
                <p className="text-gray-600 mb-4">Geçmiş siparişleri görüntüleyin</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Siparişleri Gör
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
