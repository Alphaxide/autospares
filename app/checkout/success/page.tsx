"use client"

import Link from "next/link"
import { CheckCircle, Package, Truck, Home } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = `KE${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container px-4 py-12 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-500 mb-2">Order Number</p>
            <p className="text-xl font-bold">{orderNumber}</p>
          </div>

          <div className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold">What happens next?</h2>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 border rounded-lg p-4 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">Order Processing</h3>
                <p className="text-sm text-gray-500">We're preparing your items for shipment</p>
              </div>

              <div className="flex-1 border rounded-lg p-4 text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">Shipping</h3>
                <p className="text-sm text-gray-500">Your order will be on its way to you soon</p>
              </div>

              <div className="flex-1 border rounded-lg p-4 text-center">
                <Home className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">Delivery</h3>
                <p className="text-sm text-gray-500">Enjoy your new car parts!</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            A confirmation SMS has been sent to your phone with the order details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

