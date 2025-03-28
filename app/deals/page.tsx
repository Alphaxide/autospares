"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ChevronDown, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { toast } from "@/hooks/use-toast"

// Sample deals data
const dealsData = [
  {
    id: 1,
    name: "Bosch Spark Plug Set (4 pieces)",
    image: "https://images.unsplash.com/photo-1635784063388-1ff609e4e0d1?q=80&w=300&h=300&auto=format&fit=crop",
    originalPrice: 4800,
    discountedPrice: 3600,
    discountPercentage: 25,
    category: "Engine Parts",
    brand: "Bosch",
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    featured: true,
    stock: 15,
    sold: 85,
  },
  {
    id: 2,
    name: "Premium Brake Pad Set",
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=300&h=300&auto=format&fit=crop",
    originalPrice: 7500,
    discountedPrice: 5250,
    discountPercentage: 30,
    category: "Brake Systems",
    brand: "Brembo",
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    featured: true,
    stock: 8,
    sold: 42,
  },
  {
    id: 3,
    name: "LED Headlight Upgrade Kit",
    image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=300&h=300&auto=format&fit=crop",
    originalPrice: 12000,
    discountedPrice: 8400,
    discountPercentage: 30,
    category: "Lighting",
    brand: "Hella",
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    featured: true,
    stock: 5,
    sold: 35,
  },
  {
    id: 4,
    name: "Performance Air Filter",
    image: "https://images.unsplash.com/photo-1620085790206-7a8a6547dc05?q=80&w=300&h=300&auto=format&fit=crop",
    originalPrice: 3500,
    discountedPrice: 2800,
    discountPercentage: 20,
    category: "Engine Parts",
    brand: "K&N",
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    featured: false,
    stock: 20,
    sold: 30,
  },
  {
    id: 5,
    name: "Shock Absorber Set (2 pieces)",
    image: "https://images.unsplash.com/photo-1537041373723-5a3677a1807f?q=80&w=300&h=300&auto=format&fit=crop",
    originalPrice: 9000,
    discountedPrice: 6750,
    discountPercentage: 25,
    category: "Suspension",
    brand: "Sachs",
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    featured: false,
    stock: 12,
    sold: 28,
  },
  {
    id: 6,
    name: "Engine Oil 5W-30 (5L)",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=300&h=300&auto=format&fit=crop",
    originalPrice: 4500,
    discountedPrice: 3150,
    discountPercentage: 30,
    category: "Oils & Fluids",
    brand: "Castrol",
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    featured: true,
    stock: 25,
    sold: 75,
  },
  {
    id: 7,
    name: "Car Battery 60Ah",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=300&h=300&auto=format&fit=crop",
    originalPrice: 15000,
    discountedPrice: 12000,
    discountPercentage: 20,
    category: "Electrical",
    brand: "Bosch",
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    featured: false,
    stock: 10,
    sold: 20,
  },
  {
    id: 8,
    name: "Timing Belt Kit",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=300&h=300&auto=format&fit=crop",
    originalPrice: 8500,
    discountedPrice: 5950,
    discountPercentage: 30,
    category: "Engine Parts",
    brand: "Gates",
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    featured: false,
    stock: 7,
    sold: 23,
  },
]

// Get all unique categories and brands
const allCategories = Array.from(new Set(dealsData.map((deal) => deal.category))).sort()
const allBrands = Array.from(new Set(dealsData.map((deal) => deal.brand))).sort()

