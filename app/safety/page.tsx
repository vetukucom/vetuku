import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Safety Tips</h1>
          <p className="text-xl text-gray-600">
            Your safety is our priority. Follow these guidelines for secure transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="w-6 h-6 mr-2" />
                Do's
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Meet in public places during daylight hours</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bring a friend or family member with you</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Inspect items thoroughly before purchasing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Use secure payment methods</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Trust your instincts - if something feels wrong, walk away</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Keep records of all communications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <XCircle className="w-6 h-6 mr-2" />
                Don'ts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Never meet at your home or invite strangers over</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Don't share personal financial information</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Avoid wire transfers or money orders</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Don't pay in advance for items you haven't seen</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Never give out your passwords or login details</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Don't ignore red flags or suspicious behavior</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Secure Transactions</h3>
              <p className="text-sm text-gray-600">Use verified payment methods and avoid cash when possible</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Stay Vigilant</h3>
              <p className="text-sm text-gray-600">Be aware of common scams and trust your instincts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Community Support</h3>
              <p className="text-sm text-gray-600">Report suspicious activity to help keep our community safe</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Common Scams to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Advance Payment Scams</h4>
                <p className="text-yellow-700 text-sm">
                  Scammers ask for payment before you can see the item. Always inspect items in person before paying.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Fake Payment Confirmations</h4>
                <p className="text-yellow-700 text-sm">
                  Fraudsters send fake payment screenshots. Always verify payments through official channels.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Overpayment Scams</h4>
                <p className="text-yellow-700 text-sm">
                  Buyers offer to pay more than asking price and request refund of difference. This is always a scam.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Phishing Attempts</h4>
                <p className="text-yellow-700 text-sm">
                  Fake emails or messages asking for login credentials. We never ask for passwords via email.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
