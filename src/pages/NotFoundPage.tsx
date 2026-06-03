import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="container-custom py-12 sm:py-20">
      <div className="text-center max-w-md mx-auto">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">ገጹ አልተገኘም</h2>
        <p className="text-gray-500 mb-8">
          እንደአጋጣሚ ሆኖ እየፈለጉት ያለው ገጽ አልተገኘም። እባክዎ የፈለጉት አድራሻ ትክክል መሆኑን ያረጋግጡ።
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <ArrowLeft size={18} />
            ተመለስ
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Home size={18} />
            ወደ መነሻ
          </button>
        </div>
      </div>
    </div>
  )
}