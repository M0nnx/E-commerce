"use client"

import { useState } from "react"
import { DashboardLayout } from "./dashboard-layout"
import { ProductsTable } from "./products-table"
import { ProductEditModal } from "./product-edit-modal"
import type { Product } from "@/lib/types"

// Mock data for products
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 199.99,
    category: "Electronics",
    stock: 45,
    image: "/placeholder.svg?height=100&width=100",
    description: "High-quality wireless headphones with noise cancellation.",
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    category: "Clothing",
    stock: 120,
    image: "/placeholder.svg?height=100&width=100",
    description: "Comfortable and eco-friendly cotton t-shirt.",
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    category: "Accessories",
    stock: 78,
    image: "/placeholder.svg?height=100&width=100",
    description: "Durable water bottle that keeps drinks cold for 24 hours.",
  },
  {
    id: "4",
    name: "Wireless Charging Pad",
    price: 39.99,
    category: "Electronics",
    stock: 32,
    image: "/placeholder.svg?height=100&width=100",
    description: "Fast wireless charging for compatible devices.",
  },
  {
    id: "5",
    name: "Leather Wallet",
    price: 49.99,
    category: "Accessories",
    stock: 65,
    image: "/placeholder.svg?height=100&width=100",
    description: "Genuine leather wallet with multiple card slots.",
  },
]

export function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditModalOpen(true)
  }

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    setIsEditModalOpen(false)
    setSelectedProduct(null)
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products Management</h1>
          <button
            onClick={() => {
              setSelectedProduct({
                id: String(Date.now()),
                name: "",
                price: 0,
                category: "",
                stock: 0,
                image: "/placeholder.svg?height=100&width=100",
                description: "",
              })
              setIsEditModalOpen(true)
            }}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Add New Product
          </button>
        </div>

        <ProductsTable products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />

        {selectedProduct && (
          <ProductEditModal
            product={selectedProduct}
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false)
              setSelectedProduct(null)
            }}
            onSave={handleSaveProduct}
          />
        )}
      </div>
    </DashboardLayout>
  )
}

