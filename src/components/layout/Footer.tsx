
import { FaFacebook, FaInstagram, FaXTwitter,  } from 'react-icons/fa6';
import { Link } from 'react-router-dom'
import {  Mail, Phone, MapPin } from 'lucide-react'
import { APP_NAME } from '@/constants/config'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-3">{APP_NAME}</h3>
            <p className="text-gray-600 text-sm">
              ጥራት ያላቸውን ምርቶች በተመጣጣኝ ዋጋ ወደ ቤትዎ እናደርሳለን
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">ፈጣን አገናኞች</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-green-600 text-sm">ስለ እኛ</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-green-600 text-sm">አግኙን</Link></li>
              <li><Link to="/help" className="text-gray-600 hover:text-green-600 text-sm">እርዳታ</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-green-600 text-sm">ውሎች እና ሁኔታዎች</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-green-600 text-sm">ግላዊነት ፖሊሲ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">አግኙን</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone size={16} />
                <span>+251 9X XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail size={16} />
                <span>info@{APP_NAME.toLowerCase().replace(/\s/g, '')}.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin size={16} />
                <span>አዲስ አበባ, ኢትዮጵያ</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">ተከታተሉን</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition">
                <FaFacebook size={20} className="text-gray-600" />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition">
                <FaXTwitter size={20} className="text-gray-600" />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition">
                <FaInstagram size={20} className="text-gray-600" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 mt-8 border-t border-gray-100 text-gray-500 text-sm">
          © {new Date().getFullYear()} {APP_NAME}. ሁሉም መብቶች ተጠብቀዋል
        </div>
      </div>
    </footer>
  )
}