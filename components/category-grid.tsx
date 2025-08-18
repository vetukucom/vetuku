"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase/client"
import {
  Car,
  Home,
  Smartphone,
  Laptop,
  Shirt,
  Sofa,
  Briefcase,
  GraduationCap,
  Heart,
  Baby,
  Gamepad2,
  Book,
  Wrench,
  Bike,
  PawPrint,
  Music,
  Camera,
  Dumbbell,
  Plane,
  Gift,
  ShoppingBag,
  Utensils,
} from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  parent_id: string | null
}

const categoryIcons: { [key: string]: any } = {
  cars: Car,
  motorcycles: Bike,
  "real-estate": Home,
  mobiles: Smartphone,
  electronics: Laptop,
  fashion: Shirt,
  furniture: Sofa,
  jobs: Briefcase,
  education: GraduationCap,
  matrimonial: Heart,
  kids: Baby,
  sports: Dumbbell,
  books: Book,
  services: Wrench,
  pets: PawPrint,
  music: Music,
  cameras: Camera,
  travel: Plane,
  gifts: Gift,
  shopping: ShoppingBag,
  food: Utensils,
  games: Gamepad2,
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase.from("categories").select("*").is("parent_id", null).order("name")

        if (error) {
          console.error("Error fetching categories:", error)
        } else {
          setCategories(data || [])
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category) => {
        const IconComponent = categoryIcons[category.slug] || ShoppingBag

        return (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  {category.icon && !categoryIcons[category.slug] ? (
                    <div className="text-3xl">{category.icon}</div>
                  ) : (
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
