import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MapPin, Clock, Eye, Heart, Share2, Phone, MessageCircle, Shield } from "lucide-react"
import { Suspense } from "react"
import AdListing from "@/components/ad-listing"

interface AdPageProps {
  params: {
    id: string
  }
}

export default async function AdPage({ params }: AdPageProps) {
  const supabase = createClient()

  if (!supabase) {
    return <div>Database connection error</div>
  }

  try {
    console.log("[v0] Fetching ad with ID:", params.id)

    // Fetch ad details with category and user info
    const { data: ads, error } = await supabase
      .from("ads")
      .select(`
        *,
        categories (name, slug, icon),
        user_profiles (full_name, avatar_url, location, rating, total_reviews, is_verified)
      `)
      .eq("id", params.id)
      .eq("is_active", true)

    console.log("[v0] Database query result:", { ads, error })

    if (error) {
      console.error("[v0] Database error:", error)
      notFound()
    }

    // Check if ad exists
    if (!ads || ads.length === 0) {
      console.log("[v0] No ad found with ID:", params.id)
      notFound()
    }

    const ad = ads[0]
    console.log("[v0] Found ad:", ad.title)

    try {
      await supabase
        .from("ads")
        .update({ views_count: (ad.views_count || 0) + 1 })
        .eq("id", params.id)
    } catch (viewError) {
      console.error("[v0] Error updating view count:", viewError)
      // Don't fail the page load if view count update fails
    }

    const formatPrice = (price: number, currency: string) => {
      if (currency === "INR") {
        return `₹${price.toLocaleString("en-IN")}`
      }
      return `${currency} ${price.toLocaleString()}`
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${ad.categories.slug}`}>{ad.categories.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">{ad.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-[16/10] bg-gray-200 rounded-lg overflow-hidden">
                    {ad.images && ad.images.length > 0 ? (
                      <img
                        src={ad.images[0] || "/placeholder.svg"}
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No Image Available</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ad Details */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {ad.is_featured && <Badge className="bg-orange-500 hover:bg-orange-600">Featured</Badge>}
                        {ad.condition && <Badge variant="secondary">{ad.condition}</Badge>}
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{ad.title}</h1>
                      <div className="text-3xl font-bold text-blue-600 mb-4">{formatPrice(ad.price, ad.currency)}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {ad.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDate(ad.created_at)}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {ad.views_count} views
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{ad.description}</p>
                  </div>

                  {ad.tags && ad.tags.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {ad.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Ad ID:</span>
                        <p className="font-medium">#{ad.id.slice(0, 8)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Category:</span>
                        <p className="font-medium">{ad.categories.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Condition:</span>
                        <p className="font-medium">{ad.condition || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Views:</span>
                        <p className="font-medium">{ad.views_count} times</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Similar Items</h3>
                  <Suspense fallback={<div>Loading similar items...</div>}>
                    <AdListing categoryId={ad.category_id} limit={4} viewMode="grid" showFilters={false} />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Seller */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>

                  {/* Seller Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      {ad.user_profiles?.avatar_url ? (
                        <img
                          src={ad.user_profiles.avatar_url || "/placeholder.svg"}
                          alt={ad.user_profiles.full_name || "User"}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 font-semibold">
                          {ad.user_profiles?.full_name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold">{ad.user_profiles?.full_name || "Anonymous"}</span>
                        {ad.user_profiles?.is_verified && <Shield className="h-4 w-4 text-green-500 ml-1" />}
                      </div>
                      {ad.user_profiles?.location && (
                        <p className="text-sm text-gray-600">{ad.user_profiles.location}</p>
                      )}
                      {ad.user_profiles?.rating && (
                        <p className="text-sm text-gray-600">
                          ⭐ {ad.user_profiles.rating} ({ad.user_profiles.total_reviews} reviews)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Seller
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Tips */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    Safety Tips
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Meet in a public place</li>
                    <li>• Check the item before payment</li>
                    <li>• Don't pay in advance</li>
                    <li>• Report suspicious activity</li>
                    <li>• Trust your instincts</li>
                    <li>• Bring a friend if possible</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Report This Ad</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Help us maintain a safe marketplace by reporting suspicious or inappropriate content.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Report Ad
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error("[v0] Error in AdPage:", error)
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ad Not Found</h1>
            <p className="text-gray-600 mb-6">The ad you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
