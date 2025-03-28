"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Sample products data - in a real app, this would come from an API
const allProducts = [
  {
    id: 1,
    name: "Premium Brake Pads - Toyota",
    description: "High-performance ceramic brake pads for Toyota vehicles. Excellent stopping power and low dust.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 10,
    discountedPrice: 4050,
    brand: "Brembo",
    category: "Brake Systems",
  },
  {
    id: 2,
    name: "Engine Oil Filter - Universal",
    description: "High-quality oil filter that removes contaminants and extends engine life.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1620085790206-7a8a6547dc05?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    brand: "Bosch",
    category: "Engine Parts",
  },
  {
    id: 3,
    name: "LED Headlight Set - Subaru",
    description: "Bright, energy-efficient LED headlights for Subaru models. Easy installation.",
    price: 12000,
    image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 15,
    discountedPrice: 10200,
    brand: "Philips",
    category: "Lighting",
  },
  {
    id: 4,
    name: "Alternator - Honda Accord",
    description: "OEM quality alternator for Honda Accord. 2-year warranty included.",
    price: 18500,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    brand: "Denso",
    category: "Electrical",
  },
  {
    id: 5,
    name: "Shock Absorbers - Toyota",
    description: "High-quality shock absorbers for Toyota vehicles. Provides a smooth, controlled ride.",
    price: 7500,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 5,
    discountedPrice: 7125,
    brand: "KYB",
    category: "Suspension",
  },
  {
    id: 6,
    name: "Coil Springs - Honda",
    description: "Performance coil springs for Honda vehicles. Lowers ride height and improves handling.",
    price: 5800,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    brand: "Eibach",
    category: "Suspension",
  },
  {
    id: 7,
    name: "Control Arms - Nissan",
    description: "OEM quality control arms for Nissan vehicles. Direct replacement with perfect fit.",
    price: 6200,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 10,
    discountedPrice: 5580,
    brand: "Moog",
    category: "Suspension",
  },
  {
    id: 8,
    name: "Strut Assembly - Subaru",
    description: "Complete strut assembly for Subaru vehicles. Ready to install with no special tools required.",
    price: 9500,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    brand: "Monroe",
    category: "Suspension",
  },
  {
    id: 9,
    name: "Front Bumper - Toyota Corolla",
    description: "OEM quality front bumper for Toyota Corolla. Direct replacement with perfect fit.",
    price: 15000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 5,
    discountedPrice: 14250,
    brand: "Toyota",
    category: "Body Parts",
  },
  {
    id: 10,
    name: "Hood - Honda Civic",
    description: "Lightweight aluminum hood for Honda Civic. Reduces weight and improves performance.",
    price: 18500,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    brand: "Honda",
    category: "Body Parts",
  },
  {
    id: 11,
    name: "Side Mirror - Nissan",
    description: "Electric side mirror for Nissan vehicles. Includes turn signal and heating element.",
    price: 7500,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 10,
    discountedPrice: 6750,
    brand: "Nissan",
    category: "Body Parts",
  },
  {
    id: 12,
    name: "Fender - Subaru",
    description: "OEM quality fender for Subaru vehicles. Direct replacement with perfect fit.",
    price: 8900,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    brand: "Subaru",
    category: "Body Parts",
  },
  {
    id: 13,
    name: "Car Floor Mats - Universal",
    description: "Heavy-duty rubber floor mats for all-weather protection. Custom fit for your vehicle.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 5,
    discountedPrice: 3325,
    brand: "WeatherTech",
    category: "Accessories",
  },
  {
    id: 14,
    name: "Dash Camera - HD",
    description: "High-definition dash camera with night vision and motion detection. Includes 32GB memory card.",
    price: 6500,
    image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    brand: "Garmin",
    category: "Accessories",
  },
  {
    id: 15,
    name: "Car Phone Mount",
    description: "Adjustable car phone mount with wireless charging. Compatible with all smartphones.",
    price: 2200,
    image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 10,
    discountedPrice: 1980,
    brand: "iOttie",
    category: "Accessories",
  },
  {
    id: 16,
    name: "Seat Covers - Premium",
    description: "Premium leather seat covers for a luxurious look and feel. Custom fit for your vehicle.",
    price: 8500,
    image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    brand: "Coverking",
    category: "Accessories",
  },
]

