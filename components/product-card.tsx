"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { ShoppingCart, Heart } from "lucide-react"

type ProductCardProps = {
  id: number | string
  name: string
  description: string
  price: number
  image: string
  discount?: number | null
  discountedPrice?: number | null
}

export function ProductCard({ id, name, description, price, image, discount, discountedPrice }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      discountedPrice,
      image,
    })

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden group bg-white/90 backdrop-blur-md border border-gray-100 hover:border-brand-blue hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <Link href={`/product/${id}`} className="block aspect-square relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {discount && <Badge className="absolute top-2 right-2 bg-brand-red text-white">-{discount}%</Badge>}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
            <Heart className="h-4 w-4 text-brand-red" />
          </Button>
        </div>
      </Link>
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <Link href={`/product/${id}`} className="block flex-grow">
          <h3 className="font-semibold text-base md:text-lg line-clamp-2 mb-1 text-brand-blue group-hover:text-brand-red transition-colors">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 line-clamp-2 mb-2">{description}</p>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto gap-2">
          <div className="flex flex-col">
            {discountedPrice ? (
              <>
                <span className="text-base md:text-lg font-bold text-brand-blue">
                  KSh {discountedPrice.toLocaleString()}
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">KSh {price.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-base md:text-lg font-bold text-brand-blue">KSh {price.toLocaleString()}</span>
            )}
          </div>
          <Button
            size="sm"
            className="w-full sm:w-auto text-xs md:text-sm bg-brand-blue hover:bg-brand-blue/90 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  )
}

