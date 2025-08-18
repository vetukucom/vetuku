"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import AdCard from "./ad-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { SearchFilters } from "./search-filters"

interface Ad {
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

interface SearchResultsProps {
  filters: SearchFilters
  viewMode?: "grid" | "list"
}

export default function SearchResults({ filters, viewMode = "grid" }: SearchResultsProps) {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const limit = 12

  const fetchAds = async (pageNum = 0, append = false) => {
    try {
      if (pageNum === 0) setLoading(true)
      else setLoadingMore(true)

      let query = supabase
        .from("ads")
        .select("*", { count: "exact" })
        .eq("is_active", true)
        .range(pageNum * limit, (pageNum + 1) * limit - 1)

      // Apply filters
      if (filters.query) {
        query = query.or(`title.ilike.%${filters.query}%,description.ilike.%${filters.query}%`)
      }

      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`)
      }

      if (filters.category) {
        query = query.eq("category_id", filters.category)
      }

      if (filters.condition) {
        query = query.eq("condition", filters.condition)
      }

      if (filters.isFeatured) {
        query = query.eq("is_featured", true)
      }

      // Price range filter
      if (filters.priceMin > 0) {
        query = query.gte("price", filters.priceMin)
      }
      if (filters.priceMax < 10000000) {
        query = query.lte("price", filters.priceMax)
      }

      // Sorting
      if (filters.sortBy === "price" || filters.sortBy === "views_count" || filters.sortBy === "created_at") {
        query = query.order(filters.sortBy, { ascending: filters.sortOrder === "asc" })
      } else if (filters.sortBy === "title") {
        query = query.order("title", { ascending: filters.sortOrder === "asc" })
      }

      // Always sort featured ads first
      query = query.order("is_featured", { ascending: false })

      const { data, error, count } = await query

      if (error) {
        console.error("Error fetching ads:", error)
      } else {
        const newAds = data || []
        if (append) {
          setAds((prev) => [...prev, ...newAds])
        } else {
          setAds(newAds)
          setTotalCount(count || 0)
        }
        setHasMore(newAds.length === limit)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    setPage(0)
    fetchAds(0, false)
  }, [filters])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchAds(nextPage, true)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Search Results</h2>
          <p className="text-gray-600">{totalCount} ads found</p>
        </div>
      </div>

      {/* Results */}
      {ads.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">No ads found</div>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center">
              <Button onClick={loadMore} disabled={loadingMore} variant="outline" size="lg">
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
