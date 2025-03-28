"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, Search, Grid, List, Calendar, MapPin, Award, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample brands data
const brandsData = [
  {
    id: "brembo",
    name: "Brembo",
    logo: "/placeholder.svg?height=80&width=200",
    description:
      "Brembo is an Italian manufacturer of automotive brake systems, especially for high-performance cars and motorcycles. The company was founded in Bergamo, Italy in 1961.",
    longDescription:
      "Brembo S.p.A. is an Italian manufacturer of automotive brake systems, especially for high-performance cars and motorcycles. The company was founded in Bergamo, Italy in 1961. Soon after the company was formed, it specialized in disc brakes, which were imported from the UK at the time. The company entered into a supply contract with Alfa Romeo in 1964. It became the supplier of brake components to Moto Guzzi in 1966.\n\nIn the 1980s, Brembo began supplying BMW, Chrysler, Ferrari, Mercedes-Benz, Nissan, and Porsche with brakes. The company went public on the Milan Stock Exchange in 1995.",
    established: "1961",
    origin: "Bergamo, Italy",
    website: "https://www.brembo.com",
    categories: ["Brake Systems", "Performance Parts"],
    featuredProducts: [1, 11],
    allProducts: [1, 11],
  },
  {
    id: "bosch",
    name: "Bosch",
    logo: "/placeholder.svg?height=80&width=200",
    description:
      "Bosch is a German multinational engineering and technology company headquartered in Gerlingen, Germany. The company was founded by Robert Bosch in Stuttgart in 1886.",
    longDescription:
      "Robert Bosch GmbH, or Bosch, is a German multinational engineering and technology company headquartered in Gerlingen, Germany. The company was founded by Robert Bosch in Stuttgart in 1886. Bosch is 92% owned by Robert Bosch Stiftung, a charitable institution.\n\nBosch's core operating areas are spread across four business sectors: mobility (hardware and software), consumer goods (including household appliances and power tools), industrial technology (including drive and control) and energy and building technology.",
    established: "1886",
    origin: "Stuttgart, Germany",
    website: "https://www.bosch.com",
    categories: ["Electrical", "Engine Parts", "Accessories"],
    featuredProducts: [2, 7],
    allProducts: [2, 7],
  },
  {
    id: "castrol",
    name: "Castrol",
    logo: "/placeholder.svg?height=80&width=200",
    description:
      "Castrol is a British oil company that markets industrial and automotive lubricants. It was founded by Charles Wakefield in 1899 and acquired by BP in 2000.",
    longDescription:
      "Castrol is a British oil company that markets industrial and automotive lubricants. It was founded by Charles Wakefield in 1899 and acquired by BP in 2000. The brand offers a wide range of oils, greases and similar products for use in automotive, industrial, marine, aviation applications.\n\nCastrol's synthetic motor oils are among the most popular in the world, and the brand has a strong presence in motorsports, including Formula One, World Rally Championship, and MotoGP.",
    established: "1899",
    origin: "London, United Kingdom",
    website: "https://www.castrol.com",
    categories: ["Oils & Fluids"],
    featuredProducts: [15],
    allProducts: [15],
  },
  {
    id: "denso",
    name: "Denso",
    logo: "/placeholder.svg?height=80&width=200",
    description:
      "Denso is a global automotive components manufacturer headquartered in the city of Kariya, Aichi Prefecture, Japan. It was founded in 1949 as a part of Toyota Motor Corporation.",
    longDescription:
      "Denso Corporation is a global automotive components manufacturer headquartered in the city of Kariya, Aichi Prefecture, Japan. It was founded in 1949 as a part of Toyota Motor Corporation. After becoming independent from Toyota, Denso has developed into a global automotive supplier of advanced technology, systems and components.\n\nDenso is a leading supplier of advanced automotive technology, systems and components for major automakers. They develop and manufacture a diverse range of products including air conditioning systems, powertrain control systems, hybrid and electric vehicle components, and more.",
    established: "1949",
    origin: "Kariya, Japan",
    website: "https://www.denso.com",
    categories: ["Electrical", "Engine Parts"],
    featuredProducts: [8],
    allProducts: [8],
  },
]

