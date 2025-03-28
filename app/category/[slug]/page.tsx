"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample data - in a real app, this would come from an API
const categoryData = {
  "engine-parts": {
    name: "Engine Parts",
    description: "Quality engine parts for all makes and models",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&h=300&auto=format&fit=crop",
    products: [
      {
        id: 5,
        name: "Engine Oil Filter - Toyota",
        description: "High-quality oil filter that removes contaminants and extends engine life for Toyota vehicles.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1620085790206-7a8a6547dc05?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Toyota",
        compatibility: ["Toyota Corolla", "Toyota Camry", "Toyota RAV4"],
      },
      {
        id: 6,
        name: "Spark Plugs Set - Honda",
        description:
          "Premium spark plugs for Honda engines. Provides better fuel efficiency and smoother engine performance.",
        price: 2800,
        image: "https://images.unsplash.com/photo-1635784063388-1ff609e4e0d1?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 5,
        discountedPrice: 2660,
        brand: "NGK",
        compatibility: ["Honda Civic", "Honda Accord", "Honda CR-V"],
      },
      {
        id: 7,
        name: "Timing Belt Kit - Nissan",
        description: "Complete timing belt kit for Nissan engines. Includes belt, tensioners, and water pump.",
        price: 8500,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 10,
        discountedPrice: 7650,
        brand: "Nissan",
        compatibility: ["Nissan Altima", "Nissan Sentra", "Nissan X-Trail"],
      },
      {
        id: 8,
        name: "Air Filter - Universal",
        description: "High-flow air filter for improved engine breathing and performance.",
        price: 1500,
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "K&N",
        compatibility: ["Universal Fit", "Most Vehicle Models"],
      },
    ],
  },
  "brake-systems": {
    name: "Brake Systems",
    description: "High-performance brake components for optimal stopping power",
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=1200&h=300&auto=format&fit=crop",
    products: [
      {
        id: 1,
        name: "Premium Brake Pads - Toyota",
        description: "High-performance ceramic brake pads for Toyota vehicles. Excellent stopping power and low dust.",
        price: 4500,
        image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 10,
        discountedPrice: 4050,
        brand: "Brembo",
        compatibility: ["Toyota Corolla", "Toyota Camry", "Toyota RAV4"],
      },
      {
        id: 9,
        name: "Brake Rotors - Honda",
        description: "Precision-engineered brake rotors for Honda vehicles. Provides smooth, consistent braking.",
        price: 6500,
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Brembo",
        compatibility: ["Honda Civic", "Honda Accord", "Honda CR-V"],
      },
      {
        id: 10,
        name: "Brake Fluid DOT 4",
        description: "High-quality brake fluid suitable for most vehicles. Provides reliable braking performance.",
        price: 850,
        image: "https://images.unsplash.com/photo-1635784063388-1ff609e4e0d1?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 5,
        discountedPrice: 807.5,
        brand: "Castrol",
        compatibility: ["Universal", "Most Vehicle Models"],
      },
      {
        id: 11,
        name: "Brake Caliper Repair Kit",
        description: "Complete repair kit for brake calipers. Includes seals, boots, and hardware.",
        price: 3200,
        image: "https://images.unsplash.com/photo-1617886322168-72b886573c5a?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "ATE",
        compatibility: ["Universal", "Most Vehicle Models"],
      },
    ],
  },
  lighting: {
    name: "Lighting",
    description: "Bright and efficient lighting solutions for all vehicles",
    image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=1200&h=300&auto=format&fit=crop",
    products: [
      {
        id: 3,
        name: "LED Headlight Set - Subaru",
        description: "Bright, energy-efficient LED headlights for Subaru models. Easy installation.",
        price: 12000,
        image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 15,
        discountedPrice: 10200,
        brand: "Philips",
        compatibility: ["Subaru Impreza", "Subaru Forester", "Subaru Outback"],
      },
      {
        id: 12,
        name: "Tail Light Assembly - Toyota",
        description: "OEM quality tail light assembly for Toyota vehicles. Direct replacement with perfect fit.",
        price: 8500,
        image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Toyota",
        compatibility: ["Toyota Corolla", "Toyota Camry", "Toyota RAV4"],
      },
      {
        id: 13,
        name: "Fog Light Kit - Universal",
        description: "Universal fog light kit with bright LED lights. Improves visibility in poor weather conditions.",
        price: 5500,
        image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 10,
        discountedPrice: 4950,
        brand: "PIAA",
        compatibility: ["Universal", "Most Vehicle Models"],
      },
      {
        id: 14,
        name: "Interior LED Light Kit",
        description: "Complete interior LED light kit for a modern, bright cabin. Easy installation.",
        price: 2200,
        image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Sylvania",
        compatibility: ["Universal", "Most Vehicle Models"],
      },
    ],
  },
  suspension: {
    name: "Suspension",
    description: "Quality suspension components for a smooth ride",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&h=300&auto=format&fit=crop",
    products: [
      {
        id: 15,
        name: "Shock Absorbers - Toyota",
        description: "High-quality shock absorbers for Toyota vehicles. Provides a smooth, controlled ride.",
        price: 7500,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 5,
        discountedPrice: 7125,
        brand: "KYB",
        compatibility: ["Toyota Corolla", "Toyota Camry", "Toyota RAV4"],
      },
      {
        id: 16,
        name: "Coil Springs - Honda",
        description: "Performance coil springs for Honda vehicles. Lowers ride height and improves handling.",
        price: 5800,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Eibach",
        compatibility: ["Honda Civic", "Honda Accord", "Honda CR-V"],
      },
      {
        id: 17,
        name: "Control Arms - Nissan",
        description: "OEM quality control arms for Nissan vehicles. Direct replacement with perfect fit.",
        price: 6200,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 10,
        discountedPrice: 5580,
        brand: "Moog",
        compatibility: ["Nissan Altima", "Nissan Sentra", "Nissan X-Trail"],
      },
      {
        id: 18,
        name: "Strut Assembly - Subaru",
        description: "Complete strut assembly for Subaru vehicles. Ready to install with no special tools required.",
        price: 9500,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Monroe",
        compatibility: ["Subaru Impreza", "Subaru Forester", "Subaru Outback"],
      },
    ],
  },
  "body-parts": {
    name: "Body Parts",
    description: "Quality body parts and panels for all vehicle makes",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&h=300&auto=format&fit=crop",
    products: [
      {
        id: 19,
        name: "Front Bumper - Toyota Corolla",
        description: "OEM quality front bumper for Toyota Corolla. Direct replacement with perfect fit.",
        price: 15000,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 5,
        discountedPrice: 14250,
        brand: "Toyota",
        compatibility: ["Toyota Corolla (2015-2022)"],
      },
      {
        id: 20,
        name: "Hood - Honda Civic",
        description: "Lightweight aluminum hood for Honda Civic. Reduces weight and improves performance.",
        price: 18500,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Honda",
        compatibility: ["Honda Civic (2016-2023)"],
      },
      {
        id: 21,
        name: "Side Mirror - Nissan",
        description: "Electric side mirror for Nissan vehicles. Includes turn signal and heating element.",
        price: 7500,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 10,
        discountedPrice: 6750,
        brand: "Nissan",
        compatibility: ["Nissan Altima", "Nissan Sentra", "Nissan X-Trail"],
      },
      {
        id: 22,
        name: "Fender - Subaru",
        description: "OEM quality fender for Subaru vehicles. Direct replacement with perfect fit.",
        price: 8900,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Subaru",
        compatibility: ["Subaru Impreza", "Subaru Forester", "Subaru Outback"],
      },
    ],
  },
  accessories: {
    name: "Accessories",
    description: "Enhance your vehicle with our range of accessories",
    image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=1200&h=300&auto=format&fit=crop",
    products: [
      {
        id: 23,
        name: "Car Floor Mats - Universal",
        description: "Heavy-duty rubber floor mats for all-weather protection. Custom fit for your vehicle.",
        price: 3500,
        image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 5,
        discountedPrice: 3325,
        brand: "WeatherTech",
        compatibility: ["Universal", "Most Vehicle Models"],
      },
      {
        id: 24,
        name: "Dash Camera - HD",
        description: "High-definition dash camera with night vision and motion detection. Includes 32GB memory card.",
        price: 6500,
        image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Garmin",
        compatibility: ["Universal", "Most Vehicle Models"],
      },
      {
        id: 25,
        name: "Car Phone Mount",
        description: "Adjustable car phone mount with wireless charging. Compatible with all smartphones.",
        price: 2200,
        image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=300&h=300&auto=format&fit=crop",
        discount: 10,
        discountedPrice: 1980,
        brand: "iOttie",
        compatibility: ["Universal", "Most Vehicle Models"],
      },
      {
        id: 26,
        name: "Seat Covers - Premium",
        description: "Premium leather seat covers for a luxurious look and feel. Custom fit for your vehicle.",
        price: 8500,
        image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=300&h=300&auto=format&fit=crop",
        discount: null,
        discountedPrice: null,
        brand: "Coverking",
        compatibility: ["Universal", "Most Vehicle Models"],
      },
    ],
  },
}

