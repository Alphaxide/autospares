"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, DollarSign, ShoppingCart, Star, RotateCcw, Brain, Package, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

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
    analytics: {
      totalSales: 37,
      totalRevenue: 149850,
      averageRating: 4.7,
      returnRate: 2.1,
      monthlySales: [5, 7, 3, 4, 6, 8, 4],
      customerSegments: [
        { name: "DIY Mechanics", percentage: 45 },
        { name: "Car Enthusiasts", percentage: 30 },
        { name: "Regular Customers", percentage: 15 },
        { name: "First-time Buyers", percentage: 10 },
      ],
      relatedProducts: [
        { id: 11, name: "Brake Rotors - Honda", sales: 28 },
        { id: 2, name: "Engine Oil Filter - Universal", sales: 42 },
        { id: 15, name: "Synthetic Engine Oil - 5W30", sales: 53 },
      ],
      aiRecommendations: [
        "Consider creating a bundle with brake rotors for increased average order value",
        "Highlight compatibility with more Toyota models to expand market reach",
        "Increase stock levels before holiday season based on previous year's demand spike",
        "Create educational content about brake maintenance to attract more DIY customers",
      ],
    },
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
    analytics: {
      totalSales: 42,
      totalRevenue: 50400,
      averageRating: 4.5,
      returnRate: 1.8,
      monthlySales: [6, 8, 5, 7, 4, 6, 6],
      customerSegments: [
        { name: "DIY Mechanics", percentage: 55 },
        { name: "Car Enthusiasts", percentage: 20 },
        { name: "Regular Customers", percentage: 15 },
        { name: "First-time Buyers", percentage: 10 },
      ],
      relatedProducts: [
        { id: 15, name: "Synthetic Engine Oil - 5W30", sales: 53 },
        { id: 1, name: "Premium Brake Pads - Toyota Corolla", sales: 37 },
        { id: 6, name: "Air Filter - Universal", sales: 30 },
      ],
      aiRecommendations: [
        "Bundle with engine oil for a complete oil change package",
        "Create a subscription service for regular oil filter replacements",
        "Highlight universal compatibility more prominently in product descriptions",
        "Target DIY mechanics with instructional content on proper oil filter installation",
      ],
    },
  },
]

export default function ProductAnalyticsPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7days")
  const [activeTab, setActiveTab] = useState("overview")

  // Load product data when component mounts
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = productsData.find((p) => p.id === productId)
      setProduct(foundProduct || null)
      setIsLoading(false)
    }, 500)
  }, [productId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="outline" size="icon" disabled>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Loading...</h1>
              <p className="text-gray-500 mt-1">Fetching product analytics</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/products">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Product Not Found</h1>
              <p className="text-gray-500 mt-1">The product you're looking for doesn't exist</p>
            </div>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">We couldn't find the product with ID {params.id}</p>
              <Button asChild>
                <Link href="/admin/products">Return to Products</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/admin/products/edit/${product.id}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Product Analytics</h1>
              <p className="text-gray-500 mt-1">{product.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{product.analytics.totalSales} units</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">KSh {product.analytics.totalRevenue.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{product.analytics.averageRating}/5.0</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <RotateCcw className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{product.analytics.returnRate}%</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Trend</CardTitle>
                <CardDescription>Sales performance over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <div className="flex h-full items-end gap-2">
                    {product.analytics.monthlySales.map((sales, index) => {
                      const maxSales = Math.max(...product.analytics.monthlySales)
                      const height = (sales / maxSales) * 100
                      const month = new Date()
                      month.setMonth(month.getMonth() - (6 - index))
                      const monthName = month.toLocaleString("default", { month: "short" })

                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-primary rounded-t-md" style={{ height: `${height}%` }}></div>
                          <div className="mt-2 text-xs text-muted-foreground">{monthName}</div>
                          <div className="text-sm font-medium">{sales}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Products Performance</CardTitle>
                <CardDescription>How this product compares to related items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.analytics.relatedProducts.map((relatedProduct) => (
                    <div key={relatedProduct.id} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{relatedProduct.name}</span>
                        <span className="text-sm text-muted-foreground">{relatedProduct.sales} units</span>
                      </div>
                      <Progress
                        value={
                          (relatedProduct.sales / Math.max(...product.analytics.relatedProducts.map((p) => p.sales))) *
                          100
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Insights Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Who's buying this product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.analytics.customerSegments.map((segment, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{segment.name}</span>
                        <span className="text-sm text-muted-foreground">{segment.percentage}%</span>
                      </div>
                      <Progress value={segment.percentage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Frequency</CardTitle>
                  <CardDescription>How often customers buy this product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">First-time purchase</span>
                      <Badge>65%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Repeat purchase</span>
                      <Badge>35%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average time between purchases</span>
                      <Badge>6 months</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Feedback</CardTitle>
                  <CardDescription>Common themes from reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quality</span>
                      <Badge className="bg-green-500">Positive</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Price</span>
                      <Badge className="bg-yellow-500">Mixed</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Durability</span>
                      <Badge className="bg-green-500">Positive</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Installation</span>
                      <Badge className="bg-green-500">Positive</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>
                  Smart suggestions to improve product performance based on sales data and market trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {product.analytics.aiRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cross-Selling Opportunities</CardTitle>
                  <CardDescription>Products that pair well with this item</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.analytics.relatedProducts.map((relatedProduct) => (
                      <div key={relatedProduct.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{relatedProduct.name}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/products/edit/${relatedProduct.id}`}>View</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Create Bundle
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Optimization</CardTitle>
                  <CardDescription>Suggested price adjustments based on market data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Price</span>
                      <span className="font-medium">KSh {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Suggested Price Range</span>
                      <span className="font-medium">
                        KSh {Math.round(product.price * 0.95).toLocaleString()} -{" "}
                        {Math.round(product.price * 1.1).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Competitor Average</span>
                      <span className="font-medium">KSh {Math.round(product.price * 1.05).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Optimal Discount</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/admin/products/edit/${product.id}`}>Update Pricing</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

