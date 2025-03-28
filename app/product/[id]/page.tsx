"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Truck, Shield, Star, ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { toast } from "@/hooks/use-toast"

// This would normally come from an API or database
const getProductById = (id: string) => {
  // For demo purposes, we'll just return a hardcoded product
  return {
    id: id,
    name: "Premium Brake Pads - Toyota Corolla 2015-2022",
    description:
      "High-performance ceramic brake pads designed specifically for Toyota Corolla models from 2015 to 2022. These premium brake pads offer excellent stopping power, minimal noise, and reduced brake dust.",
    price: 4500,
    discountedPrice: 4050,
    discount: 10,
    rating: 4.5,
    reviews: 28,
    stock: 15,
    sku: "BP-TOY-15-22",
    brand: "BrakeMaster",
    compatibility: ["Toyota Corolla (2015-2022)", "Toyota Auris (2015-2020)"],
    features: [
      "Ceramic compound for quiet braking and less dust",
      "Chamfered and slotted for noise reduction",
      "Includes hardware kit for complete installation",
      "Meets or exceeds OEM specifications",
      "Heat-resistant for consistent performance",
    ],
    specifications: {
      Material: "Ceramic",
      Position: "Front",
      Thickness: "15mm",
      Width: "109mm",
      Length: "136mm",
      Weight: "1.2kg",
    },
    images: [
      "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=600&h=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=600&h=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617886322168-72b886573c5a?q=80&w=600&h=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1635784063388-1ff609e4e0d1?q=80&w=600&h=600&auto=format&fit=crop",
    ],
    relatedProducts: [
      {
        id: "2",
        name: "Brake Rotors - Toyota Corolla",
        description: "High-performance brake rotors for Toyota Corolla",
        price: 6500,
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=200&h=200&auto=format&fit=crop",
      },
      {
        id: "3",
        name: "Brake Fluid DOT 4",
        description: "High-quality brake fluid for all vehicles",
        price: 850,
        image: "https://images.unsplash.com/photo-1635784063388-1ff609e4e0d1?q=80&w=200&h=200&auto=format&fit=crop",
      },
      {
        id: "4",
        name: "Brake Caliper Repair Kit",
        description: "Complete repair kit for brake calipers",
        price: 3200,
        image: "https://images.unsplash.com/photo-1617886322168-72b886573c5a?q=80&w=200&h=200&auto=format&fit=crop",
      },
    ],
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        discountedPrice: product.discountedPrice,
        image: product.images[0],
      },
      quantity,
    )

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="container px-4 md:px-6 py-4">
        <nav className="flex items-center text-sm overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="text-gray-500 hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500 flex-shrink-0" />
          <Link href="/category/brake-systems" className="text-gray-500 hover:text-primary">
            Brake Systems
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500 flex-shrink-0" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <section className="container px-4 md:px-6 py-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border bg-white">
              <Image
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.discount && <Badge className="absolute top-4 left-4 bg-red-500">-{product.discount}% OFF</Badge>}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square relative overflow-hidden rounded-md border bg-white cursor-pointer ${activeImage === index ? "border-primary" : "hover:border-primary"}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              {product.discount ? (
                <>
                  <span className="text-2xl md:text-3xl font-bold">KSh {product.discountedPrice.toLocaleString()}</span>
                  <span className="text-lg md:text-xl text-gray-500 line-through">
                    KSh {product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-2xl md:text-3xl font-bold">KSh {product.price.toLocaleString()}</span>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              <p className="text-sm text-gray-500">
                Brand: <span className="font-medium text-gray-900">{product.brand}</span>
              </p>
              <p className="text-sm text-gray-500">
                Availability:
                <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.stock > 0 ? ` In Stock (${product.stock} available)` : " Out of Stock"}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Compatible with:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {product.compatibility.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-none"
                  disabled={product.stock <= 0 || quantity <= 1}
                  onClick={decrementQuantity}
                >
                  -
                </Button>
                <div className="h-10 w-12 flex items-center justify-center border-y">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-none"
                  disabled={product.stock <= 0 || quantity >= product.stock}
                  onClick={incrementQuantity}
                >
                  +
                </Button>
              </div>
              <Button className="flex-1" size="lg" disabled={product.stock <= 0} onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-gray-500">For orders over KSh 5,000</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">1 Year Warranty</p>
                  <p className="text-xs text-gray-500">Manufacturer warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="container px-4 md:px-6 py-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4 md:p-6 border rounded-md mt-6">
            <div className="space-y-4">
              <p className="text-sm md:text-base">{product.description}</p>
              <h3 className="text-lg font-semibold mt-6">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="p-4 md:p-6 border rounded-md mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b text-sm md:text-base">
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 md:p-6 border rounded-md mt-6">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold">{product.rating}</div>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{product.reviews} reviews</div>
                </div>
                <div className="flex-1">
                  {/* This would be populated with actual review data in a real app */}
                  <div className="text-center text-gray-500 py-8">
                    Reviews would be displayed here in a real application
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Write a Review
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      <section className="container px-4 md:px-6 py-12 border-t">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              id={relatedProduct.id}
              name={relatedProduct.name}
              description={relatedProduct.description}
              price={relatedProduct.price}
              image={relatedProduct.image}
            />
          ))}
        </div>
      </section>

      {/* Footer would go here - same as in the home page */}
    </div>
  )
}

