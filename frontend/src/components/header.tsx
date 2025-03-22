import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center">
        {/* Ícono de Lucide */}
        <ShoppingCart className="mr-2" size={24} />
        <h1 className="text-2xl font-bold">Mi Tienda</h1>
      </div>
    </header>
  );
}