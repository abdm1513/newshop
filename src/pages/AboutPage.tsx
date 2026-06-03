import { Store, Truck, Award, Users } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: Store,
      title: 'ጥራት ያላቸው ምርቶች',
      description: 'ከምርጥ አቅራቢዎች የምናመጣቸው ጥራት ያላቸው ምርቶች',
    },
    {
      icon: Truck,
      title: 'ፈጣን ዴሊቨሪ',
      description: 'በአዲስ አበባ ውስጥ በ60 ደቂቃ ውስጥ ይደርሳል',
    },
    {
      icon: Award,
      title: 'ምርጥ አገልግሎት',
      description: 'ደንበኞቻችንን በቅድሚያ እናስቀምጣለን',
    },
    {
      icon: Users,
      title: 'ልምድ ያላቸው ሰራተኞች',
      description: 'ልምድ ያላቸው ሰራተኞች ለአገልግሎት ዝግጁ ናቸው',
    },
  ]

  return (
    <div className="container-custom py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">ስለ እኛ</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          የግሮሰሪ መደብር በ2015 ዓ.ም ተመስርቶ ጥራት ያላቸውን ምርቶች በተመጣጣኝ ዋጋ ለደንበኞች በማድረስ ላይ ይገኛል።
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-green-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">ተልዕኮአችን</h2>
          <p className="text-gray-600 leading-relaxed">
            ጥራት ያላቸውን ምርቶች በተመጣጣኝ ዋጋ እና ፈጣን አገልግሎት ለደንበኞቻችን ማድረስ።
          </p>
        </div>
        <div className="bg-green-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">ራዕያችን</h2>
          <p className="text-gray-600 leading-relaxed">
            በኢትዮጵያ ውስጥ ቀዳሚ የመስመር ላይ የግሮሰሪ መደብር መሆን።
          </p>
        </div>
      </div>
    </div>
  )
}