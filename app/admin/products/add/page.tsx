"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "@/components/image-upload"
import { toast } from "@/hooks/use-toast"

interface Category {
  id: number
  name: string
  slug: string
}

interface Brand {
  id: number
  name: string
  slug: string
}

export default function AddProductPage() {
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    cost: "",
    discount: "",
    category_id: "",
    brand_id: "",
    stock: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    features: "",
    compatible_makes: [] as string[],
    compatible_models: {} as Record<string, string[]>,
    specifications: "",
    status: "Active",
    meta_title: "",
    meta_description: "",
    is_featured: false,
  })

  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // Data for dropdowns
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingBrands, setLoadingBrands] = useState(true)

  // Car makes and models for compatibility
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

  // Fetch categories and brands on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        setCategories(data.categories)
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        })
      } finally {
        setLoadingCategories(false)
      }
    }

    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands")
        const data = await response.json()
        setBrands(data.brands)
      } catch (error) {
        console.error("Error fetching brands:", error)
        toast({
          title: "Error",
          description: "Failed to load brands",
          variant: "destructive",
        })
      } finally {
        setLoadingBrands(false)
      }
    }

    fetchCategories()
    fetchBrands()
  }, [])

  // Get available models for selected makes
  const availableModels = formData.compatible_makes.reduce((acc, make) => {
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
        compatible_makes: [...prev.compatible_makes, make],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        compatible_makes: prev.compatible_makes.filter((m) => m !== make),
        compatible_models: Object.fromEntries(Object.entries(prev.compatible_models).filter(([key]) => key !== make)),
      }))
    }
  }

  // Handle compatible model selection
  const handleModelSelection = (make: string, model: string, isChecked: boolean) => {
    setFormData((prev) => {
      const currentModels = prev.compatible_models[make] || []

      if (isChecked) {
        return {
          ...prev,
          compatible_models: {
            ...prev.compatible_models,
            [make]: [...currentModels, model],
          },
        }
      } else {
        return {
          ...prev,
          compatible_models: {
            ...prev.compatible_models,
            [make]: currentModels.filter((m) => m !== model),
          },
        }
      }
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.price || !formData.category_id) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare data for API
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        cost: formData.cost ? Number.parseFloat(formData.cost) : null,
        discount: formData.discount ? Number.parseFloat(formData.discount) : null,
        stock: Number.parseInt(formData.stock),
        weight: formData.weight ? Number.parseFloat(formData.weight) : null,
        dimensions: {
          length: formData.dimensions.length ? Number.parseFloat(formData.dimensions.length) : null,
          width: formData.dimensions.width ? Number.parseFloat(formData.dimensions.width) : null,
          height: formData.dimensions.height ? Number.parseFloat(formData.dimensions.height) : null,
        },
        images: imageUrls,
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error("Failed to add product")
      }

      toast({
        title: "Success",
        description: "Product added successfully",
      })

      // Redirect to products page
      router.push("/admin/products")
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-gray-500 mt-1">Fill in the details to add a new product to your inventory</p>
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
                      <CardDescription>Enter the basic product information</CardDescription>
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
                      <CardDescription>Set product pricing information</CardDescription>
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
                            step="0.01"
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
                            step="0.01"
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
                            step="0.01"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category_id">
                            Category <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.category_id}
                            onValueChange={(value) => handleSelectChange("category_id", value)}
                            disabled={loadingCategories}
                          >
                            <SelectTrigger id="category_id">
                              <SelectValue
                                placeholder={loadingCategories ? "Loading categories..." : "Select category"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand_id">Brand</Label>
                          <Select
                            value={formData.brand_id}
                            onValueChange={(value) => handleSelectChange("brand_id", value)}
                            disabled={loadingBrands}
                          >
                            <SelectTrigger id="brand_id">
                              <SelectValue placeholder={loadingBrands ? "Loading brands..." : "Select brand"} />
                            </SelectTrigger>
                            <SelectContent>
                              {brands.map((brand) => (
                                <SelectItem key={brand.id} value={brand.id.toString()}>
                                  {brand.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="is_featured"
                          checked={formData.is_featured}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => ({
                              ...prev,
                              is_featured: checked as boolean,
                            }))
                          }}
                        />
                        <Label htmlFor="is_featured">Feature this product on homepage and category pages</Label>
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
                      <CardDescription>Add detailed product features and specifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="features">Features (one per line)</Label>
                        <Textarea
                          id="features"
                          name="features"
                          value={formData.features}
                          onChange={handleInputChange}
                          placeholder="Enter product features, one per line
e.g., Ceramic compound for quiet braking and less dust
Chamfered and slotted for noise reduction
Includes hardware kit for complete installation"
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
                          placeholder="Enter specifications as Key: Value, one per line
e.g., Material: Ceramic
Position: Front
Thickness: 15mm"
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
                        <Label htmlFor="meta_title">Meta Title</Label>
                        <Input
                          id="meta_title"
                          name="meta_title"
                          value={formData.meta_title}
                          onChange={handleInputChange}
                          placeholder="e.g., Premium Brake Pads for Toyota Corolla | AutoSpares Kenya"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meta_description">Meta Description</Label>
                        <Textarea
                          id="meta_description"
                          name="meta_description"
                          value={formData.meta_description}
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
                                checked={formData.compatible_makes.includes(make)}
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

                      {formData.compatible_makes.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Compatible Models</h3>

                          <div className="space-y-4">
                            {formData.compatible_makes.map((make) => (
                              <div key={make} className="border rounded-md p-4">
                                <h4 className="font-medium mb-2">{make} Models</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {carModels[make]?.map((model) => (
                                    <div key={`${make}-${model}`} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`model-${make}-${model}`}
                                        checked={(formData.compatible_models[make] || []).includes(model)}
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
                      <CardDescription>Upload product images (recommended size: 800x800 pixels)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ImageUpload value={imageUrls} onChange={setImageUrls} maxImages={5} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                  <CardDescription>Product status and visibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.is_featured}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            is_featured: checked as boolean,
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
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Saving..." : "Save Product"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Required Fields</CardTitle>
                  <CardDescription>Fields marked with * are required</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className={formData.name ? "text-green-500" : "text-red-500"}>
                        {formData.name ? "✓" : "•"}
                      </span>
                      <span className="ml-2">Product Name</span>
                    </li>
                    <li className="flex items-center">
                      <span className={formData.sku ? "text-green-500" : "text-red-500"}>
                        {formData.sku ? "✓" : "•"}
                      </span>
                      <span className="ml-2">SKU</span>
                    </li>
                    <li className="flex items-center">
                      <span className={formData.price ? "text-green-500" : "text-red-500"}>
                        {formData.price ? "✓" : "•"}
                      </span>
                      <span className="ml-2">Price</span>
                    </li>
                    <li className="flex items-center">
                      <span className={formData.category_id ? "text-green-500" : "text-red-500"}>
                        {formData.category_id ? "✓" : "•"}
                      </span>
                      <span className="ml-2">Category</span>
                    </li>
                    <li className="flex items-center">
                      <span className={formData.description ? "text-green-500" : "text-red-500"}>
                        {formData.description ? "✓" : "•"}
                      </span>
                      <span className="ml-2">Description</span>
                    </li>
                    <li className="flex items-center">
                      <span className={formData.stock ? "text-green-500" : "text-red-500"}>
                        {formData.stock ? "✓" : "•"}
                      </span>
                      <span className="ml-2">Stock</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 border-t pt-6">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/products">Cancel</Link>
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, status: "Draft" }))
                  toast({
                    title: "Saved as Draft",
                    description: "Product has been saved as a draft",
                  })
                }}
              >
                Save as Draft
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Publishing..." : "Publish Product"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

