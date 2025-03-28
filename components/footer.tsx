import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <BrandLogo variant="white" />
            <p className="text-white/80 text-sm mt-4 max-w-xs">
              Your trusted source for quality car spare parts in Kenya since 2010. We provide genuine and aftermarket
              parts for all major vehicle brands.
            </p>
            <div className="flex items-center space-x-3">
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-white/80 hover:text-white transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-white/80 hover:text-white transition-colors">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link href="/car-search" className="text-white/80 hover:text-white transition-colors">
                  Find Parts by Car
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/engine-parts" className="text-white/80 hover:text-white transition-colors">
                  Engine Parts
                </Link>
              </li>
              <li>
                <Link href="/category/brake-systems" className="text-white/80 hover:text-white transition-colors">
                  Brake Systems
                </Link>
              </li>
              <li>
                <Link href="/category/lighting" className="text-white/80 hover:text-white transition-colors">
                  Lighting
                </Link>
              </li>
              <li>
                <Link href="/category/suspension" className="text-white/80 hover:text-white transition-colors">
                  Suspension
                </Link>
              </li>
              <li>
                <Link href="/category/body-parts" className="text-white/80 hover:text-white transition-colors">
                  Body Parts
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-white/80 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-brand-red flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Mombasa Road, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-brand-red flex-shrink-0" />
                <span className="text-white/80">+254 700 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-brand-red flex-shrink-0" />
                <span className="text-white/80">info@autospareskenya.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button className="bg-brand-red hover:bg-brand-red/90 text-white">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} AutoSpares Kenya. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-white/60 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-white/60 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/shipping-policy" className="text-white/60 hover:text-white text-sm">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

