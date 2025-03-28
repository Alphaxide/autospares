"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Plus, X, Save, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

// Sample categories for the dropdown
const categories = [
  { id: "engine-parts", name: "Engine Parts" },
  { id: "brake-systems", name: "Brake Systems" },
  { id: "lighting", name: "Lighting" },
  { id: "suspension", name: "Suspension" },
  { id: "body-parts", name: "Body Parts" },
  { id: "accessories", name: "Accessories" },
  { id: "electrical", name: "Electrical" },
  { id: "oils-fluids", name: "Oils & Fluids" },
]

// Sample brands for the dropdown
const brands = [
  "Toyota",
  "Honda",
  "Nissan",
  "Subaru",
  "Mitsubishi",
  "Mazda",
  "BMW",
  "Mercedes",
  "Bosch",
  "NGK",
  "Denso",
  "Continental",
  "Brembo",
  "Castrol",
  "Philips",
  "KYB",
  "Moog",
  "Monroe",
  "K&N",
  "Gates",
]

// Sample car makes for compatibility
const carMakes = [
  "Toyota",
  "Honda",
  "Nissan",
  "Subaru",
  "Mitsubishi",
  "Mazda",
  "BMW",
  "Mercedes",
  "Volkswagen",
  "Audi",
  "Ford",
  "Hyundai",
]

// Sample car models by make for compatibility
const carModels: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "Prius", "Hilux", "Land Cruiser"],
  Honda: ["Civic", "Accord", "CR-V", "HR-V", "Fit", "Jazz"],
  Nissan: ["Altima", "Sentra", "X-Trail", "Qashqai", "Navara", "Patrol"],
  Subaru: ["Impreza", "Forester", "Outback", "Legacy", "XV", "WRX"],
  Mitsubishi: ["Lancer", "Outlander", "Pajero", "ASX", "L200"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "CX-3", "MX-5", "BT-50"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series", "1 Series"],
  Mercedes: ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "A-Class"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Polo", "Touareg", "Jetta"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  Ford: ["Focus", "Fiesta", "Ranger", "Everest", "EcoSport", "Mustang"],
  Hyundai: ["Elantra", "Tucson", "Santa Fe", "i10", "i20", "Accent"],
}

// Sample products data for editing
const productsData = [
  {
    id: 1,
    name: "Premium Brake Pads - Toyota Corolla",
    sku: "BP-TOY-15-22",
    description:
      "High-performance ceramic brake pads designed specifically for Toyota Corolla models from 2015 to 2022. These premium brake pads offer excellent stopping power, minimal noise, and reduced brake dust.",
    price: 4500,
    cost: 3200,
    discountedPrice: 4050,
    discount: 10,
    category: "brake-systems",
    brand: "Brembo",
    stock: 15,
    weight: "1.2",
    dimensions: {
      length: "136",
      width: "109",
      height: "15",
    },
    features:
      "Ceramic compound for quiet braking and less dust\nChamfered and slotted for noise reduction\nIncludes hardware kit for complete installation\nMeets or exceeds OEM specifications\nHeat-resistant for consistent performance",
    specifications: "Material: Ceramic\nPosition: Front\nThickness: 15mm\nWidth: 109mm\nLength: 136mm\nWeight: 1.2kg",
    compatibleMakes: ["Toyota"],
    compatibleModels: {
      Toyota: ["Corolla", "Auris"],
    },
    status: "Active",
    imageUrls: ["https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=300&h=300&auto=format&fit=crop"],
    metaTitle: "Premium Brake Pads for Toyota Corolla (2015-2022) | AutoSpares Kenya",
    metaDescription:
      "High-performance ceramic brake pads for Toyota Corolla and Auris. Excellent stopping power, minimal noise, and reduced brake dust. Free delivery in Nairobi.",
    isFeatured: true,
  },
]