export default function DealsPage() {
  const { addToCart } = useCart()
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({})
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<string>("discount")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // Update countdown timers
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: number]: string } = {}

      dealsData.forEach((deal) => {
        const now = new Date()
        const endTime = new Date(deal.endTime)
        const diff = endTime.getTime() - now.getTime()

        if (diff <= 0) {
          newTimeLeft[deal.id] = "Expired"
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

          if (days > 0) {
            newTimeLeft[deal.id] = `${days}d ${hours}h left`
          } else if (hours > 0) {
            newTimeLeft[deal.id] = `${hours}h ${minutes}m left`
          } else {
            newTimeLeft[deal.id] = `${minutes}m left`
          }
        }
      })

      setTimeLeft(newTimeLeft)
    }, 60000) // Update every minute

    // Initial calculation
    const initialTimeLeft: { [key: number]: string } = {}
    dealsData.forEach((deal) => {
      const now = new Date()
      const endTime = new Date(deal.endTime)
      const diff = endTime.getTime() - now.getTime()

      if (diff <= 0) {
        initialTimeLeft[deal.id] = "Expired"
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
          initialTimeLeft[deal.id] = `${days}d ${hours}h left`
        } else if (hours > 0) {
          initialTimeLeft[deal.id] = `${hours}h ${minutes}m left`
        } else {
          initialTimeLeft[deal.id] = `${minutes}m left`
        }
      }
    })
    setTimeLeft(initialTimeLeft)

    return () => clearInterval(timer)
  }, [])

  // Filter and sort deals
  const filteredDeals = dealsData.filter((deal) => {
    const matchesCategory = selectedCategory ? deal.category === selectedCategory : true
    const matchesBrand = selectedBrand ? deal.brand === selectedBrand : true
    const matchesFeatured = showFeaturedOnly ? deal.featured : true

    return matchesCategory && matchesBrand && matchesFeatured
  })

  // Sort deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        return b.discountPercentage - a.discountPercentage
      case "price-low":
        return a.discountedPrice - b.discountedPrice
      case "price-high":
        return b.discountedPrice - a.discountedPrice
      case "ending-soon":
        return new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
      default:
        return 0
    }
  })

  const handleAddToCart = (deal: (typeof dealsData)[0]) => {
    addToCart({
      id: deal.id,
      name: deal.name,
      price: deal.originalPrice,
      discountedPrice: deal.discountedPrice,
      image: deal.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${deal.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Deals & Offers</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Take advantage of our limited-time offers on quality auto parts. Save big on premium brands and keep your
            vehicle running at its best for less.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>

              <div
                className={`md:flex items-center gap-4 ${showFilters ? "flex flex-col md:flex-row mt-4 md:mt-0" : "hidden"}`}
              >
                <div>
                  <select
                    className="h-9 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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

                <div>
                  <select
                    className="h-9 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={selectedBrand || ""}
                    onChange={(e) => setSelectedBrand(e.target.value || null)}
                  >
                    <option value="">All Brands</option>
                    {allBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={showFeaturedOnly}
                    onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  />
                  <span className="text-sm">Featured Only</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                className="h-9 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="discount">Biggest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="ending-soon">Ending Soon</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedDeals.length > 0 ? (
            sortedDeals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1">
                <div className="relative">
                  <div className="absolute top-2 left-2 z-10">
                    <Badge className="bg-red-500 hover:bg-red-600">-{deal.discountPercentage}%</Badge>
                  </div>
                  {deal.featured && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="outline" className="bg-white">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <Link href={`/product/${deal.id}`}>
                    <div className="h-48 relative">
                      <Image src={deal.image || "/placeholder.svg"} alt={deal.name} fill className="object-cover" />
                    </div>
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="flex items-center text-white">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{timeLeft[deal.id] || "Loading..."}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">
                      {deal.brand} • {deal.category}
                    </span>
                  </div>
                  <Link href={`/product/${deal.id}`} className="hover:text-primary">
                    <h3 className="font-semibold mb-2 line-clamp-2 min-h-[48px]">{deal.name}</h3>
                  </Link>

                  <div className="flex items-center mb-3">
                    <span className="text-lg font-bold text-primary">KSh {deal.discountedPrice.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      KSh {deal.originalPrice.toLocaleString()}
                    </span>
                    <span className="ml-auto text-green-600 text-sm">
                      Save KSh {(deal.originalPrice - deal.discountedPrice).toLocaleString()}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(deal.sold / (deal.sold + deal.stock)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{deal.sold} sold</span>
                      <span className="text-xs text-gray-500">{deal.stock} left</span>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => handleAddToCart(deal)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No deals found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filter criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedBrand(null)
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

