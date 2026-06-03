export default function TermsPage() {
  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">ውሎች እና ሁኔታዎች</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. አጠቃላይ መረጃ</h2>
            <p className="text-gray-600 leading-relaxed">
              እንኳን ወደ የግሮሰሪ መደብር በደህና መጡ። እባክዎ አገልግሎታችንን ከመጠቀምዎ በፊት እነዚህን ውሎች እና ሁኔታዎች በጥንቃቄ ያንብቡ።
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. የአገልግሎት ውሎች</h2>
            <p className="text-gray-600 leading-relaxed">
              የግሮሰሪ መደብር ምርቶችን በመስመር ላይ ለመሸጥ የሚያስችል መድረክ ነው። አገልግሎታችንን በመጠቀም እነዚህን ውሎች እንደተቀበሉ ይቆጠራል።
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. ምዝገባ እና መለያ</h2>
            <p className="text-gray-600 leading-relaxed">
              አገልግሎታችንን ለመጠቀም መለያ መፍጠር ያስፈልጋል። እባክዎ ትክክለኛ እና ወቅታዊ መረጃ ማቅረብዎን ያረጋግጡ። የመለያዎትን ደህንነት ማስጠበቅ የእርስዎ ኃላፊነት ነው።
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. ትዕዛዝ እና ክፍያ</h2>
            <p className="text-gray-600 leading-relaxed">
              ትዕዛዞች የሚረጋገጡት ምርቶቹ በእጃችን ሲገኙ ነው። ክፍያ የሚከፈለው ምርቶቹ ሲደርሱ በጥሬ ገንዘብ ነው (Cash on Delivery)።
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. ዴሊቨሪ</h2>
            <p className="text-gray-600 leading-relaxed">
              ዴሊቨሪ በአዲስ አበባ ውስጥ ከ60 ደቂቃ በላይ አይወስድም። ከከተማ ውጪ ባሉ አካባቢዎች ግን እንደ ርቀቱ ጊዜ ሊወስድ ይችላል። የዴሊቨሪ ክፍያ 50 ብር ሲሆን ከ5,000 ብር በላይ ለሆነ ግዢ ነጻ ነው።
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. መሰረዝ እና መመለስ</h2>
            <p className="text-gray-600 leading-relaxed">
              ትዕዛዝ መሰረዝ የሚቻለው ከመዘጋጀቱ በፊት ብቻ ነው። ጉድለት ያለባቸው ምርቶች ከተገኙ በ24 ሰዓት ውስጥ ሪፖርት ማድረግ ይችላሉ።
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. ግላዊነት</h2>
            <p className="text-gray-600 leading-relaxed">
              የእርስዎ ግላዊ መረጃ እንደ ግላዊነት ፖሊሲአችን ይያዛል። እባክዎ ለበለጠ መረጃ የግላዊነት ፖሊሲያችንን ይመልከቱ።
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. ለውጦች</h2>
            <p className="text-gray-600 leading-relaxed">
              እነዚህን ውሎች በማንኛውም ጊዜ የመቀየር መብቱ የተጠበቀ ነው። ለውጦች በዚህ ገጽ ላይ ይታተማሉ።
            </p>
          </section>

          <div className="bg-gray-50 p-4 rounded-xl mt-6">
            <p className="text-gray-500 text-sm">
              የመጨረሻ ማሻሻያ: {new Date().toLocaleDateString('am-ET')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}