import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function HelpFaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'ትዕዛዝ እንዴት ማስገባት እችላለሁ?',
      answer: 'ምርቶችን ወደ ቅርጫት ይጨምሩ፣ ከዚያ ወደ ግዢ ሂደት በመሄድ አድራሻዎን ያስገቡ እና ትዕዛዝ ያስገቡ።',
    },
    {
      question: 'ዴሊቨሪ ምን ያህል ጊዜ ይወስዳል?',
      answer: 'በአዲስ አበባ ውስጥ ትዕዛዝ ከገባ በ60 ደቂቃ ውስጥ ይደርሳል። ከከተማ ውጪ ባሉ አካባቢዎች እንደ ርቀቱ 2-3 ቀናት ሊወስድ ይችላል።',
    },
    {
      question: 'የዴሊቨሪ ክፍያ ምን ያህል ነው?',
      answer: 'የዴሊቨሪ ክፍያ 50 ብር ነው። ነገር ግን ከ5,000 ብር በላይ ለሆነ ግዢ ነጻ ነው።',
    },
    {
      question: 'ክፍያ እንዴት እከፍላለሁ?',
      answer: 'በአሁኑ ጊዜ ክፍያ የሚከፈለው ምርቶቹ ሲደርሱ በጥሬ ገንዘብ ነው (Cash on Delivery)።',
    },
    {
      question: 'ትዕዛዜን መሰረዝ እችላለሁን?',
      answer: 'አዎ፣ ትዕዛዝዎ "pending" ወይም "confirmed" ሁኔታ ላይ እስካለ ድረስ መሰረዝ ይችላሉ።',
    },
    {
      question: 'ምርቶቹ ጉድለት ካለባቸው ምን ማድረግ አለብኝ?',
      answer: 'እባክዎ ወዲያውኑ በስልክ ቁጥር +251 9X XXX XXXX ወይም በኢሜይል support@grocery.com ያነጋግሩን።',
    },
  ]

  return (
    <div className="container-custom py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">እርዳታ እና ተደጋጋሚ ጥያቄዎች</h1>
        <p className="text-gray-600">በተደጋጋሚ የሚጠየቁ ጥያቄዎች መልስ ያግኙ</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-3">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-gray-800 text-left">{faq.question}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-50 rounded-xl mt-1">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still Need Help */}
      <div className="text-center mt-10 p-6 bg-green-50 rounded-2xl">
        <h3 className="font-semibold text-gray-800 mb-2">አሁንም እርዳታ ይፈልጋሉ?</h3>
        <p className="text-gray-600 text-sm mb-4">እባክዎ ያነጋግሩን በደስታ እንረዳዎታለን</p>
        <button
          onClick={() => window.location.href = '/contact'}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          አግኙን
        </button>
      </div>
    </div>
  )
}