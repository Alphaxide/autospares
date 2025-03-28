"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Sample brands data
const brandsData = [
  {
    id: 1,
    name: "Bosch",
    logo: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Global leader in automotive parts and technology",
    categories: ["Engine Parts", "Electrical", "Brakes", "Filters"],
    featured: true,
  },
  {
    id: 2,
    name: "NGK",
    logo: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Specializing in spark plugs and ignition systems",
    categories: ["Spark Plugs", "Ignition", "Sensors"],
    featured: true,
  },
  {
    id: 3,
    name: "Denso",
    logo: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Japanese automotive components manufacturer",
    categories: ["Air Conditioning", "Electrical", "Engine Parts"],
    featured: true,
  },
  {
    id: 4,
    name: "Continental",
    logo: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Premium tires and automotive technology",
    categories: ["Tires", "Brakes", "Electronics"],
    featured: false,
  },
  {
    id: 5,
    name: "Valeo",
    logo: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Innovative automotive systems and equipment",
    categories: ["Lighting", "Wipers", "Electrical"],
    featured: false,
  },
  {
    id: 6,
    name: "Brembo",
    logo: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=200&h=200&auto=format&fit=crop",
    description: "High-performance braking systems",
    categories: ["Brakes", "Discs", "Calipers"],
    featured: true,
  },
  {
    id: 7,
    name: "Delphi",
    logo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Advanced automotive technology solutions",
    categories: ["Fuel Systems", "Engine Management", "Electrical"],
    featured: false,
  },
  {
    id: 8,
    name: "Sachs",
    logo: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Clutch and suspension components specialist",
    categories: ["Clutch", "Suspension", "Shock Absorbers"],
    featured: false,
  },
  {
    id: 9,
    name: "Hella",
    logo: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Lighting and electronic components",
    categories: ["Lighting", "Electronics", "Sensors"],
    featured: true,
  },
  {
    id: 10,
    name: "Mahle",
    logo: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Engine components and filtration systems",
    categories: ["Engine Parts", "Filters", "Pistons"],
    featured: false,
  },
  {
    id: 11,
    name: "SKF",
    logo: "https://images.unsplash.com/photo-1530046339915-78e95328dd1f?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Bearings, seals, and lubrication systems",
    categories: ["Bearings", "Seals", "Drivetrain"],
    featured: false,
  },
  {
    id: 12,
    name: "Gates",
    logo: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=200&h=200&auto=format&fit=crop",
    description: "Belts, hoses, and fluid power products",
    categories: ["Belts", "Hoses", "Cooling"],
    featured: false,
  },
]

// All unique categories from brands
const allCategories = Array.from(new Set(brandsData.flatMap((brand) => brand.categories))).sort()

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // Filter brands based on search query, category, and featured status
  const filteredBrands = brandsData.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory ? brand.categories.includes(selectedCategory) : true

    const matchesFeatured = showFeaturedOnly ? brand.featured : true

    return matchesSearch && matchesCategory && matchesFeatured
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Brands</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover quality automotive parts from the world's leading manufacturers. We partner with trusted brands to
            bring you reliable and high-performance components for your vehicle.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search brands..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <select
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={showFeaturedOnly}
                  onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                />
                <span>Featured Brands Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-transform hover:shadow-md hover:-translate-y-1"
              >
                <div className="p-4 flex items-center justify-center h-48 bg-gray-50">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    width={150}
                    height={150}
                    className="object-contain max-h-32"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{brand.name}</h3>
                    {brand.featured && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {brand.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/brands/${brand.id}`}>View Products</Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No brands found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                  setShowFeaturedOnly(false)
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

