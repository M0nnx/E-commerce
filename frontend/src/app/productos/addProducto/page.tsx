"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Producto, Categoria } from "../../../types/producto"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster } from "@/components/ui/sonner"
import { Upload, ImagePlus, ArrowLeft } from "lucide-react"
import toast from 'react-hot-toast';
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function AgregarProducto() {
  const [producto, setProducto] = useState<Producto>({
    id: 0,
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    categoria: "",
    urlfoto: "",
  })

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categorias/")
        if (response.ok) {
          const data = await response.json()
          setCategorias(data)
        } else {
          toast.error("Error al cargar las categorías")
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error)
        toast.error("No se pudieron cargar las categorías")
      }
    }
    
    fetchCategorias()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === "precio" || name === "stock") {
      setProducto({ ...producto, [name]: parseFloat(value) || 0 })
    } else {
      setProducto({ ...producto, [name]: value })
    }
  }

  const handleSelectChange = (value: string) => {
    setProducto({ ...producto, categoria: value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setProducto({ ...producto, urlfoto: file })
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("nombre", producto.nombre)
      formData.append("precio", producto.precio.toString())
      formData.append("descripcion", producto.descripcion)
      formData.append("categoria", producto.categoria)
      formData.append("stock", producto.stock.toString())

      if (producto.urlfoto instanceof File) {
        formData.append("imagen", producto.urlfoto)
      }

      const response = await fetch("http://localhost:8000/api/productos/", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        toast.success("Producto agregado correctamente")

        setProducto({
          id: 0,
          nombre: "",
          descripcion: "",
          precio: 0,
          stock: 0,
          categoria: "",
          urlfoto: "",
        })
        setPreviewImage(null)
      } else {
        const errorData = await response.json()
        let errorMessage = "Error al agregar el producto"
        
        if (errorData.detail) {
          errorMessage = errorData.detail
        } else if (typeof errorData === 'object') {
          const errors = Object.entries(errorData)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join('; ')
          
          if (errors) errorMessage = errors
        }
        
        throw new Error(errorMessage)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Hubo un error al agregar el producto");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-10 px-4">
      <div className="mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a productos
            </Link>
          </div>
        <Toaster />
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Agregar Producto Nuevo</CardTitle>
            <CardDescription>Complete el formulario para agregar un nuevo producto al inventario</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del producto</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre del producto"
                      value={producto.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="precio">Precio (CLP)</Label>
                    <Input
                      id="precio"
                      name="precio"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={producto.precio || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock disponible</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      placeholder="0"
                      min="0"
                      value={producto.stock || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoría</Label>
                    <Select value={producto.categoria} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.length > 0 ? (
                          categorias.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.nombre}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="cargando" disabled>
                            Cargando categorías...
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción detallada del producto"
                    value={producto.descripcion}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imagen">Imagen del producto</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 h-40">
                      {previewImage ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={previewImage}
                            alt="Vista previa"
                            layout="fill" 
                            objectFit="contain" 
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-1 text-sm text-gray-500">Vista previa de la imagen</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="imagen"
                        className="cursor-pointer flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-6 w-6 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold">Haga clic para cargar la imagen o arrastre desde su dispositivo</span>
                          </p>
                        </div>
                        <Input id="imagen" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <CardFooter className="flex justify-end px-0 pt-4">
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                      Procesando...
                    </div>
                  ) : (
                    "Agregar Producto"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer/>
    </div>
  )
}