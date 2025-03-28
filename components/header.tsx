"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, ChevronDown } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BrandLogo } from "@/components/brand-logo"

// Categories data
const categories = [
  { name: "Engine Parts", slug: "engine-parts" },
  { name: "Brake Systems", slug: "brake-systems" },
  { name: "Lighting", slug: "lighting" },
  { name: "Suspension", slug: "suspension" },
  { name: "Body Parts", slug: "body-parts" },
  { name: "Accessories", slug: "accessories" },
]

export function Header() {
  const { totalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <BrandLogo size="md" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="font-medium transition-colors hover:text-brand-red">
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 font-medium transition-colors hover:text-brand-red">
                Categories
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full z-50 hidden group-hover:block bg-white/90 backdrop-blur-md border rounded-lg shadow-lg p-4 w-48">
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="text-sm hover:text-brand-red"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/car-search" className="font-medium transition-colors hover:text-brand-red">
              Find Parts by Car
            </Link>
            <Link href="/brands" className="font-medium transition-colors hover:text-brand-red">
              Brands
            </Link>
            <Link href="/deals" className="font-medium transition-colors hover:text-brand-red">
              Deals
            </Link>
            <Link href="/contact" className="font-medium transition-colors hover:text-brand-red">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search parts..."
              className="pl-8 w-[200px] lg:w-[300px] bg-white/50 backdrop-blur-sm"
            />
          </form>
          <Button variant="outline" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-brand-red">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex" asChild>
            <Link href="/admin">
              <span className="flex items-center gap-1">Admin</span>
            </Link>
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full bg-white">
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <BrandLogo size="md" />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <Menu className="h-5 w-5 rotate-90" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <form className="relative mt-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search parts..."
                  className="pl-8 w-full bg-white/50 backdrop-blur-sm"
                />
              </form>
            </div>
            <nav className="flex flex-col gap-4 p-4 bg-white">
              <Link
                href="/"
                className="font-medium transition-colors hover:text-brand-red"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <div className="relative">
                <button className="flex items-center gap-1 font-medium transition-colors hover:text-brand-red">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="ml-4 mt-2 grid gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="text-sm hover:text-brand-red"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/car-search"
                className="font-medium transition-colors hover:text-brand-red"
                onClick={() => setIsOpen(false)}
              >
                Find Parts by Car
              </Link>
              <Link
                href="/brands"
                className="font-medium transition-colors hover:text-brand-red"
                onClick={() => setIsOpen(false)}
              >
                Brands
              </Link>
              <Link
                href="/deals"
                className="font-medium transition-colors hover:text-brand-red"
                onClick={() => setIsOpen(false)}
              >
                Deals
              </Link>
              <Link
                href="/contact"
                className="font-medium transition-colors hover:text-brand-red"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="font-medium transition-colors hover:text-brand-red"
                onClick={() => setIsOpen(false)}
              >
                Admin Area
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