// Sample products data
const productsData = [
  {
    id: 1,
    name: "Premium Brake Pads - Toyota Corolla",
    sku: "BP-TOY-15-22",
    category: "Brake Systems",
    brand: "Brembo",
    price: 4500,
    discountedPrice: 4050,
    stock: 15,
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Engine Oil Filter - Universal",
    sku: "OF-UNI-01",
    category: "Engine Parts",
    brand: "Bosch",
    price: 1200,
    discountedPrice: null,
    stock: 42,
    status: "Active",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Windshield Wipers - Honda",
    sku: "WW-HON-01",
    category: "Accessories",
    brand: "Bosch",
    price: 950,
    discountedPrice: null,
    stock: 18,
    status: "Active",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Alternator - Honda Accord",
    sku: "ALT-HON-ACC-01",
    category: "Electrical",
    brand: "Denso",
    price: 12500,
    discountedPrice: null,
    stock: 5,
    status: "Active",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 11,
    name: "Brake Rotors - Honda",
    sku: "BR-HON-01",
    category: "Brake Systems",
    brand: "Brembo",
    price: 4750,
    discountedPrice: null,
    stock: 10,
    status: "Active",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 15,
    name: "Synthetic Engine Oil - 5W30",
    sku: "SEO-5W30-01",
    category: "Oils & Fluids",
    brand: "Castrol",
    price: 2500,
    discountedPrice: 2250,
    stock: 50,
    status: "Active",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
]

export default function BrandDetailsPage({ params }: { params: { id: string } }) {
  const [brand, setBrand] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("products")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOption, setSortOption] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Load brand data when component mounts
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundBrand = brandsData.find((b) => b.id === params.id)
      setBrand(foundBrand || null)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  // Get brand products
  const getBrandProducts = () => {
    if (!brand) return []

    return productsData
      .filter((product) => {
        // Filter by brand
        if (product.brand !== brand.name) return false

        // Filter by search query
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

        // Filter by category
        if (categoryFilter !== "all" && product.category !== categoryFilter) return false

        return true
      })
      .sort((a, b) => {
        // Sort products
        switch (sortOption) {
          case "featured":
            return brand.featuredProducts.indexOf(a.id) - brand.featuredProducts.indexOf(b.id)
          case "price-low":
            return (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
          case "price-high":
            return (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
          case "name-asc":
            return a.name.localeCompare(b.name)
          case "name-desc":
            return b.name.localeCompare(a.name)
          default:
            return 0
        }
      })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container px-4 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="outline" size="icon" disabled>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Loading...</h1>
              <p className="text-gray-500 mt-1">Fetching brand details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container px-4 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/brands">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Brand Not Found</h1>
              <p className="text-gray-500 mt-1">The brand you're looking for doesn't exist</p>
            </div>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">We couldn't find the brand with ID {params.id}</p>
              <Button asChild>
                <Link href="/brands">Browse All Brands</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const brandProducts = getBrandProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/brands">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{brand.name}</h1>
            <p className="text-gray-500 mt-1">{brand.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Info Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    className="h-20 object-contain mb-4"
                  />

                  <div className="flex flex-wrap gap-2 justify-center">
                    {brand.categories.map((category: string) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Established</p>
                      <p className="text-sm text-muted-foreground">{brand.established}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Origin</p>
                      <p className="text-sm text-muted-foreground">{brand.origin}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Specializes in</p>
                      <p className="text-sm text-muted-foreground">{brand.categories.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {brand.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="about">About {brand.name}</TabsTrigger>
              </TabsList>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder={`Search ${brand.name} products...`}
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      <div className="w-full md:w-48">
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger>
                            <div className="flex items-center gap-2">
                              <Filter className="h-4 w-4" />
                              <SelectValue placeholder="Category" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {brand.categories.map((category: string) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="w-full md:w-48">
                        <Select value={sortOption} onValueChange={setSortOption}>
                          <SelectTrigger>
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

                      <div className="flex items-center border rounded-md">
                        <Button
                          variant={viewMode === "grid" ? "default" : "ghost"}
                          size="icon"
                          className="rounded-none rounded-l-md"
                          onClick={() => setViewMode("grid")}
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "ghost"}
                          size="icon"
                          className="rounded-none rounded-r-md"
                          onClick={() => setViewMode("list")}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {brandProducts.length > 0 ? (
                      <div
                        className={
                          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"
                        }
                      >
                        {brandProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            variant={viewMode === "grid" ? "default" : "horizontal"}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSearchQuery("")
                            setCategoryFilter("all")
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold mb-4">About {brand.name}</h2>
                      <div className="space-y-4">
                        {brand.longDescription.split("\n\n").map((paragraph: string, index: number) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold mt-8 mb-4">Why Choose {brand.name}?</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Industry-leading quality and reliability</li>
                        <li>Extensive research and development</li>
                        <li>Precision engineering and manufacturing</li>
                        <li>Commitment to innovation</li>
                        <li>Global presence and support</li>
                      </ul>

                      <div className="mt-8">
                        <Button asChild>
                          <a href={brand.website} target="_blank" rel="noopener noreferrer">
                            Visit Official Website
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

