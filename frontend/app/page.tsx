export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">Albumpedia</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Albüm Portalı
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Fotoğrafçılar için modern albüm sipariş sistemi
          </p>

          <div className="flex justify-center space-x-4">
            <a
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Giriş Yap
            </a>
            <a
              href="/register"
              className="bg-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold"
            >
              Kayıt Ol
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">📸 Kolay Siparişler</h3>
            <p className="text-gray-600">
              Kendi albüm modelinizi seçin ve özelleştirin
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">📦 Dosya Yükleme</h3>
            <p className="text-gray-600">
              2GB'ye kadar ZIP dosyası yükleyin
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">📊 Takip Sistemi</h3>
            <p className="text-gray-600">
              Sipariş durumunuzu canlı olarak takip edin
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