// Get all unique categories and brands
const allCategories = Array.from(new Set(allProducts.map((product) => product.category))).sort()
const allBrands = Array.from(new Set(allProducts.map((product) => product.brand))).sort()

// Items per page
const ITEMS_PER_PAGE = 8

export default function AllProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 20000 })
  const [sortOption, setSortOption] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true
    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true

    const price = product.discountedPrice || product.price
    const matchesPrice = price >= priceRange.min && price <= priceRange.max

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
      case "price-high":
        return (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "discount":
        const discountA = a.discount || 0
        const discountB = b.discount || 0
        return discountB - discountA
      default: // featured
        return 0
    }
  })

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortOption])

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = Number.parseInt(value) || 0
    setPriceRange((prev) => ({
      ...prev,
      [type]: numValue,
    }))
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSelectedBrand(null)
    setPriceRange({ min: 0, max: 20000 })
    setSortOption("featured")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="container px-4 md:px-6 py-4">
        <nav className="flex items-center text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
          <span className="text-gray-900 font-medium">All Products</span>
        </nav>
      </div>

      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="w-full md:w-64 hidden md:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Search</h3>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <Accordion type="single" collapsible defaultValue="categories">
                <AccordionItem value="categories">
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategory === category}
                            onCheckedChange={() => setSelectedCategory(selectedCategory === category ? null : category)}
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="brands">
                  <AccordionTrigger>Brands</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {allBrands.map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrand === brand}
                            onCheckedChange={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                          />
                          <label
                            htmlFor={`brand-${brand}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="min-price" className="text-sm">
                            Min Price
                          </label>
                          <Input
                            id="min-price"
                            type="number"
                            min="0"
                            value={priceRange.min}
                            onChange={(e) => handlePriceChange("min", e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="max-price" className="text-sm">
                            Max Price
                          </label>
                          <Input
                            id="max-price"
                            type="number"
                            min="0"
                            value={priceRange.max}
                            onChange={(e) => handlePriceChange("max", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button variant="outline" className="w-full" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down products by applying filters</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Search</h3>
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Accordion type="single" collapsible defaultValue="categories">
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {allCategories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-category-${category}`}
                                checked={selectedCategory === category}
                                onCheckedChange={() =>
                                  setSelectedCategory(selectedCategory === category ? null : category)
                                }
                              />
                              <label
                                htmlFor={`mobile-category-${category}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="brands">
                      <AccordionTrigger>Brands</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {allBrands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-brand-${brand}`}
                                checked={selectedBrand === brand}
                                onCheckedChange={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                              />
                              <label
                                htmlFor={`mobile-brand-${brand}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {brand}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label htmlFor="mobile-min-price" className="text-sm">
                                Min Price
                              </label>
                              <Input
                                id="mobile-min-price"
                                type="number"
                                min="0"
                                value={priceRange.min}
                                onChange={(e) => handlePriceChange("min", e.target.value)}
                              />
                            </div>
                            <div>
                              <label htmlFor="mobile-max-price" className="text-sm">
                                Max Price
                              </label>
                              <Input
                                id="mobile-max-price"
                                type="number"
                                min="0"
                                value={priceRange.max}
                                onChange={(e) => handlePriceChange("max", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button variant="outline" className="w-full" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">All Products</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
                </p>
              </div>

              <div className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    <SelectItem value="discount">Biggest Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      image={product.image}
                      discount={product.discount}
                      discountedPrice={product.discountedPrice}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage > 1) setCurrentPage(currentPage - 1)
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, index) => {
                          const page = index + 1

                          // Show first page, last page, and pages around current page
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(page)
                                  }}
                                  isActive={page === currentPage}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          }

                          // Show ellipsis
                          if (
                            (page === 2 && currentPage > 3) ||
                            (page === totalPages - 1 && currentPage < totalPages - 2)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )
                          }

                          return null
                        })}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
                <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

