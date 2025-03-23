'use client'
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Producto } from "@/types/producto";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch("http://localhost:8000/api/productos/view/"); 
        if (!response.ok) {
          throw new Error("No se pudieron obtener los productos");
        }
        const data = await response.json();
        setProductos(data); 
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    fetchProductos();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Bienvenido a nuestra tienda</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Descubre nuestros productos de alta calidad y las mejores ofertas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.length > 0 ? (
              productos.map((producto, i) => (
                <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-muted aspect-video relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <img
                        src={producto.urlfoto}
                        alt={producto.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{producto.nombre}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {producto.descripcion}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${producto.precio}</span>
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Cargando productos...</p>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Categorías populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <div className="mb-4 h-12 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Icono</span>
                  </div>
                </div>
                <h3 className="font-medium">Categoría {i + 1}</h3>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Ofertas especiales</h2>
          <div className="bg-muted rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <span className="inline-block bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full mb-4">
                Oferta limitada
              </span>
              <h3 className="text-2xl font-bold mb-2">Hasta 50% de descuento</h3>
              <p className="text-muted-foreground mb-4">
                Aprovecha nuestras ofertas especiales por tiempo limitado en productos seleccionados.
              </p>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Ver ofertas
              </button>
            </div>
            <div className="md:w-1/2 bg-background rounded-lg aspect-video flex items-center justify-center">
              <span className="text-muted-foreground">Imagen de oferta especial</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
