import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Eye, Edit, Trash2, TrendingUp, Users, Heart } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient();

  if (!supabase) {
    return <div>Database connection error</div>;
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  // Fetch user's ads
  const { data: ads } = await supabase
    .from("ads")
    .select(`
      *,
      categories (name, icon)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Get statistics
  const totalAds = ads?.length || 0
  const activeAds = ads?.filter((ad) => ad.is_active)?.length || 0
  const totalViews = ads?.reduce((sum, ad) => sum + (ad.views_count || 0), 0) || 0
  const featuredAds = ads?.filter((ad) => ad.is_featured)?.length || 0

  const formatPrice = (price: number, currency: string) => {
    if (currency === "INR") {
      return `₹${price.toLocaleString("en-IN")}`
    }
    return `${currency} ${price.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {profile?.full_name || user.email}</p>
          </div>
          <Link href="/create-ad">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Post New Ad
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Ads</p>
                  <p className="text-2xl font-bold text-gray-900">{totalAds}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Ads</p>
                  <p className="text-2xl font-bold text-gray-900">{activeAds}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Featured</p>
                  <p className="text-2xl font-bold text-gray-900">{featuredAds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="ads">My Ads</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="ads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Advertisements</CardTitle>
              </CardHeader>
              <CardContent>
                {ads && ads.length > 0 ? (
                  <div className="space-y-4">
                    {ads.map((ad) => (
                      <div
                        key={ad.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                            {ad.images && ad.images.length > 0 ? (
                              <img
                                src={ad.images[0] || "/placeholder.svg"}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{ad.title}</h3>
                              {ad.is_featured && <Badge className="bg-orange-500">Featured</Badge>}
                              <Badge variant={ad.is_active ? "default" : "secondary"}>
                                {ad.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {ad.categories?.icon} {ad.categories?.name} • {ad.location}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="font-semibold text-blue-600">{formatPrice(ad.price, ad.currency)}</span>
                              <span className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {ad.views_count || 0}
                              </span>
                              <span>{formatDate(ad.created_at)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/ad/${ad.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/edit-ad/${ad.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No ads yet</h3>
                    <p className="text-gray-600 mb-4">Start by creating your first advertisement</p>
                    <Link href="/create-ad">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Ad
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">{profile?.full_name || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{profile?.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-gray-900">{profile?.location || "Not provided"}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications about your ads</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Privacy Settings</h4>
                      <p className="text-sm text-gray-600">Control who can see your information</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Account Security</h4>
                      <p className="text-sm text-gray-600">Change password and security settings</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
