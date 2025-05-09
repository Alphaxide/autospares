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
let allProducts = []; // Define allProducts globally

async function fetchProducts() {
  try {
    const response = await fetch('http://127.0.0.1:4000/api/v1/products?per_page=10');
    const data = await response.json();

    allProducts = data.content.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price ? Math.round(item.price * 100) : 0, // Convert to cents
      image: item.imgUrl,
      discount: item.discount,
      discountedPrice: item.discount
        ? Math.round(item.price * (1 - item.discount / 100) * 100)
        : null,
      brand: "Unknown Brand",       // Placeholder (since not in API)
      category: "Unknown Category", // Placeholder (since not in API)
    }));

    console.log(allProducts); // You can remove this after verifying
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

fetchProducts();

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

