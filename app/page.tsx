import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ArrowRight, Search, ShieldCheck, Truck, Clock, CreditCard } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-brand-blue py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/95 to-transparent"></div>
        <div className="container relative px-4 md:px-6 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Premium Car Parts <span className="text-brand-red">Delivered</span> to Your Door
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-lg">
              Quality spare parts for all makes and models. Fast delivery across Kenya with expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-brand-blue border-white" asChild>
                <Link href="/car-search">Find Parts by Car</Link>
              </Button>
            </div>

            <div className="mt-12 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                  <Input
                    placeholder="Search for parts..."
                    className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-white/50 h-12"
                  />
                </div>
                <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white h-12">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b">
        <div className="container px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-brand-lightGray p-2 rounded-full">
                <Truck className="h-6 w-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-blue">Free Delivery</h3>
                <p className="text-xs text-gray-500">On orders over KSh 5,000</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-brand-lightGray p-2 rounded-full">
                <ShieldCheck className="h-6 w-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-blue">Quality Guarantee</h3>
                <p className="text-xs text-gray-500">Genuine & OEM parts</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-brand-lightGray p-2 rounded-full">
                <Clock className="h-6 w-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-blue">Fast Service</h3>
                <p className="text-xs text-gray-500">Same-day dispatch</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-brand-lightGray p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-blue">Secure Payment</h3>
                <p className="text-xs text-gray-500">Multiple payment options</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-brand-cream">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the exact parts you need for your vehicle from our extensive collection
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent group-hover:from-brand-blue/90 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{category.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Featured Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl">Top quality parts at competitive prices</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                discount={product.discount}
                discountedPrice={product.discountedPrice}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-brand-lightGray">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Top Brands</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We partner with the world's leading automotive brands
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {brands.map((brand, index) => (
              <div
                key={brand}
                className="w-24 h-24 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              >
                <Image
                  src={brandLogos[index] || `/placeholder.svg?height=96&width=96&text=${brand}`}
                  alt={brand}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-brand-lightGray p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-brand-blue">John Doe</h3>
                  <p className="text-sm text-gray-500">Toyota Corolla Owner</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I was impressed by the quality of the brake pads I ordered. They arrived quickly and were exactly as
                described. The installation was straightforward and they work perfectly."
              </p>
            </div>

            <div className="bg-brand-lightGray p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  SM
                </div>
                <div>
                  <h3 className="font-bold text-brand-blue">Sarah Miller</h3>
                  <p className="text-sm text-gray-500">Honda Civic Owner</p>
                </div>
              </div>
              <p className="text-gray-700">
                "AutoSpares Kenya has become my go-to shop for all car parts. Their prices are competitive and the
                customer service is exceptional. I highly recommend them!"
              </p>
            </div>

            <div className="bg-brand-lightGray p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  RJ
                </div>
                <div>
                  <h3 className="font-bold text-brand-blue">Robert Johnson</h3>
                  <p className="text-sm text-gray-500">Nissan X-Trail Owner</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Finding parts for my Nissan used to be a challenge until I discovered AutoSpares Kenya. Their website
                is easy to navigate and they have an impressive inventory of genuine parts."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find the Perfect Parts for Your Vehicle?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of satisfied customers who trust AutoSpares Kenya for quality car parts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Sample data
const categories = [
  {
    name: "Engine Parts",
    slug: "engine-parts",
    image: "https://images.unsplash.com/photo-1620085790206-7a8a6547dc05?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Brake Systems",
    slug: "brake-systems",
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Lighting",
    slug: "lighting",
    image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Suspension",
    slug: "suspension",
    image: "https://images.unsplash.com/photo-1537041373723-5a3677a1807f?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Body Parts",
    slug: "body-parts",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1549399542-7e8ee8c3a59e?q=80&w=200&h=200&auto=format&fit=crop",
  },
]

const products = [
  {
    id: 1,
    name: "Premium Brake Pads - Toyota",
    description: "High-performance ceramic brake pads for Toyota vehicles. Excellent stopping power and low dust.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 10,
    discountedPrice: 4050,
  },
  {
    id: 2,
    name: "Engine Oil Filter - Universal",
    description: "High-quality oil filter that removes contaminants and extends engine life.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1620085790206-7a8a6547dc05?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
  },
  {
    id: 3,
    name: "LED Headlight Set - Subaru",
    description: "Bright, energy-efficient LED headlights for Subaru models. Easy installation.",
    price: 12000,
    image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 15,
    discountedPrice: 10200,
  },
  {
    id: 4,
    name: "Alternator - Honda Accord",
    description: "OEM quality alternator for Honda Accord. 2-year warranty included.",
    price: 18500,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
  },
]

const brands = ["Toyota", "Honda", "Nissan", "Subaru", "Mitsubishi", "Mazda", "BMW", "Mercedes"]

const brandLogos = [
  "https://images.unsplash.com/photo-1617469767053-8f35aaa9b3dd?q=80&w=96&h=96&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=96&h=96&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580274418792-d0c3c6c5ccf9?q=80&w=96&h=96&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=96&h=96&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1619722087489-f0b1a6d3e4c4?q=80&w=96&h=96&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621248593378-ff1dc8a3a2c4?q=80&w=96&h=96&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617654112368-307921291f42?q=80&w=96&h=96&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610915504025-d806f0041582?q=80&w=96&h=96&auto=format&fit=crop",
]

