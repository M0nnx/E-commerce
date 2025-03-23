"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, Package, AlertCircle, Search, ArrowUpDown } from "lucide-react"
import { toast, Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Producto } from "@/types/producto"

export default function Dashboard() {
  const router = useRouter()
  const [productos, setProductos] = useState<Producto[]>([])
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

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
        setFilteredProductos(data)
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

  useEffect(() => {
    if (searchTerm) {
      const filtered = productos.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          producto.id.toString().includes(searchTerm),
      )
      setFilteredProductos(filtered)
    } else {
      setFilteredProductos(productos)
    }
  }, [searchTerm, productos])

  const handleEliminar = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/productos/delete/${id}/`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProductos(productos.filter((producto) => producto.id !== id))
        setFilteredProductos(filteredProductos.filter((producto) => producto.id !== id))
        setDeleteDialogOpen(false)
        toast.success("Producto eliminado", {
          description: "El producto ha sido eliminado correctamente",
        })
      } else {
        throw new Error("Error al eliminar el producto")
      }
    } catch (err) {
      setError("Error al eliminar el producto. Por favor, intente de nuevo.")
      toast.error("Error", {
        description: "No se pudo eliminar el producto. Intente nuevamente.",
      })
      console.error(err)
    }
  }

  const confirmDelete = (id: number) => {
    setProductToDelete(id)
    setDeleteDialogOpen(true)
  }

  // Función para obtener la URL de la imagen
  const getImageUrl = (urlfoto: string | File) => {
    if (urlfoto instanceof File) {
      return URL.createObjectURL(urlfoto)
    }
    return urlfoto || "/placeholder.svg?height=64&width=64"
  }

  // Calcular estadísticas para el dashboard
  const totalProductos = productos.length
  const totalStock = productos.reduce((sum, producto) => sum + producto.stock, 0)
  const valorInventario = productos.reduce((sum, producto) => sum + producto.precio * producto.stock, 0)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Panel de Productos</h1>
              <p className="text-muted-foreground">Gestione su inventario de productos desde aquí</p>
            </div>
            <Button onClick={() => router.push("/productos/addProducto")} className="flex items-center gap-2" size="sm">
              <Plus size={16} />
              Añadir Producto
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProductos}</div>
                <p className="text-xs text-muted-foreground">Productos en catálogo</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unidades en Stock</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStock}</div>
                <p className="text-xs text-muted-foreground">Unidades disponibles</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${valorInventario.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Valor total en stock</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventario de Productos</CardTitle>
              <CardDescription>Visualice y gestione todos sus productos desde esta tabla</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md mb-4 flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por nombre o ID..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-md" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Imagen</TableHead>
                        <TableHead className="w-[80px]">
                          <div className="flex items-center gap-1">
                            ID
                            <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Nombre
                            <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProductos.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                            {searchTerm ? (
                              <div className="flex flex-col items-center gap-2">
                                <Search size={24} />
                                <p>No se encontraron productos que coincidan con &quot;{searchTerm}&quot;</p>
                                <Button variant="link" onClick={() => setSearchTerm("")} className="mt-2">
                                  Mostrar todos los productos
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <Package size={24} />
                                <p>No hay productos disponibles</p>
                                <Button
                                  variant="outline"
                                  onClick={() => router.push("/productos/addProducto")}
                                  className="mt-2"
                                >
                                  <Plus size={16} className="mr-2" />
                                  Añadir tu primer producto
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProductos.map((producto) => (
                          <TableRow key={producto.id} className="group">
                            <TableCell>
                              <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                                <Image
                                  src={getImageUrl(producto.urlfoto) || "/placeholder.svg"}
                                  alt={producto.nombre}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-110"
                                  sizes="48px"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{producto.id}</TableCell>
                            <TableCell className="font-medium">{producto.nombre}</TableCell>
                            <TableCell className="font-medium">${producto.precio.toLocaleString()}</TableCell>
                            <TableCell>
                              {producto.stock > 0 ? (
                                <Badge variant={producto.stock < 10 ? "outline" : "secondary"}>
                                    {parseInt(producto.stock.toString())} unidades
                                </Badge>
                              ) : (
                                <Badge variant="destructive">Sin stock</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <TooltipProvider>
                                <div className="flex justify-end gap-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => router.push(`/productos/${producto.id}/editar/`)}
                                      >
                                        <Pencil size={16} />
                                        <span className="sr-only">Editar</span>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Editar producto</p>
                                    </TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        onClick={() => confirmDelete(producto.id)}
                                      >
                                        <Trash2 size={16} />
                                        <span className="sr-only">Eliminar</span>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Eliminar producto</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </TooltipProvider>
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
        </div>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro que desea eliminar este producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente de la base de datos y no
              podrá recuperarse.
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

      <Toaster />
      <Footer />
    </div>
  )
}

