"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, Plus, Edit, Trash2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

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
  },
  {
    id: 3,
    name: "LED Headlight Set - Universal",
    sku: "HL-LED-UNI-01",
    category: "Lighting",
    brand: "Philips",
    price: 6050,
    discountedPrice: null,
    stock: 8,
    status: "Active",
  },
  {
    id: 4,
    name: "Shock Absorbers - Toyota",
    sku: "SA-TOY-01",
    category: "Suspension",
    brand: "KYB",
    price: 3500,
    discountedPrice: null,
    stock: 12,
    status: "Active",
  },
  {
    id: 5,
    name: "Car Floor Mats - Universal",
    sku: "FM-UNI-01",
    category: "Accessories",
    brand: "3M",
    price: 1700,
    discountedPrice: null,
    stock: 25,
    status: "Active",
  },
  {
    id: 6,
    name: "Air Filter - Universal",
    sku: "AF-UNI-01",
    category: "Engine Parts",
    brand: "K&N",
    price: 1500,
    discountedPrice: null,
    stock: 30,
    status: "Active",
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
  },
  {
    id: 9,
    name: "Battery Terminal Connectors",
    sku: "BTC-UNI-01",
    category: "Electrical",
    brand: "Generic",
    price: 2700,
    discountedPrice: null,
    stock: 22,
    status: "Active",
  },
  {
    id: 10,
    name: "Timing Belt Kit - Nissan",
    sku: "TBK-NIS-01",
    category: "Engine Parts",
    brand: "Gates",
    price: 7800,
    discountedPrice: null,
    stock: 7,
    status: "Active",
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
  },
  {
    id: 12,
    name: "Car Phone Mount",
    sku: "CPM-UNI-01",
    category: "Accessories",
    brand: "Generic",
    price: 1200,
    discountedPrice: null,
    stock: 35,
    status: "Active",
  },
  {
    id: 13,
    name: "Dash Camera - Basic",
    sku: "DC-BAS-01",
    category: "Electronics",
    brand: "Generic",
    price: 2000,
    discountedPrice: null,
    stock: 15,
    status: "Active",
  },
  {
    id: 14,
    name: "Complete Suspension Kit - Toyota",
    sku: "CSK-TOY-01",
    category: "Suspension",
    brand: "KYB",
    price: 18500,
    discountedPrice: null,
    stock: 3,
    status: "Active",
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
  },
]

export default function ProductsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  // Items per page
  const ITEMS_PER_PAGE = 10

  // Get unique categories for filter
  const categories = Array.from(new Set(productsData.map((product) => product.category)))

  // Filter products based on search query, category filter, and status filter
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" ? true : product.category === categoryFilter

    const matchesStatus = statusFilter === "all" ? true : product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Paginate products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Handle delete product
  const handleDeleteProduct = (id: number) => {
    // In a real app, this would be an API call to delete the product
    toast({
      title: "Product Deleted",
      description: `Product #${id} has been deleted`,
    })

    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  return (
    <div className="bg-gray-50">
      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Products Management</h1>
              <p className="text-gray-500 mt-1">View and manage your product inventory</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/admin/products/add">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Product Filters</CardTitle>
            <CardDescription>Filter products by name, SKU, category, or status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by product name or SKU..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1) // Reset to first page when searching
                  }}
                />
              </div>

              <div className="w-full md:w-64">
                <Select
                  value={categoryFilter}
                  onValueChange={(value) => {
                    setCategoryFilter(value)
                    setCurrentPage(1) // Reset to first page when filtering
                  }}
                >
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter by category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-64">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value)
                    setCurrentPage(1) // Reset to first page when filtering
                  }}
                >
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price (KSh)</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>
                        {product.discountedPrice ? (
                          <div>
                            <span className="line-through text-gray-500 mr-2">{product.price}</span>
                            <span className="font-medium">{product.discountedPrice}</span>
                          </div>
                        ) : (
                          product.price
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.stock > 10 ? "default" : product.stock > 0 ? "outline" : "destructive"}>
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "Active"
                              ? "default"
                              : product.status === "Draft"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/products/analytics/${product.id}`}>
                              <BarChart3 className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Analytics</span>
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setProductToDelete(product.id)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="py-4 px-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1

                      // Show first, last, and pages around current page
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink isActive={page === currentPage} onClick={() => setCurrentPage(page)}>
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
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => productToDelete && handleDeleteProduct(productToDelete)}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

