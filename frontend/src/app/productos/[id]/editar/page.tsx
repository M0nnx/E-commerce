"use client"

import { useEffect, useState } from "react"
import { useParams } from 'next/navigation' 
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Pencil } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Producto } from "@/types/producto"
import Image from "next/image"

export default function EditarProducto() {
    const { id } = useParams<{ id: string }>();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar datos del producto
    useEffect(() => {
      const fetchProducto = async () => {
        if (!id) {
          setError("ID no disponible");
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8000/api/productos/view/${id}/`,
             {
            method: 'GET',
          });

          if (!response.ok) {
            throw new Error("Error al cargar los datos del producto");
          }

          const data = await response.json();
          setProducto(data);
          setError(null);
        } catch (err) {
          setError("No se pudo cargar el producto. Por favor, intente de nuevo más tarde.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchProducto();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Producto) => {
      if (producto) {  
        setProducto({
          ...producto,
          [field]: e.target.value
        });
      }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length && producto) {
          const formData = new FormData();
          formData.append("imagen", e.target.files[0]);
      
          try {
            // Llamar a la API del backend para subir la imagen a Cloudinary
            const response = await fetch(`http://localhost:8000/api/productos/change/${id}/`, {
              method: 'POST',
              body: formData,
            });
      
            if (!response.ok) {
              throw new Error("Error al actualizar la imagen");
            }
      
            const data = await response.json();
      
            if (data?.Correcto) {
              // Actualizar el producto con el nuevo URL de la imagen
              setProducto({
                ...producto,
                urlfoto: data.urlfoto,  // Aquí usamos el URL que devuelve Cloudinary
              });
            } else {
              alert(data?.error || "Hubo un problema al subir la imagen");
            }
          } catch (error) {
            console.error(error);
            alert("No se pudo actualizar la imagen. Intente nuevamente.");
          }
        }
      };      

    const handleSave = async () => {
      if (!producto) return;

      const formData = new FormData();
      formData.append("nombre", producto.nombre);
      formData.append("descripcion", producto.descripcion);
      formData.append("precio", producto.precio.toString());
      formData.append("stock", producto.stock.toString());
      formData.append("categoria", producto.categoria);

      if (producto.urlfoto instanceof File) {
        formData.append("urlfoto", producto.urlfoto);
      } else if (typeof producto.urlfoto === 'string') {
        formData.append("urlfoto", producto.urlfoto);
      }

      try {
        const response = await fetch(`http://localhost:8000/api/productos/post/${id}/`, {
          method: 'PUT',
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error al guardar los cambios.");
        }

        alert("Producto actualizado correctamente");
      } catch (err) {
        console.error(err);
        alert("No se pudo guardar el producto. Intente nuevamente.");
      }
    }

    if (loading) {
      return <Skeleton className="h-12 w-full" />
    }

    return (
      <div>
        <Header />
        <div className="container mx-auto py-8 px-4">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          {producto && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold">Editar Producto</h1>
                  <Button onClick={handleSave} className="flex items-center gap-2">
                    <Pencil size={16} />
                    Guardar Cambios
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      value={producto.nombre}
                      onChange={(e) => handleInputChange(e, "nombre")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Input
                      id="descripcion"
                      value={producto.descripcion}
                      onChange={(e) => handleInputChange(e, "descripcion")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="precio">Precio</Label>
                    <Input
                      id="precio"
                      type="number"
                      value={producto.precio}
                      onChange={(e) => handleInputChange(e, "precio")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={producto.stock}
                      onChange={(e) => handleInputChange(e, "stock")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="categoria">Categoría</Label>
                    <Input
                      id="categoria"
                      value={producto.categoria}
                      onChange={(e) => handleInputChange(e, "categoria")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="urlfoto">Imagen URL o archivo</Label>
                    <Input
                      id="urlfoto"
                      type="file"
                      onChange={handleImageChange}
                    />
                        {typeof producto.urlfoto === 'string' && (
                        <div className="mt-2 relative" style={{ width: '100%', height: 'auto', maxWidth: '500px' }}>
                            <Image
                            src={producto.urlfoto}
                            alt="Producto"
                            layout="responsive"
                            width={500} 
                            height={300} 
                            quality={75} 
                            />
                        </div>
                        )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <Footer />
      </div>
    );
}
