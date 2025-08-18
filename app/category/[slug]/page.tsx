import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdListing from "@/components/ad-listing"
import { createClient } from "@/lib/supabase/server"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = createClient()

  if (!supabase) {
    return <div>Database connection error</div>
  }

  // Fetch category details
  const { data: category, error } = await supabase.from("categories").select("*").eq("slug", params.slug).single()

  if (error || !category) {
    notFound()
  }

  // Fetch subcategories
  const { data: subcategories } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_id", category.id)
    .order("name")

  // Get ad count for this category
  const { count: adCount } = await supabase
    .from("ads")
    .select("*", { count: "exact", head: true })
    .eq("category_id", category.id)
    .eq("is_active", true)

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
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category Header */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600 mt-1">{category.description}</p>
              <p className="text-sm text-gray-500 mt-2">{adCount || 0} ads available</p>
            </div>
          </div>

          {/* Subcategories */}
          {subcategories && subcategories.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3">Browse Subcategories</h3>
              <div className="flex flex-wrap gap-2">
                {subcategories.map((subcat) => (
                  <a
                    key={subcat.id}
                    href={`/category/${subcat.slug}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <span className="mr-1">{subcat.icon}</span>
                    {subcat.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ads Listing */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Latest Ads</h2>
            <div className="text-sm text-gray-500">{adCount || 0} results</div>
          </div>
          <AdListing categoryId={category.id} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
