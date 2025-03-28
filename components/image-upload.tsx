"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
}

export function ImageUpload({ value = [], onChange, maxImages = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Check if adding these files would exceed the maximum
    if (value.length + files.length > maxImages) {
      toast({
        title: "Maximum images exceeded",
        description: `You can only upload a maximum of ${maxImages} images`,
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    const uploadedUrls: string[] = []
    const totalFiles = files.length

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "products")

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Upload failed")
        }

        const data = await response.json()
        uploadedUrls.push(data.url)

        // Update progress
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100))
      } catch (error) {
        console.error("Error uploading image:", error)
        toast({
          title: "Upload failed",
          description: "There was an error uploading your image",
          variant: "destructive",
        })
      }
    }

    setIsUploading(false)
    setUploadProgress(0)
    onChange([...value, ...uploadedUrls])

    // Reset the input
    e.target.value = ""
  }

  const removeImage = (index: number) => {
    const newUrls = [...value]
    newUrls.splice(index, 1)
    onChange(newUrls)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
            <Image src={url || "/placeholder.svg"} alt={`Product image ${index + 1}`} fill className="object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={() => removeImage(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}

        {value.length < maxImages && (
          <div className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-4 aspect-square">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
              disabled={isUploading}
            />
            {isUploading ? (
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Uploading... {uploadProgress}%</p>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500 text-center">Drag and drop or click to upload</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  Select Images
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500">Upload up to {maxImages} images. Recommended size: 800x800 pixels.</p>
    </div>
  )
}