export default function EditProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)

  // For demo purposes, find product from sample data
  const productToEdit = productsData.find((p) => p.id === productId)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    cost: "",
    discount: "",
    category: "",
    brand: "",
    stock: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    features: "",
    compatibleMakes: [] as string[],
    compatibleModels: {} as Record<string, string[]>,
    specifications: "",
    status: "Active",
    images: [] as File[],
    imageUrls: [] as string[],
    metaTitle: "",
    metaDescription: "",
    isFeatured: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [isLoading, setIsLoading] = useState(true)

  // Load product data when component mounts
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        sku: productToEdit.sku,
        description: productToEdit.description,
        price: productToEdit.price.toString(),
        cost: productToEdit.cost.toString(),
        discount: productToEdit.discount?.toString() || "",
        category: productToEdit.category,
        brand: productToEdit.brand,
        stock: productToEdit.stock.toString(),
        weight: productToEdit.weight,
        dimensions: productToEdit.dimensions,
        features: productToEdit.features,
        compatibleMakes: productToEdit.compatibleMakes,
        compatibleModels: productToEdit.compatibleModels,
        specifications: productToEdit.specifications,
        status: productToEdit.status,
        images: [],
        imageUrls: productToEdit.imageUrls,
        metaTitle: productToEdit.metaTitle,
        metaDescription: productToEdit.metaDescription,
        isFeatured: productToEdit.isFeatured,
      })
    }

    // Simulate API loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [productToEdit])

  // Get available models for selected makes
  const availableModels = formData.compatibleMakes.reduce((acc, make) => {
    if (carModels[make]) {
      return [...acc, ...carModels[make]]
    }
    return acc
  }, [] as string[])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle dimensions change
  const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [name]: value,
      },
    }))
  }

  // Handle compatible make selection
  const handleMakeSelection = (make: string, isChecked: boolean) => {
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        compatibleMakes: [...prev.compatibleMakes, make],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        compatibleMakes: prev.compatibleMakes.filter((m) => m !== make),
        compatibleModels: Object.fromEntries(Object.entries(prev.compatibleModels).filter(([key]) => key !== make)),
      }))
    }
  }

  // Handle compatible model selection
  const handleModelSelection = (make: string, model: string, isChecked: boolean) => {
    setFormData((prev) => {
      const currentModels = prev.compatibleModels[make] || []

      if (isChecked) {
        return {
          ...prev,
          compatibleModels: {
            ...prev.compatibleModels,
            [make]: [...currentModels, model],
          },
        }
      } else {
        return {
          ...prev,
          compatibleModels: {
            ...prev.compatibleModels,
            [make]: currentModels.filter((m) => m !== model),
          },
        }
      }
    })
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
      imageUrls: [...prev.imageUrls, ...newFiles.map((file) => URL.createObjectURL(file))],
    }))
  }

  // Remove uploaded image
  const removeImage = (index: number) => {
    setFormData((prev) => {
      const newImages = [...prev.images]
      const newImageUrls = [...prev.imageUrls]

      newImages.splice(index, 1)
      newImageUrls.splice(index, 1)

      return {
        ...prev,
        images: newImages,
        imageUrls: newImageUrls,
      }
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Product Updated",
        description: "The product has been updated successfully",
      })

      // Redirect to products page in a real app
    }, 1500)
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
              <p className="text-gray-500 mt-1">Fetching product details</p>
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

  if (!productToEdit) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/products">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Product Not Found</h1>
              <p className="text-gray-500 mt-1">The product you're trying to edit doesn't exist</p>
            </div>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">We couldn't find the product with ID {params.id}</p>
              <Button asChild>
                <Link href="/admin/products">Return to Products</Link>
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
        <div className="flex items-center gap-2 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Product</h1>
            <p className="text-gray-500 mt-1">Modify product details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="lg:col-span-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Edit the basic product information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Product Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g., Premium Brake Pads - Toyota Corolla"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="sku">
                              SKU <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="sku"
                              name="sku"
                              value={formData.sku}
                              onChange={handleInputChange}
                              placeholder="e.g., BP-TOY-15-22"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="status">
                              Status <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={formData.status}
                              onValueChange={(value) => handleSelectChange("status", value)}
                            >
                              <SelectTrigger id="status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Draft">Draft</SelectItem>
                                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">
                            Description <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Detailed product description"
                            rows={5}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing</CardTitle>
                      <CardDescription>Update product pricing information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">
                            Price (KSh) <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="e.g., 4500"
                            min="0"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cost">Cost (KSh)</Label>
                          <Input
                            id="cost"
                            name="cost"
                            type="number"
                            value={formData.cost}
                            onChange={handleInputChange}
                            placeholder="e.g., 3000"
                            min="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="discount">Discount (%)</Label>
                          <Input
                            id="discount"
                            name="discount"
                            type="number"
                            value={formData.discount}
                            onChange={handleInputChange}
                            placeholder="e.g., 10"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">
                            Category <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => handleSelectChange("category", value)}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand">Brand</Label>
                          <Select value={formData.brand} onValueChange={(value) => handleSelectChange("brand", value)}>
                            <SelectTrigger id="brand">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              {brands.map((brand) => (
                                <SelectItem key={brand} value={brand}>
                                  {brand}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isFeatured"
                          checked={formData.isFeatured}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => ({
                              ...prev,
                              isFeatured: checked as boolean,
                            }))
                          }}
                        />
                        <Label htmlFor="isFeatured">Feature this product on homepage and category pages</Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Inventory</CardTitle>
                      <CardDescription>Manage product inventory</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="stock">
                            Stock Quantity <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleInputChange}
                            placeholder="e.g., 50"
                            min="0"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input
                            id="weight"
                            name="weight"
                            type="number"
                            value={formData.weight}
                            onChange={handleInputChange}
                            placeholder="e.g., 1.5"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Dimensions (cm)</Label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label htmlFor="length" className="text-xs">
                              Length
                            </Label>
                            <Input
                              id="length"
                              name="length"
                              type="number"
                              value={formData.dimensions.length}
                              onChange={handleDimensionsChange}
                              placeholder="e.g., 15"
                              min="0"
                              step="0.1"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="width" className="text-xs">
                              Width
                            </Label>
                            <Input
                              id="width"
                              name="width"
                              type="number"
                              value={formData.dimensions.width}
                              onChange={handleDimensionsChange}
                              placeholder="e.g., 10"
                              min="0"
                              step="0.1"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="height" className="text-xs">
                              Height
                            </Label>
                            <Input
                              id="height"
                              name="height"
                              type="number"
                              value={formData.dimensions.height}
                              onChange={handleDimensionsChange}
                              placeholder="e.g., 5"
                              min="0"
                              step="0.1"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Product Features & Specifications</CardTitle>
                      <CardDescription>Edit product features and specifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="features">Features (one per line)</Label>
                        <Textarea
                          id="features"
                          name="features"
                          value={formData.features}
                          onChange={handleInputChange}
                          placeholder="Enter product features, one per line"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specifications">Specifications (format: Key: Value, one per line)</Label>
                        <Textarea
                          id="specifications"
                          name="specifications"
                          value={formData.specifications}
                          onChange={handleInputChange}
                          placeholder="Enter specifications as Key: Value, one per line"
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>SEO</CardTitle>
                      <CardDescription>Optimize for search engines</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input
                          id="metaTitle"
                          name="metaTitle"
                          value={formData.metaTitle}
                          onChange={handleInputChange}
                          placeholder="e.g., Premium Brake Pads for Toyota Corolla | AutoSpares Kenya"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="metaDescription">Meta Description</Label>
                        <Textarea
                          id="metaDescription"
                          name="metaDescription"
                          value={formData.metaDescription}
                          onChange={handleInputChange}
                          placeholder="e.g., Shop high-quality brake pads for Toyota Corolla. Excellent stopping power, low dust, and long-lasting performance. Free delivery in Nairobi."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Compatibility Tab */}
                <TabsContent value="compatibility" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vehicle Compatibility</CardTitle>
                      <CardDescription>Select which vehicles this product is compatible with</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Compatible Makes</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {carMakes.map((make) => (
                            <div key={make} className="flex items-center space-x-2">
                              <Checkbox
                                id={`make-${make}`}
                                checked={formData.compatibleMakes.includes(make)}
                                onCheckedChange={(checked) => {
                                  handleMakeSelection(make, checked as boolean)
                                }}
                              />
                              <Label htmlFor={`make-${make}`} className="text-sm">
                                {make}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {formData.compatibleMakes.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Compatible Models</h3>

                          <div className="space-y-4">
                            {formData.compatibleMakes.map((make) => (
                              <div key={make} className="border rounded-md p-4">
                                <h4 className="font-medium mb-2">{make} Models</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {carModels[make]?.map((model) => (
                                    <div key={`${make}-${model}`} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`model-${make}-${model}`}
                                        checked={(formData.compatibleModels[make] || []).includes(model)}
                                        onCheckedChange={(checked) => {
                                          handleModelSelection(make, model, checked as boolean)
                                        }}
                                      />
                                      <Label htmlFor={`model-${make}-${model}`} className="text-sm">
                                        {model}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Images</CardTitle>
                      <CardDescription>Update product images (recommended size: 800x800 pixels)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Drag and drop image files here, or click to browse</p>
                        <div className="mt-4">
                          <Label htmlFor="images" className="sr-only">
                            Choose files
                          </Label>
                          <Input
                            id="images"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("images")?.click()}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add More Images
                          </Button>
                        </div>
                      </div>

                      {formData.imageUrls.length > 0 && (
                        <div>
                          <h3 className="font-medium mb-3">Product Images</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.imageUrls.map((url, index) => (
                              <div key={index} className="relative">
                                <div className="aspect-square relative rounded-md overflow-hidden border">
                                  <img
                                    src={url || "/placeholder.svg"}
                                    alt={`Product image ${index + 1}`}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                  <CardDescription>Update status and visibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.isFeatured}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            isFeatured: checked as boolean,
                          }))
                        }}
                      />
                      <Label htmlFor="featured">Feature this product</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status-select">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                        <SelectTrigger id="status-select">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button variant="outline" className="w-full mb-4" asChild>
                    <Link href={`/admin/products/analytics/${params.id}`}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Sales Analytics
                    </Link>
                  </Button>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Additional product details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span className="font-medium">Dec 10, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="font-medium">Jan 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product ID</span>
                      <span className="font-medium">{productId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Sales</span>
                      <span className="font-medium">37 units</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 border-t pt-6">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/products">Cancel</Link>
            </Button>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating Product..." : "Update Product"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

