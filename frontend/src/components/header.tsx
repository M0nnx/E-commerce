import Link from "next/link"
import { Search, ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="border-b sticky top-0 z-50 border-orange-400">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                  Inicio
                </Link>
                <Link href="/tienda" className="text-lg font-medium transition-colors hover:text-primary">
                  Tienda
                </Link>
                <Link href="/productos" className="text-lg font-medium transition-colors hover:text-primary">
                  Productos
                </Link>
                <Link href="/mi-cuenta" className="text-lg font-medium transition-colors hover:text-primary">
                  Mi Cuenta
                </Link>
                <Link href="/nosotros" className="text-lg font-medium transition-colors hover:text-primary">
                  Nosotros
                </Link>
                <Link href="/contacto" className="text-lg font-medium transition-colors hover:text-primary">
                  Contacto
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl">LOGO</span>
          </Link>

          <nav className="hidden md:flex ml-8 gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Inicio
            </Link>
            <Link href="/tienda" className="text-sm font-medium transition-colors hover:text-primary">
              Tienda
            </Link>
            <Link href="/productos" className="text-sm font-medium transition-colors hover:text-primary">
              Productos
            </Link>
            <Link href="/mi-cuenta" className="text-sm font-medium transition-colors hover:text-primary">
              Mi Cuenta
            </Link>
            <Link href="/nosotros" className="text-sm font-medium transition-colors hover:text-primary">
              Nosotros
            </Link>
            <Link href="/contacto" className="text-sm font-medium transition-colors hover:text-primary">
              Contacto
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-full max-w-sm items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar productos..." className="pl-8 w-[200px] lg:w-[300px]" />
          </div>

          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Carrito de compras</span>
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              0
            </span>
          </Button>
        </div>
      </div>

      <div className="md:hidden border-t py-2">
        <div className="container mx-auto px-4">
          <div className="relative w-full items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar productos..." className="pl-8 w-full" />
          </div>
        </div>
      </div>
    </header>
  )
}

