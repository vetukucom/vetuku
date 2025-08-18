"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchFilters from "@/components/search-filters"
import SearchResults from "@/components/search-results"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Grid, List } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const [filters, setFilters] = useState({
    query: searchParams.get("q") || "",
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    priceMin: Number.parseInt(searchParams.get("priceMin") || "0"),
    priceMax: Number.parseInt(searchParams.get("priceMax") || "10000000"),
    condition: searchParams.get("condition") || "",
    sortBy: searchParams.get("sortBy") || "created_at",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    isFeatured: searchParams.get("featured") === "true",
  })

  const [searchQuery, setSearchQuery] = useState(filters.query)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, query: searchQuery }))
  }

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)

    // Update URL params
    const params = new URLSearchParams()
    if (newFilters.query) params.set("q", newFilters.query)
    if (newFilters.location) params.set("location", newFilters.location)
    if (newFilters.category) params.set("category", newFilters.category)
    if (newFilters.priceMin > 0) params.set("priceMin", newFilters.priceMin.toString())
    if (newFilters.priceMax < 10000000) params.set("priceMax", newFilters.priceMax.toString())
    if (newFilters.condition) params.set("condition", newFilters.condition)
    if (newFilters.sortBy !== "created_at") params.set("sortBy", newFilters.sortBy)
    if (newFilters.sortOrder !== "desc") params.set("sortOrder", newFilters.sortOrder)
    if (newFilters.isFeatured) params.set("featured", "true")

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, "", newUrl)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search for products, services and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
              Search
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters onFiltersChange={handleFiltersChange} initialFilters={filters} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* View Mode Toggle */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{filters.query ? `Results for "${filters.query}"` : "All Ads"}</h1>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <SearchResults filters={filters} viewMode={viewMode} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
