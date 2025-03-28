"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, AlertCircle, Download, Eye } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

// Sample orders data
const ordersData = [
  {
    id: "ORD-7231",
    customer: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 712 345 678",
    date: "2023-12-10",
    amount: 12500,
    status: "Delivered",
    items: [
      { name: "Premium Brake Pads - Toyota", quantity: 1, price: 4050 },
      { name: "Engine Oil Filter - Universal", quantity: 2, price: 1200 },
      { name: "LED Headlight Set - Universal", quantity: 1, price: 6050 },
    ],
    shippingAddress: "123 Mombasa Road, Nairobi",
    paymentMethod: "M-PESA",
  },
  {
    id: "ORD-7230",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+254 723 456 789",
    date: "2023-12-09",
    amount: 8700,
    status: "Processing",
    items: [
      { name: "Shock Absorbers - Toyota", quantity: 2, price: 3500 },
      { name: "Car Floor Mats - Universal", quantity: 1, price: 1700 },
    ],
    shippingAddress: "456 Ngong Road, Nairobi",
    paymentMethod: "M-PESA",
  },
  {
    id: "ORD-7229",
    customer: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+254 734 567 890",
    date: "2023-12-09",
    amount: 5300,
    status: "Processing",
    items: [
      { name: "Air Filter - Universal", quantity: 1, price: 1500 },
      { name: "Windshield Wipers - Honda", quantity: 2, price: 1900 },
    ],
    shippingAddress: "789 Thika Road, Nairobi",
    paymentMethod: "M-PESA",
  },
  {
    id: "ORD-7228",
    customer: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+254 745 678 901",
    date: "2023-12-08",
    amount: 15200,
    status: "Shipped",
    items: [
      { name: "Alternator - Honda Accord", quantity: 1, price: 12500 },
      { name: "Battery Terminal Connectors", quantity: 1, price: 2700 },
    ],
    shippingAddress: "321 Waiyaki Way, Nairobi",
    paymentMethod: "M-PESA",
  },
  {
    id: "ORD-7227",
    customer: "David Brown",
    email: "david.b@example.com",
    phone: "+254 756 789 012",
    date: "2023-12-07",
    amount: 7800,
    status: "Pending Payment",
    items: [{ name: "Timing Belt Kit - Nissan", quantity: 1, price: 7800 }],
    shippingAddress: "654 Langata Road, Nairobi",
    paymentMethod: "M-PESA",
  },
  {
    id: "ORD-7226",
    customer: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+254 767 890 123",
    date: "2023-12-07",
    amount: 9500,
    status: "Cancelled",
    items: [{ name: "Brake Rotors - Honda", quantity: 2, price: 4750 }],
    shippingAddress: "987 Mombasa Road, Nairobi",
    paymentMethod: "M-PESA",
  },
  {
    id: "ORD-7225",
    customer: "James Wilson",
    email: "james.w@example.com",
    phone: "+254 778 901 234",
    date: "2023-12-06",
    amount: 3200,
    status: "Delivered",
    items: [
      { name: "Car Phone Mount", quantity: 1, price: 1200 },
      { name: "Dash Camera - Basic", quantity: 1, price: 2000 },
    ],
    shippingAddress: "246 Ngong Road, Nairobi",
    paymentMethod: "M-PESA",
  },
  {
    id: "ORD-7224",
    customer: "Robert Miller",
    email: "robert.m@example.com",
    phone: "+254 789 012 345",
    date: "2023-12-05",
    amount: 18500,
    status: "Delivered",
    items: [{ name: "Complete Suspension Kit - Toyota", quantity: 1, price: 18500 }],
    shippingAddress: "135 Thika Road, Nairobi",
    paymentMethod: "M-PESA",
  },
]

export default function OrdersManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Items per page
  const ITEMS_PER_PAGE = 6

  // Filter orders based on search query and status filter
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" ? true : order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Paginate orders
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-green-500">{status}</Badge>
      case "Shipped":
        return <Badge className="bg-blue-500">{status}</Badge>
      case "Processing":
        return <Badge className="bg-yellow-500">{status}</Badge>
      case "Pending Payment":
        return <Badge className="bg-orange-500">{status}</Badge>
      case "Cancelled":
        return <Badge className="bg-red-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
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
              <h1 className="text-3xl font-bold">Orders Management</h1>
              <p className="text-gray-500 mt-1">View and manage customer orders</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Orders
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Order Filters</CardTitle>
            <CardDescription>Filter orders by ID, customer name, or status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by order ID or customer name..."
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
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value)
                    setCurrentPage(1) // Reset to first page when filtering
                  }}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="Pending Payment">Pending Payment</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>KSh {order.amount.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        <div className="flex flex-col items-center justify-center">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No orders found</p>
                          <Button
                            variant="link"
                            className="mt-2"
                            onClick={() => {
                              setSearchQuery("")
                              setStatusFilter("all")
                            }}
                          >
                            Reset filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
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
    </div>
  )
}

