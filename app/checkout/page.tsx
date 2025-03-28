"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, Truck, MapPin, Phone, User } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Add these arrays at the top of the file, after the imports
const kenyanCounties = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Kiambu",
  "Uasin Gishu",
  "Machakos",
  "Kajiado",
  "Nyeri",
  "Kakamega",
  "Kilifi",
  "Bungoma",
  "Meru",
  "Murang'a",
  "Kericho",
]

const townsByCounty: Record<string, string[]> = {
  Nairobi: [
    "Westlands",
    "Karen",
    "Eastleigh",
    "Kasarani",
    "Embakasi",
    "South B",
    "South C",
    "Lavington",
    "Kilimani",
    "Dagoretti",
  ],
  Mombasa: ["Nyali", "Bamburi", "Kisauni", "Likoni", "Changamwe", "Miritini", "Mtwapa", "Shanzu"],
  Kisumu: ["Milimani", "Kondele", "Nyalenda", "Manyatta", "Mamboleo", "Kibos"],
  Nakuru: ["Milimani", "Section 58", "Shabab", "Lanet", "London", "Free Area", "Bahati"],
  Kiambu: ["Thika", "Ruiru", "Juja", "Kikuyu", "Limuru", "Kiambu Town", "Githunguri"],
  "Uasin Gishu": ["Eldoret", "Turbo", "Burnt Forest", "Moiben", "Ziwa", "Kesses"],
  Machakos: ["Athi River", "Machakos Town", "Kangundo", "Matuu", "Masii", "Tala"],
  Kajiado: ["Kitengela", "Ongata Rongai", "Ngong", "Kiserian", "Kajiado Town", "Namanga"],
  Nyeri: ["Nyeri Town", "Karatina", "Othaya", "Mweiga", "Naro Moru", "Kiganjo"],
  Kakamega: ["Kakamega Town", "Mumias", "Malava", "Butere", "Matungu", "Lugari"],
  Kilifi: ["Kilifi Town", "Malindi", "Watamu", "Mariakani", "Mtwapa", "Kaloleni"],
  Bungoma: ["Bungoma Town", "Webuye", "Kimilili", "Chwele", "Sirisia", "Tongaren"],
  Meru: ["Meru Town", "Nkubu", "Maua", "Timau", "Laare", "Muthara"],
  "Murang'a": ["Murang'a Town", "Kangema", "Maragua", "Kandara", "Kigumo", "Kenol"],
  Kericho: ["Kericho Town", "Litein", "Londiani", "Kipkelion", "Sigowet", "Ainamoi"],
}

// Update the formData state to include county and town
const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  county: "",
  town: "",
  address: "",
  city: "",
}

// Add a state for available towns based on selected county
const initialAvailableTowns: string[] = []

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [availableTowns, setAvailableTowns] = useState<string[]>(initialAvailableTowns)

  const shipping = 350
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Add this function after handleInputChange
  const handleCountyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      county: value,
      town: "", // Reset town when county changes
    }))
    setAvailableTowns(townsByCounty[value] || [])
  }

  const handleTownChange = (value: string) => {
    setFormData((prev) => ({ ...prev, town: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
    }

    // Phone number validation for Kenya
    const kenyanPhoneRegex = /^(?:\+254|0)[17]\d{8}$/
    if (!kenyanPhoneRegex.test(formData.phone)) {
      toast({
        title: "Error",
        description: "Please enter a valid Kenyan phone number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate order processing
    setTimeout(() => {
      setIsLoading(false)
      clearCart()
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your order! You will receive a confirmation shortly.",
      })
      router.push("/checkout/success")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container px-4 py-12 max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">You need to add items to your cart before checking out.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link href="/cart">
              <ChevronLeft className="h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-2xl font-bold ml-4">Checkout</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g., 0712345678"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  {/* In the shipping address section of the form, add these fields before the address field: */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="county">County</Label>
                      <Select value={formData.county} onValueChange={handleCountyChange}>
                        <SelectTrigger id="county">
                          <SelectValue placeholder="Select county" />
                        </SelectTrigger>
                        <SelectContent>
                          {kenyanCounties.map((county) => (
                            <SelectItem key={county} value={county}>
                              {county}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="town">Area/Town</Label>
                      <Select value={formData.town} onValueChange={handleTownChange} disabled={!formData.county}>
                        <SelectTrigger id="town">
                          <SelectValue placeholder={formData.county ? "Select area/town" : "Select county first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTowns.map((town) => (
                            <SelectItem key={town} value={town}>
                              {town}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Update the address field label to be more specific */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Specific Address (Street, Building, Landmark)</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City/Town</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>

              {/* Payment Method - M-PESA Only */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Payment Method
                </h2>
                <div className="border p-4 rounded-md">
                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=40&width=40&text=M-PESA"
                      width={40}
                      height={40}
                      alt="M-PESA"
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">M-PESA</p>
                      <p className="text-sm text-gray-500">Pay via M-PESA mobile money</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-50 p-3 rounded-md">
                    <p className="text-sm">
                      After placing your order, you will receive an M-PESA payment prompt on your phone. Please enter
                      your M-PESA PIN to complete the payment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:hidden">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : `Complete Order • KSh ${total.toLocaleString()}`}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-white sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <div className="flex items-center">
                        <div className="w-10 h-10 relative rounded overflow-hidden mr-3">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">
                        KSh {((item.discountedPrice || item.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>KSh {shipping.toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>KSh {total.toLocaleString()}</span>
                </div>

                <div className="pt-2">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Truck className="h-4 w-4 mr-2 text-primary" />
                    Estimated delivery: 2-4 business days
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubmit} disabled={isLoading} type="submit">
                  {isLoading ? "Processing..." : "Pay with M-PESA"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

