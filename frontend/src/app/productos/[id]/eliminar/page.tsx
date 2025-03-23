"use client"

import { useRouter } from "next/navigation"

export default function EliminarProducto() {
  const router = useRouter()
  const { id } = router.query

  const handleEliminar = async () => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?")
    if (!confirmDelete) return

    try {
      const response = await fetch(`http://localhost:8000/api/productos/delete/${id}/`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("Producto eliminado correctamente")
        router.push("/productos") // Redirige al listado de productos
      } else {
        throw new Error("Error al eliminar el producto")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <h1>Eliminar Producto</h1>
      <p>¿Estás seguro de que deseas eliminar el producto con ID {id}?</p>
      <button onClick={handleEliminar}>Eliminar</button>
      <button onClick={() => router.push("/productos")}>Cancelar</button>
    </div>
  )
}