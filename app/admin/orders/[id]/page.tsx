"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Clock, Truck, AlertCircle, Download, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

// Update the sample orders data to include county and town
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
    shippingAddress: {
      county: "Nairobi",
      town: "Westlands",
      address: "123 Mombasa Road",
    },
    paymentMethod: "M-PESA",
    paymentDetails: {
      transactionId: "MPESA7654321",
      paymentDate: "2023-12-10",
      status: "Completed",
    },
    shipping: {
      method: "Standard Delivery",
      trackingNumber: "KEN123456789",
      company: "Sendy",
      estimatedDelivery: "2023-12-15",
      deliveryPerson: "David Kamau",
      deliveryPhone: "+254 712 987 654",
      notes: "Leave at the reception if customer not available",
    },
    history: [
      { date: "2023-12-10 09:15", status: "Order Placed", description: "Order was placed by customer" },
      { date: "2023-12-10 09:20", status: "Payment Confirmed", description: "Payment via M-PESA confirmed" },
      { date: "2023-12-11 10:30", status: "Processing", description: "Order is being processed" },
      { date: "2023-12-12 14:45", status: "Shipped", description: "Order has been shipped via Sendy" },
      { date: "2023-12-14 11:20", status: "Out for Delivery", description: "Order is out for delivery" },
      { date: "2023-12-14 16:35", status: "Delivered", description: "Order has been delivered" },
    ],
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
    shippingAddress: {
      county: "Kiambu",
      town: "Kikuyu",
      address: "456 Ngong Road",
    },
    paymentMethod: "M-PESA",
    paymentDetails: {
      transactionId: "MPESA7654322",
      paymentDate: "2023-12-09",
      status: "Completed",
    },
    shipping: {
      method: "Express Delivery",
      trackingNumber: "",
      company: "G4S",
      estimatedDelivery: "2023-12-12",
      deliveryPerson: "",
      deliveryPhone: "",
      notes: "",
    },
    history: [
      { date: "2023-12-09 14:22", status: "Order Placed", description: "Order was placed by customer" },
      { date: "2023-12-09 14:30", status: "Payment Confirmed", description: "Payment via M-PESA confirmed" },
      { date: "2023-12-10 09:15", status: "Processing", description: "Order is being processed" },
    ],
  },
]

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [processingOrder, setProcessingOrder] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  // Shipping form state
  const [shippingForm, setShippingForm] = useState({
    method: "",
    trackingNumber: "",
    company: "",
    estimatedDelivery: "",
    deliveryPerson: "",
    deliveryPhone: "",
    notes: "",
  })

  // Load order data when component mounts
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundOrder = ordersData.find((o) => o.id === params.id)
      if (foundOrder) {
        setOrder(foundOrder)

        // Initialize shipping form if data exists
        if (foundOrder.shipping) {
          setShippingForm({
            method: foundOrder.shipping.method || "",
            trackingNumber: foundOrder.shipping.trackingNumber || "",
            company: foundOrder.shipping.company || "",
            estimatedDelivery: foundOrder.shipping.estimatedDelivery || "",
            deliveryPerson: foundOrder.shipping.deliveryPerson || "",
            deliveryPhone: foundOrder.shipping.deliveryPhone || "",
            notes: foundOrder.shipping.notes || "",
          })
        }
      }
      setIsLoading(false)
    }, 500)
  }, [params.id])

  // Handle updating order status
  const handleUpdateStatus = (newStatus: string) => {
    setProcessingOrder(true)

    // Simulate API call with delay
    setTimeout(() => {
      // In a real app, this would be an API call to update the order status
      setOrder((prev) => ({
        ...prev,
        status: newStatus,
        history: [
          {
            date: new Date().toLocaleString(),
            status: newStatus,
            description: `Order status updated to ${newStatus}`,
          },
          ...prev.history,
        ],
      }))

      toast({
        title: "Order Status Updated",
        description: `Order ${params.id} has been updated to ${newStatus}`,
      })
      setProcessingOrder(false)
    }, 1000)
  }

  // Handle shipping form input change
  const handleShippingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle shipping form select change
  const handleShippingSelectChange = (name: string, value: string) => {
    setShippingForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle shipping form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessingOrder(true)

    // Simulate API call
    setTimeout(() => {
      setOrder((prev) => ({
        ...prev,
        shipping: shippingForm,
        history: [
          {
            date: new Date().toLocaleString(),
            status: "Shipping Updated",
            description: "Shipping information was updated",
          },
          ...prev.history,
        ],
      }))

      toast({
        title: "Shipping Information Updated",
        description: `Shipping details for order ${params.id} have been updated`,
      })
      setProcessingOrder(false)
    }, 1000)
  }

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
              <p className="text-gray-500 mt-1">Fetching order details</p>
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

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/orders">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Order Not Found</h1>
              <p className="text-gray-500 mt-1">The order you're looking for doesn't exist</p>
            </div>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">We couldn't find the order with ID {params.id}</p>
              <Button asChild>
                <Link href="/admin/orders">Return to Orders</Link>
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
              <Link href="/admin/orders">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Order Details</h1>
              <p className="text-gray-500 mt-1">
                Order {order.id} • {order.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Print Invoice
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>

          {/* Order Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order Summary</span>
                    {getStatusBadge(order.status)}
                  </CardTitle>
                  <CardDescription>Placed on {order.date}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-2 px-3 text-left">Item</th>
                          <th className="py-2 px-3 text-right">Qty</th>
                          <th className="py-2 px-3 text-right">Price</th>
                          <th className="py-2 px-3 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item: any, index: number) => (
                          <tr key={index} className="border-t">
                            <td className="py-2 px-3">{item.name}</td>
                            <td className="py-2 px-3 text-right">{item.quantity}</td>
                            <td className="py-2 px-3 text-right">KSh {item.price.toLocaleString()}</td>
                            <td className="py-2 px-3 text-right">
                              KSh {(item.price * item.quantity).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr className="border-t">
                          <td colSpan={3} className="py-2 px-3 font-medium text-right">
                            Total
                          </td>
                          <td className="py-2 px-3 font-medium text-right">KSh {order.amount.toLocaleString()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Payment Information</h3>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Method:</span> {order.paymentMethod}
                      </p>
                      {order.paymentDetails && (
                        <>
                          <p>
                            <span className="font-medium">Transaction ID:</span> {order.paymentDetails.transactionId}
                          </p>
                          <p>
                            <span className="font-medium">Date:</span> {order.paymentDetails.paymentDate}
                          </p>
                          <p>
                            <span className="font-medium">Status:</span> {order.paymentDetails.status}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 border-t pt-6">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-medium">Update Status:</span>
                    <Select disabled={processingOrder}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={order.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending Payment">Pending Payment</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full">
                    {order.status !== "Processing" && (
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateStatus("Processing")}
                        disabled={processingOrder}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {processingOrder ? "Updating..." : "Mark as Processing"}
                      </Button>
                    )}

                    {order.status !== "Shipped" && (
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateStatus("Shipped")}
                        disabled={processingOrder}
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        {processingOrder ? "Updating..." : "Mark as Shipped"}
                      </Button>
                    )}

                    {order.status !== "Delivered" && (
                      <Button onClick={() => handleUpdateStatus("Delivered")} disabled={processingOrder}>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        {processingOrder ? "Updating..." : "Mark as Delivered"}
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>

              {/* Customer Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Contact Details</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Name:</span> {order.customer}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {order.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {order.phone}
                      </p>
                    </div>
                  </div>

                  {/* Update the shipping address display in the Customer Information Card */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Shipping Address</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">County:</span> {order.shippingAddress?.county || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Town/Area:</span> {order.shippingAddress?.town || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {order.shippingAddress?.address || order.shippingAddress || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Shipping Method</h3>
                    <p className="text-sm">{order.shipping?.method || "Standard Delivery"}</p>
                    {order.shipping?.trackingNumber && (
                      <p className="text-sm">
                        <span className="font-medium">Tracking:</span> {order.shipping.trackingNumber}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Shipping Tab */}
          <TabsContent value="shipping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Update shipping details and tracking information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="method">Shipping Method</Label>
                      <Select
                        value={shippingForm.method}
                        onValueChange={(value) => handleShippingSelectChange("method", value)}
                      >
                        <SelectTrigger id="method">
                          <SelectValue placeholder="Select shipping method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Standard Delivery">Standard Delivery</SelectItem>
                          <SelectItem value="Express Delivery">Express Delivery</SelectItem>
                          <SelectItem value="Same Day Delivery">Same Day Delivery</SelectItem>
                          <SelectItem value="Customer Pickup">Customer Pickup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Delivery Company</Label>
                      <Select
                        value={shippingForm.company}
                        onValueChange={(value) => handleShippingSelectChange("company", value)}
                      >
                        <SelectTrigger id="company">
                          <SelectValue placeholder="Select delivery company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sendy">Sendy</SelectItem>
                          <SelectItem value="G4S">G4S</SelectItem>
                          <SelectItem value="DHL">DHL</SelectItem>
                          <SelectItem value="Wells Fargo">Wells Fargo</SelectItem>
                          <SelectItem value="In-house">In-house Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trackingNumber">Tracking Number</Label>
                      <Input
                        id="trackingNumber"
                        name="trackingNumber"
                        value={shippingForm.trackingNumber}
                        onChange={handleShippingInputChange}
                        placeholder="Enter tracking number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedDelivery">Estimated Delivery Date</Label>
                      <Input
                        id="estimatedDelivery"
                        name="estimatedDelivery"
                        type="date"
                        value={shippingForm.estimatedDelivery}
                        onChange={handleShippingInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryPerson">Delivery Person</Label>
                      <Input
                        id="deliveryPerson"
                        name="deliveryPerson"
                        value={shippingForm.deliveryPerson}
                        onChange={handleShippingInputChange}
                        placeholder="Name of delivery person"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryPhone">Delivery Person Phone</Label>
                      <Input
                        id="deliveryPhone"
                        name="deliveryPhone"
                        value={shippingForm.deliveryPhone}
                        onChange={handleShippingInputChange}
                        placeholder="Phone number of delivery person"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Delivery Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={shippingForm.notes}
                      onChange={handleShippingInputChange}
                      placeholder="Special instructions for delivery"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={processingOrder}>
                    <Package className="h-4 w-4 mr-2" />
                    {processingOrder ? "Updating Shipping Information..." : "Update Shipping Information"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Timeline of order events and status changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.history.map((event: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          {index === 0 ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </div>
                        {index < order.history.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1" />}
                      </div>
                      <div className="space-y-1 pb-6">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{event.status}</h3>
                          <span className="text-xs text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

