import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { AdListing } from "@/components/ad-listing";
import SearchFilters from "@/components/search-filters";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3, List } from "lucide-react";
import Link from "next/link";

interface ItemsPageProps {
  searchParams: {
    q?: string;
    category?: string;
    location?: string;
    min_price?: string;
    max_price?: string;
    condition?: string;
    sort?: string;
    view?: string;
    page?: string;
  };
}

export default async function ItemsPage({ searchParams }: ItemsPageProps) {
  const supabase = await createClient();
  if (!supabase) {
    return <div className="min-h-screen flex items-center justify-center">Database connection error</div>;
  }
  // Get total count for pagination
  const { count } = await supabase
    .from("ads")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Items</h1>
              <p className="text-gray-600 mt-1">
                Browse {count?.toLocaleString()} active listings across all categories
              </p>
            </div>
            <Link href="/create-ad">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Post Free Ad
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <Suspense fallback={<div>Loading filters...</div>}>
                <SearchFilters onFiltersChange={() => {}} />
              </Suspense>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Toggle and Sort */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <div className="flex border rounded-md">
                    <Link
                      href={{ pathname: "/items", query: { ...searchParams, view: "grid" } }}
                      className={`p-2 ${searchParams.view !== "list" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Link>
                    <Link
                      href={{ pathname: "/items", query: { ...searchParams, view: "list" } }}
                      className={`p-2 border-l ${searchParams.view === "list" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <List className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    className="border rounded-md px-3 py-1 text-sm"
                    defaultValue={searchParams.sort || "newest"}
                    onChange={(e) => {
                      const url = new URL(window.location.href)
                      url.searchParams.set("sort", e.target.value)
                      window.location.href = url.toString()
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Items Listing */}
            <Suspense fallback={<div className="text-center py-8">Loading items...</div>}>
              <AdListing
                searchParams={searchParams}
                viewMode={searchParams.view === "list" ? "list" : "grid"}
                showFilters={false}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
