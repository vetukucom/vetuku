import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold">Vetuku</span>
            </div>
            <p className="text-gray-400 text-sm">
              India's leading classifieds platform. Buy, sell, and discover amazing deals in your city.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white">
                  Safety Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/category/cars" className="hover:text-white">
                  Cars
                </Link>
              </li>
              <li>
                <Link href="/category/real-estate" className="hover:text-white">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="hover:text-white">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/jobs" className="hover:text-white">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Vetuku. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
