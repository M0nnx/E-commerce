"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, ImagePlus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
interface Producto {
  id: number
  nombre: string
  precio: number
  urlfoto: string
}

export default function Dashboard() {
  const router = useRouter()
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:8000/api/productos/view/")

        if (!response.ok) {
          throw new Error("Error al cargar los productos")
        }

        const data = await response.json()
        setProductos(data)
        setError(null)
      } catch (err) {
        setError("No se pudieron cargar los productos. Por favor, intente de nuevo más tarde.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, [])

  const handleEliminar = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/productos/delete/${id}/`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProductos(productos.filter((producto) => producto.id !== id))
        setDeleteDialogOpen(false)
      } else {
        throw new Error("Error al eliminar el producto")
      }
    } catch (err) {
      setError("Error al eliminar el producto. Por favor, intente de nuevo.")
      console.error(err)
    }
  }

  const confirmDelete = (id: number) => {
    setProductToDelete(id)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard de Productos</h1>
            <Button onClick={() => router.push("/productos/add")} className="flex items-center gap-2">
              <Plus size={16} />
              Añadir Producto
            </Button>
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No hay productos disponibles
                      </TableCell>
                    </TableRow>
                  ) : (
                    productos.map((producto) => (
                      <TableRow key={producto.id}>
                        <TableCell>
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={producto.urlfoto || "/placeholder.svg"}
                              alt={producto.nombre}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{producto.id}</TableCell>
                        <TableCell className="font-medium">{producto.nombre}</TableCell>
                        <TableCell>${producto.precio}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`api/productos/post/${producto.id}`)}
                            >
                              <Pencil size={16} className="mr-1" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`api/productos/change/${producto.id}`)}
                            >
                              <ImagePlus size={16} className="mr-1" />
                              Imagen
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => confirmDelete(producto.id)}>
                              <Trash2 size={16} className="mr-1" />
                              Eliminar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el producto de la base de datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => productToDelete && handleEliminar(productToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

