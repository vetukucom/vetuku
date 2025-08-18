"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import AdCard from "./ad-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

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

interface AdListingProps {
  categoryId?: string
  searchQuery?: string
  limit?: number
  searchParams?: any
  viewMode?: "grid" | "list"
  showFilters?: boolean
}

export default function AdListing({
  categoryId,
  searchQuery,
  limit = 12,
  searchParams,
  viewMode = "grid",
  showFilters = true,
}: AdListingProps) {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const fetchAds = async (pageNum = 0, append = false) => {
    try {
      if (pageNum === 0) setLoading(true)
      else setLoadingMore(true)

      let query = supabase
        .from("ads")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false })
        .range(pageNum * limit, (pageNum + 1) * limit - 1)

      if (categoryId) {
        query = query.eq("category_id", categoryId)
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching ads:", error)
      } else {
        const newAds = data || []
        if (append) {
          setAds((prev) => [...prev, ...newAds])
        } else {
          setAds(newAds)
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
  }, [categoryId, searchQuery])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchAds(nextPage, true)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 rounded-t-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (ads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">No ads found</div>
        <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
      </div>
    )
  }

  return (
    <div>
      <div
        className={`grid gap-6 ${
          viewMode === "list" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} viewMode={viewMode} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
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
    </div>
  )
}

export { AdListing }
