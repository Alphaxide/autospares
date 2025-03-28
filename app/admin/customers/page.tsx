"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Search, Phone, Mail, MapPin, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

interface Address {
  id: number
  address_line: string
  county: string
  town: string
  postal_code: string | null
  is_default: boolean
}

interface Customer {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  created_at: string
  addresses: Address[]
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })

  useEffect(() => {
    fetchCustomers()
  }, [pagination.page])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/customers?page=${pagination.page}&limit=${pagination.limit}${searchQuery ? `&search=${searchQuery}` : ""}`,
      )
      const data = await response.json()
      setCustomers(data.customers)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Error fetching customers:", error)
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination((prev) => ({ ...prev, page: 1 }))
    fetchCustomers()
  }

  const handleDeleteCustomer = async () => {
    if (!selectedCustomer) return

    try {
      const response = await fetch(`/api/customers/${selectedCustomer.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete customer")
      }

      toast({
        title: "Success",
        description: "Customer deleted successfully",
      })

      setIsDeleteDialogOpen(false)
      setSelectedCustomer(null)
      fetchCustomers()
    } catch (error) {
      console.error("Error deleting customer:", error)
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      })
    }
  }

  const openViewDialog = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsViewDialogOpen(true)
  }

  const openDeleteDialog = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDeleteDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-gray-500 mt-1">Manage your customer database</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Customers</CardTitle>
          <CardDescription>Find customers by name, email, or phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            {pagination.total} {pagination.total === 1 ? "customer" : "customers"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? "No customers match your search" : "No customers found"}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => {
                    const defaultAddress =
                      customer.addresses?.find((addr) => addr.is_default) || customer.addresses?.[0]

                    return (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          {customer.first_name} {customer.last_name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="truncate max-w-[200px]">{customer.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {customer.phone ? (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-500" />
                              {customer.phone}
                            </div>
                          ) : (
                            <span className="text-gray-400">Not provided</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {defaultAddress ? (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="truncate max-w-[150px]">
                                {defaultAddress.town}, {defaultAddress.county}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400">No address</span>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(customer.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openViewDialog(customer)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/customers/edit/${customer.id}`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Customer
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(customer)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Customer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} customers
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                      disabled={pagination.page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* View Customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>Detailed information about the customer</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {selectedCustomer.first_name} {selectedCustomer.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{selectedCustomer.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer Since</p>
                    <p className="font-medium">{formatDate(selectedCustomer.created_at)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Addresses
                </h3>
                {selectedCustomer.addresses && selectedCustomer.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {selectedCustomer.addresses.map((address) => (
                      <div key={address.id} className="border rounded-md p-3">
                        {address.is_default && <Badge className="mb-2">Default</Badge>}
                        <p className="font-medium">{address.address_line}</p>
                        <p className="text-sm text-gray-500">
                          {address.town}, {address.county}
                          {address.postal_code && `, ${address.postal_code}`}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No addresses found</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedCustomer && (
              <Button asChild>
                <Link href={`/admin/customers/edit/${selectedCustomer.id}`}>Edit Customer</Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Customer Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="py-4">
              <p className="font-medium">
                {selectedCustomer.first_name} {selectedCustomer.last_name}
              </p>
              <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCustomer}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

