import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdCardProps {
  ad: {
    id: string
    title: string
    description: string
    price: number
    currency: string
    location: string
    images: string[]
    condition: string
    created_at: string
    is_featured: boolean
    views_count: number
  }
  viewMode?: "grid" | "list"
}

export default function AdCard({ ad, viewMode = "grid" }: AdCardProps) {
  const formatPrice = (price: number, currency: string) => {
    if (currency === "INR") {
      return `₹${price.toLocaleString("en-IN")}`
    }
    return `${currency} ${price.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow group">
        <CardContent className="p-0">
          <div className="flex">
            {/* Image */}
            <div className="w-48 flex-shrink-0">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                {ad.images && ad.images.length > 0 ? (
                  <img
                    src={ad.images[0] || "/placeholder.svg"}
                    alt={ad.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 relative">
              {/* Featured Badge */}
              {ad.is_featured && (
                <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">Featured</Badge>
              )}

              {/* Price */}
              <div className="text-xl font-bold text-blue-600 mb-2">{formatPrice(ad.price, ad.currency)}</div>

              {/* Title */}
              <Link href={`/ad/${ad.id}`}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
                  {ad.title}
                </h3>
              </Link>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{ad.description}</p>

              {/* Condition Badge */}
              {ad.condition && (
                <Badge variant="secondary" className="mb-3">
                  {ad.condition}
                </Badge>
              )}

              {/* Location, Date, and Views */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {ad.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(ad.created_at)}
                  </div>
                  <div>{ad.views_count} views</div>
                </div>
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow group">
      <CardContent className="p-0">
        <div className="relative">
          {/* Image */}
          <div className="aspect-[4/3] bg-gray-200 rounded-t-lg overflow-hidden">
            {ad.images && ad.images.length > 0 ? (
              <img
                src={ad.images[0] || "/placeholder.svg"}
                alt={ad.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </div>

          {/* Featured Badge */}
          {ad.is_featured && (
            <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">Featured</Badge>
          )}

          {/* Favorite Button */}
          <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 h-auto">
            <Heart className="h-4 w-4" />
          </Button>

          {/* Condition Badge */}
          {ad.condition && (
            <Badge variant="secondary" className="absolute bottom-2 left-2">
              {ad.condition}
            </Badge>
          )}
        </div>

        <div className="p-4">
          {/* Price */}
          <div className="text-xl font-bold text-blue-600 mb-2">{formatPrice(ad.price, ad.currency)}</div>

          {/* Title */}
          <Link href={`/ad/${ad.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
              {ad.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ad.description}</p>

          {/* Location and Date */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {ad.location}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatDate(ad.created_at)}
            </div>
          </div>

          {/* Views */}
          <div className="mt-2 text-xs text-gray-400">{ad.views_count} views</div>
        </div>
      </CardContent>
    </Card>
  )
}
