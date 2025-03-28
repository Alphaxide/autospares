"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Trash2, CreditCard } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneError, setPhoneError] = useState("")

  const shipping = items.length > 0 ? 350 : 0
  const total = subtotal + shipping

  const validatePhoneNumber = (value: string) => {
    // Basic validation for Kenyan phone numbers
    const kenyanPhoneRegex = /^(?:\+254|0)[17]\d{8}$/

    if (!value) {
      setPhoneError("Phone number is required")
      return false
    }

    if (!kenyanPhoneRegex.test(value)) {
      setPhoneError("Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678)")
      return false
    }

    setPhoneError("")
    return true
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneNumber(value)

    if (value) {
      validatePhoneNumber(value)
    } else {
      setPhoneError("")
    }
  }

  const handleCheckout = () => {
    if (validatePhoneNumber(phoneNumber)) {
      // In a real app, this would proceed to checkout
      toast({
        title: "Proceeding to checkout",
        description: `We'll send order updates to ${phoneNumber}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container px-4 md:px-6 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-md border rounded-lg overflow-hidden">
                {/* Desktop Table - Hidden on Mobile */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="w-20 h-20 relative rounded overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Link href={`/product/${item.id}`} className="font-medium hover:text-primary">
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.discountedPrice ? (
                              <div>
                                <div className="font-medium">KSh {item.discountedPrice.toLocaleString()}</div>
                                <div className="text-sm text-gray-500 line-through">
                                  KSh {item.price.toLocaleString()}
                                </div>
                              </div>
                            ) : (
                              <div className="font-medium">KSh {item.price.toLocaleString()}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <div className="h-8 w-10 flex items-center justify-center border-y">{item.quantity}</div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            KSh {((item.discountedPrice || item.price) * item.quantity).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cart Items - Shown only on Mobile */}
                <div className="md:hidden">
                  {items.map((item) => (
                    <div key={item.id} className="border-b p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 relative rounded overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.id}`} className="font-medium hover:text-primary line-clamp-2">
                            {item.name}
                          </Link>
                          <div className="mt-1">
                            {item.discountedPrice ? (
                              <div className="flex items-center gap-2">
                                <div className="font-medium">KSh {item.discountedPrice.toLocaleString()}</div>
                                <div className="text-sm text-gray-500 line-through">
                                  KSh {item.price.toLocaleString()}
                                </div>
                              </div>
                            ) : (
                              <div className="font-medium">KSh {item.price.toLocaleString()}</div>
                            )}
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <div className="h-8 w-10 flex items-center justify-center border-y">{item.quantity}</div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>

                          <div className="mt-2 font-medium text-right">
                            Total: KSh {((item.discountedPrice || item.price) * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" className="gap-2" asChild>
                  <Link href="/">
                    <ChevronLeft className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <Card className="bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>KSh {shipping.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>KSh {total.toLocaleString()}</span>
                  </div>

                  <div className="pt-4">
                    <Label htmlFor="phone-number" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone-number"
                      type="tel"
                      placeholder="e.g., 0712345678"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className={phoneError ? "border-red-500" : ""}
                    />
                    {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      We'll use this number to send you order updates and delivery information.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2" disabled={items.length === 0} asChild>
                    <Link href="/checkout">
                      <CreditCard className="h-4 w-4" />
                      Proceed to Checkout
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6 bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Apply Coupon</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input placeholder="Enter coupon code" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

