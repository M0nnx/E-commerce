"use client";

import './globals.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Producto } from '../types/producto'; 

const Home = () => {
  const [productos, setProductos] = useState<Producto[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/productos/view/');

        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }

        const data: Producto[] = await response.json(); 
        setProductos(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de Productos</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productos.map((producto) => (
            <div key={producto.id} className="group relative">
              <Image
                alt={`Imagen de ${producto.nombre}`}
                src={producto.urlfoto ? `http://localhost:8000${producto.urlfoto}` : '/ruta/a/imagen/por/defecto.jpg'} // Usar imagen por defecto si urlfoto es null o undefined
                width={400} // Puedes ajustar el tamaño que desees
                height={400} // Puedes ajustar el tamaño que desees
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`/producto/${producto.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {producto.nombre}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{producto.categoria}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${producto.precio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
