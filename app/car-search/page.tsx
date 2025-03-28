"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ProductCard } from "@/components/product-card"

// Sample car makes data
const carMakes = [
  {
    id: 1,
    name: "Toyota",
    logo: "https://images.unsplash.com/photo-1617469767053-8f35aaa9b3dd?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Honda",
    logo: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Nissan",
    logo: "https://images.unsplash.com/photo-1580274418792-d0c3c6c5ccf9?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Mazda",
    logo: "https://images.unsplash.com/photo-1621248593378-ff1dc8a3a2c4?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Subaru",
    logo: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Mitsubishi",
    logo: "https://images.unsplash.com/photo-1619722087489-f0b1a6d3e4c4?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Mercedes-Benz",
    logo: "https://images.unsplash.com/photo-1617469767053-8f35aaa9b3dd?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "BMW",
    logo: "https://images.unsplash.com/photo-1617654112368-307921291f42?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Volkswagen",
    logo: "https://images.unsplash.com/photo-1622987572236-8f779ad476e2?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Audi",
    logo: "https://images.unsplash.com/photo-1610915504025-d806f0041582?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Ford",
    logo: "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "Hyundai",
    logo: "https://images.unsplash.com/photo-1617080090037-1c7d7a01c390?q=80&w=100&h=100&auto=format&fit=crop",
  },
]

// Sample models by make
const carModelsByMake: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "Prius", "Hilux", "Land Cruiser", "Fortuner", "Yaris"],
  Honda: ["Civic", "Accord", "CR-V", "HR-V", "Fit", "Pilot", "Jazz"],
  Nissan: ["Altima", "Sentra", "X-Trail", "Qashqai", "Navara", "Patrol", "Juke"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "CX-3", "MX-5", "BT-50"],
  Subaru: ["Impreza", "Forester", "Outback", "Legacy", "XV", "WRX"],
  Mitsubishi: ["Lancer", "Outlander", "Pajero", "ASX", "L200", "Eclipse Cross"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "A-Class"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series", "1 Series"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Polo", "Touareg", "Jetta"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  Ford: ["Focus", "Fiesta", "Ranger", "Everest", "EcoSport", "Mustang"],
  Hyundai: ["Elantra", "Tucson", "Santa Fe", "i10", "i20", "Accent"],
}

// Sample years range
const years = Array.from({ length: 25 }, (_, i) => 2024 - i)

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Premium Brake Pads - Toyota Corolla",
    description: "High-performance ceramic brake pads for Toyota Corolla. Excellent stopping power and low dust.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 10,
    discountedPrice: 4050,
    compatibility: ["Toyota Corolla (2015-2022)"],
  },
  {
    id: 2,
    name: "Engine Oil Filter - Toyota",
    description: "High-quality oil filter that removes contaminants and extends engine life.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1620085790206-7a8a6547dc05?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    compatibility: ["Toyota Corolla", "Toyota Camry", "Toyota RAV4"],
  },
  {
    id: 3,
    name: "LED Headlight Set - Toyota Corolla",
    description: "Bright, energy-efficient LED headlights for Toyota Corolla models. Easy installation.",
    price: 12000,
    image: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?q=80&w=300&h=300&auto=format&fit=crop",
    discount: 15,
    discountedPrice: 10200,
    compatibility: ["Toyota Corolla (2018-2022)"],
  },
  {
    id: 4,
    name: "Alternator - Toyota Corolla",
    description: "OEM quality alternator for Toyota Corolla. 2-year warranty included.",
    price: 18500,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=300&h=300&auto=format&fit=crop",
    discount: null,
    discountedPrice: null,
    compatibility: ["Toyota Corolla (2015-2022)"],
  },
]

export default function CarSearchPage() {
  const [selectedMake, setSelectedMake] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<typeof sampleProducts | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Reset model when make changes
  useEffect(() => {
    setSelectedModel(null)
  }, [selectedMake])

  // Handle search submission
  const handleSearch = () => {
    if (!selectedMake) return

    setIsSearching(true)

    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would be an API call with the selected make, model, and year
      setSearchResults(sampleProducts)
      setIsSearching(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Parts For Your Vehicle</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Select your vehicle details below to find the exact parts that fit your car. We offer a wide range of
            quality parts for all major makes and models.
          </p>
        </div>

        {/* Car Selection Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="car-make" className="mb-2 block">
                Car Make
              </Label>
              <select
                id="car-make"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedMake || ""}
                onChange={(e) => setSelectedMake(e.target.value || null)}
              >
                <option value="">Select Make</option>
                {carMakes.map((make) => (
                  <option key={make.id} value={make.name}>
                    {make.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="car-model" className="mb-2 block">
                Car Model
              </Label>
              <select
                id="car-model"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedModel || ""}
                onChange={(e) => setSelectedModel(e.target.value || null)}
                disabled={!selectedMake}
              >
                <option value="">Select Model</option>
                {selectedMake &&
                  carModelsByMake[selectedMake]?.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <Label htmlFor="car-year" className="mb-2 block">
                Year
              </Label>
              <select
                id="car-year"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(e.target.value || null)}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button size="lg" onClick={handleSearch} disabled={!selectedMake || isSearching}>
              {isSearching ? "Searching..." : "Find Parts"}
            </Button>
          </div>
        </div>

        {/* Popular Car Makes */}
        {!searchResults && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Popular Car Makes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {carMakes.map((make) => (
                <div
                  key={make.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedMake(make.name)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                >
                  <div className="w-16 h-16 relative mb-3">
                    <Image src={make.logo || "/placeholder.svg"} alt={make.name} fill className="object-contain" />
                  </div>
                  <span className="font-medium text-center">{make.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-bold">
                Parts for {selectedMake} {selectedModel} {selectedYear && `(${selectedYear})`}
              </h2>
              <Button variant="outline" onClick={() => setSearchResults(null)}>
                New Search
              </Button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {searchResults.map((product) => (
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
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No parts found</h3>
                <p className="text-gray-500 mb-4">We couldn't find any parts matching your vehicle selection.</p>
                <Button onClick={() => setSearchResults(null)}>Try Another Search</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

