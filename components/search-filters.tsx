"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Filter } from "lucide-react"

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void
  initialFilters?: SearchFilters
}

export interface SearchFilters {
  query: string
  location: string
  category: string
  priceMin: number
  priceMax: number
  condition: string
  sortBy: string
  sortOrder: "asc" | "desc"
  isFeatured?: boolean
}

const INDIAN_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan-Dombivli",
  "Vasai-Virar",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
]

const CONDITIONS = ["New", "Like New", "Excellent", "Good", "Fair"]

const SORT_OPTIONS = [
  { value: "created_at", label: "Date Posted" },
  { value: "price", label: "Price" },
  { value: "views_count", label: "Popularity" },
  { value: "title", label: "Title" },
]

export default function SearchFilters({ onFiltersChange, initialFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>(
    initialFilters || {
      query: "",
      location: "",
      category: "",
      priceMin: 0,
      priceMax: 10000000,
      condition: "",
      sortBy: "created_at",
      sortOrder: "desc",
      isFeatured: false,
    },
  )

  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([filters.priceMin, filters.priceMax])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    const newFilters = { ...filters, priceMin: values[0], priceMax: values[1] }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: filters.query, // Keep search query
      location: "",
      category: "",
      priceMin: 0,
      priceMax: 10000000,
      condition: "",
      sortBy: "created_at",
      sortOrder: "desc",
      isFeatured: false,
    }
    setFilters(clearedFilters)
    setPriceRange([0, 10000000])
    onFiltersChange(clearedFilters)
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) return "₹1Cr+"
    if (price >= 100000) return `₹${(price / 100000).toFixed(0)}L`
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`
    return `₹${price}`
  }

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full justify-center">
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filters */}
      <div className={`space-y-4 ${showFilters ? "block" : "hidden md:block"}`}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Location Filter */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {INDIAN_CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <Label>Price Range</Label>
              <div className="px-2 py-4">
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={10000000}
                  min={0}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select value={filters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  {CONDITIONS.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Featured Only */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={filters.isFeatured}
                onCheckedChange={(checked) => handleFilterChange("isFeatured", checked)}
              />
              <Label htmlFor="featured" className="text-sm">
                Featured ads only
              </Label>
            </div>

            {/* Sort Options */}
            <div>
              <Label htmlFor="sort">Sort By</Label>
              <div className="flex gap-2">
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={filters.sortOrder}
                  onValueChange={(value: "asc" | "desc") => handleFilterChange("sortOrder", value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">↓</SelectItem>
                    <SelectItem value="asc">↑</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
