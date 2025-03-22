'use client'
import { useState } from "react"
import { Producto } from "../../../types/producto"
import Image from "next/image";

export default function ProductoCard({ producto, onActualizado }: { producto: Producto, onActualizado: () => void }) {
    const [cargando, setCargando] = useState(false);

    const cambiarImagen = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("imagen", file);

        setCargando(true);
        const res = await fetch(`http://localhost:8000/api/productos/${producto.id}/cambiarImagen/`, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            onActualizado();
        }
        setCargando(false);
    };

    return (
        <tr className="border-b">
            <td className="py-2 px-4">
                <Image 
                    src={producto.urlfoto} 
                    alt={producto.nombre} 
                    className="h-20 w-auto object-contain mx-auto" 
                    width={200}
                    height={200} 
                />
            </td>
            <td className="py-2 px-4 text-center">{producto.nombre}</td>
            <td className="py-2 px-4 text-center">{producto.categoria}</td>
            <td className="py-2 px-4 text-center">${producto.precio}</td>
            <td className="py-2 px-4 text-center">{producto.stock}</td>
            <td className="py-2 px-4 text-center">
                <label className="text-blue-600 cursor-pointer text-sm underline">
                    {cargando ? "Subiendo..." : "Cambiar imagen"}
                    <input type="file" onChange={cambiarImagen} className="hidden" />
                </label>
            </td>
        </tr>
    );
}