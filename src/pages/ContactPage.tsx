import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const contactInfo = [
    { icon: Phone, title: 'ስልክ', details: ['+251 9X XXX XXXX', '+251 9X XXX XXXX'], color: 'text-blue-600' },
    { icon: Mail, title: 'ኢሜይል', details: ['info@grocery.com', 'support@grocery.com'], color: 'text-red-600' },
    { icon: MapPin, title: 'አድራሻ', details: ['ቦሌ, አዲስ አበባ', 'ኢትዮጵያ'], color: 'text-green-600' },
    { icon: Clock, title: 'የስራ ሰዓት', details: ['ሰኞ - ቅዳሜ: 8:00 - 22:00', 'እሁድ: 9:00 - 21:00'], color: 'text-purple-600' },
  ]

  return (
    <div className="container-custom py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">አግኙን</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ማንኛውም ጥያቄ ወይም አስተያየት ካለዎት እባክዎ ያነጋግሩን።
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <div key={index} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon size={20} className={info.color} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm mt-1">{detail}</p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">መልእክት ይላኩ</h2>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="ሙሉ ስም"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="ኢሜይል"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="ስልክ ቁጥር"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="መልእክት..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              ላክ
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}