"use client";

import { useEffect, useState } from "react";
import ProductoCard from "../dashboard/components/ProductoCard";
import { Producto } from "../../types/producto";
import Header from "@/components/header";
import Footer from "@/components/footer"; 

export default function ProductosDashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);

  const cargarProductos = async () => {
    const res = await fetch("http://localhost:8000/api/productos/view/");
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-6">Administrar Productos</h1>
        <table className="min-w-full bg-black border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Imagen</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Categoria</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Editar/Borrar</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <ProductoCard key={p.id} producto={p} onActualizado={cargarProductos} />
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
}