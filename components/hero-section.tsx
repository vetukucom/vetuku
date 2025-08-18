import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Everything You Need</h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">Buy, sell, and discover amazing deals in your city</p>

        {/* Enhanced Search */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-4 shadow-lg">
          <form action="/search" method="GET" className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                name="q"
                placeholder="What are you looking for?"
                className="pl-10 pr-4 py-3 text-gray-900 border-gray-300 rounded-lg w-full h-12"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="pl-10 pr-4 py-3 text-gray-900 border-gray-300 rounded-lg w-full h-12"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 px-8 py-3 text-lg font-semibold h-12">
              Search
            </Button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <div>
            <div className="text-3xl font-bold">10M+</div>
            <div className="text-blue-200">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold">50M+</div>
            <div className="text-blue-200">Ads Posted</div>
          </div>
          <div>
            <div className="text-3xl font-bold">500+</div>
            <div className="text-blue-200">Cities</div>
          </div>
          <div>
            <div className="text-3xl font-bold">40+</div>
            <div className="text-blue-200">Categories</div>
          </div>
        </div>
      </div>
    </section>
  )
}
