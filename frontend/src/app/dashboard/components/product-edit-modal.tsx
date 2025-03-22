"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload } from "lucide-react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProductEditModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
}

export function ProductEditModal({ product, isOpen, onClose, onSave }: ProductEditModalProps) {
  const [formData, setFormData] = useState<Product>({ ...product })
  const [imagePreview, setImagePreview] = useState<string>(product.image)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle numeric values
    if (name === "price" || name === "stock") {
      setFormData({
        ...formData,
        [name]: name === "price" ? Number.parseFloat(value) : Number.parseInt(value, 10),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to your server/cloud storage
      // For this demo, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      setFormData({
        ...formData,
        image: imageUrl,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{product.id ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label>Product Image</Label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 h-[250px]">
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Product preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-center">No image selected</div>
                )}
              </div>
              <div className="flex justify-center">
                <Label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Label>
                <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

