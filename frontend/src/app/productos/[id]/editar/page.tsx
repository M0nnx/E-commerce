"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ArrowLeft, Save, Upload } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import type { Producto } from "@/types/producto"
import Image from "next/image"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditarProducto() {
  const { id } = useParams<{ id: string }>()
  const [producto, setProducto] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducto = async () => {
      if (!id) {
        setError("ID no disponible")
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/api/productos/view/${id}/`, {
          method: "GET",
        })

        if (!response.ok) {
          throw new Error("Error al cargar los datos del producto")
        }
        const data = await response.json()
        setProducto(data)
        setError(null)
      } catch (err) {
        setError("No se pudo cargar el producto. Por favor, intente de nuevo más tarde.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducto()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Producto) => {
    if (producto) {
      setProducto({
        ...producto,
        [field]: e.target.value,
      })
    }
  }

  const handleCategoryChange = (value: string) => {
    if (producto) {
      setProducto({
        ...producto,
        categoria: value,
      })
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (producto) {
      setProducto({
        ...producto,
        descripcion: e.target.value,
      })
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && producto) {
      // Create preview
      const file = e.target.files[0]
      setImagePreview(URL.createObjectURL(file))

      const formData = new FormData()
      formData.append("imagen", file)
      try {
        const response = await fetch(`http://localhost:8000/api/productos/change/${id}/`, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Error al actualizar la imagen")
        }
        const data = await response.json()

        if (data?.Correcto) {
          setProducto({
            ...producto,
            urlfoto: data.urlfoto,
          })
        } else {
          alert(data?.error || "Hubo un problema al subir la imagen")
        }
      } catch (error) {
        console.error(error)
        alert("No se pudo actualizar la imagen. Intente nuevamente.")
      }
    }
  }

  const categorias = [
    "Frutos Secos",
    "Semillas",
    "Deshidratado",
    "Cereales",
    "Mixes",
    "Huevos",
    "Encurtidos",
    "Chocolates",
    "Otros",
  ]

  const handleSave = async () => {
    if (!producto) return
    setSaving(true)

    const formData = new FormData()
    formData.append("nombre", producto.nombre)
    formData.append("descripcion", producto.descripcion)
    formData.append("precio", producto.precio.toString())
    formData.append("stock", producto.stock.toString())
    formData.append("categoria", producto.categoria)

    if (producto.urlfoto instanceof File) {
      formData.append("urlfoto", producto.urlfoto)
    } else if (typeof producto.urlfoto === "string") {
      formData.append("urlfoto", producto.urlfoto)
    }
    try {
      const response = await fetch(`http://localhost:8000/api/productos/post/${id}/`, {
        method: "PUT",
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Error al guardar los cambios.")
      }
      alert("Producto actualizado correctamente")
    } catch (err) {
      console.error(err)
      alert("No se pudo guardar el producto. Intente nuevamente.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="container mx-auto py-6 sm:py-8 px-4 flex-grow">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-40 mb-6" />
            <Card>
              <CardHeader className="pb-3 border-b">
                <Skeleton className="h-8 w-48 mb-2" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-64 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="container mx-auto py-6 sm:py-8 px-4 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a productos
            </Link>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {producto && (
            <Card className="shadow-md">
              <CardHeader className="pb-3 border-b">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold">Editar Producto</CardTitle>
                  <Button
                    onClick={handleSave}
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                    disabled={saving}
                  >
                    {saving ? (
                      <>Guardando...</>
                    ) : (
                      <>
                        <Save size={16} />
                        <span className="sm:inline">Guardar Cambios</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-base font-medium">
                        Nombre del producto
                      </Label>
                      <Input
                        id="nombre"
                        value={producto.nombre}
                        onChange={(e) => handleInputChange(e, "nombre")}
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descripcion" className="text-base font-medium">
                        Descripción
                      </Label>
                      <Textarea
                        id="descripcion"
                        value={producto.descripcion}
                        onChange={handleTextareaChange}
                        className="min-h-[100px] sm:min-h-[120px] resize-y"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="precio" className="text-base font-medium">
                          Precio
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="precio"
                            type="number"
                            value={producto.precio}
                            onChange={(e) => handleInputChange(e, "precio")}
                            className="pl-7"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock" className="text-base font-medium">
                          Stock
                        </Label>
                        <Input
                          id="stock"
                          type="number"
                          value={Number.parseInt(producto.stock.toString())}
                          onChange={(e) => handleInputChange(e, "stock")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="categoria" className="text-base font-medium">
                        Categoría
                      </Label>
                      <Select value={producto.categoria} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map((categoria) => (
                            <SelectItem key={categoria} value={categoria}>
                              {categoria}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="urlfoto" className="text-base font-medium">
                        Imagen del producto
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                        <Input id="urlfoto" type="file" onChange={handleImageChange} className="hidden" />
                        <Label
                          htmlFor="urlfoto"
                          className="cursor-pointer flex flex-col items-center justify-center gap-2 py-4"
                        >
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Haz clic para subir una imagen</span>
                          <span className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</span>
                        </Label>
                      </div>
                    </div>

                    <div className="mt-4">
                      {(imagePreview || typeof producto.urlfoto === "string") && (
                        <div className="relative rounded-lg overflow-hidden border bg-white">
                          <div className="aspect-video w-full flex items-center justify-center">
                            <Image
                              src={imagePreview || producto.urlfoto.toString()}
                              alt="Vista previa del producto"
                              width={500}
                              height={300}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