// Get category data by slug
const getCategoryBySlug = (slug: string) => {
  return categoryData[slug as keyof typeof categoryData] || null
}

// Get all brands from products
const getAllBrands = (products: any[]) => {
  const brands = new Set<string>()
  products.forEach((product) => {
    if (product.brand) {
      brands.add(product.brand)
    }
  })
  return Array.from(brands)
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)

  const [filteredProducts, setFilteredProducts] = useState(category?.products || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 20000 })
  const [sortOption, setSortOption] = useState("featured")

  const allBrands = category ? getAllBrands(category.products) : []

  // Filter and sort products
  useEffect(() => {
    if (!category) return

    let result = [...category.products]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand))
    }

    // Apply price range filter
    result = result.filter((product) => {
      const price = product.discountedPrice || product.price
      return price >= priceRange.min && price <= priceRange.max
    })

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price))
        break
      case "price-high":
        result.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price))
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      // featured is default, no sorting needed
    }

    setFilteredProducts(result)
  }, [category, searchQuery, selectedBrands, priceRange, sortOption])

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container px-4 md:px-6 py-12">
          <h1 className="text-3xl font-bold">Category Not Found</h1>
          <p className="mt-4">The category you are looking for does not exist.</p>
          <Button asChild className="mt-6">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = Number.parseInt(value) || 0
    setPriceRange((prev) => ({
      ...prev,
      [type]: numValue,
    }))
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedBrands([])
    setPriceRange({ min: 0, max: 20000 })
    setSortOption("featured")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <div className="w-full h-[200px] md:h-[300px] relative">
        <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{category.name}</h1>
            <p className="mt-2 md:mt-4 max-w-2xl mx-auto px-4">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container px-4 md:px-6 py-4">
        <nav className="flex items-center text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
          <span className="text-gray-900 font-medium">{category.name}</span>
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

              <Accordion type="single" collapsible defaultValue="brands">
                <AccordionItem value="brands">
                  <AccordionTrigger>Brands</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {allBrands.map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => handleBrandToggle(brand)}
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

                  <Accordion type="single" collapsible defaultValue="brands">
                    <AccordionItem value="brands">
                      <AccordionTrigger>Brands</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {allBrands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={() => handleBrandToggle(brand)}
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
                <h2 className="text-2xl font-bold">{category.name}</h2>
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
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {filteredProducts.map((product) => (
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

