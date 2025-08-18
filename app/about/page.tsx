import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Vetuku</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's leading classifieds platform connecting millions of buyers and sellers across the country.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, Vetuku started with a simple mission: to make buying and selling easier for everyone in
              India. What began as a small startup has grown into one of the country's most trusted classifieds
              platforms.
            </p>
            <p className="text-gray-600 mb-4">
              Today, we serve millions of users across 500+ cities, facilitating transactions worth billions of rupees
              annually. Our platform hosts everything from cars and real estate to electronics and fashion.
            </p>
            <p className="text-gray-600">
              We're committed to building a safe, transparent, and efficient marketplace that empowers individuals and
              businesses to connect and transact with confidence.
            </p>
          </div>
          <div>
            <img src="/placeholder-71qek.png" alt="Vetuku Office" className="rounded-lg shadow-lg w-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">10M+</h3>
              <p className="text-gray-600">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">50M+</h3>
              <p className="text-gray-600">Ads Posted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="text-gray-600">Cities Covered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">40+</h3>
              <p className="text-gray-600">Categories</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Trust & Safety</h3>
              <p className="text-gray-600">
                We prioritize user safety with verified listings, secure transactions, and comprehensive safety
                guidelines.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate with AI-powered features, smart search, and user-friendly interfaces.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-gray-600">
                We believe in building strong communities where people can connect, trade, and grow together.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
