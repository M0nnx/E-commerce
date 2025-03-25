import Link from "next/link" 
import {
  Search,
  ShoppingCart,
  Menu,
  Home,
  ShoppingBag,
  Package,
  User,
  Users,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export default function Header() {
  return (
    <header className="border-b sticky top-0 z-50 bg-background border-orange-400">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          {/* Menú móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-r border-orange-400 w-[85vw] max-w-[350px] sm:max-w-sm p-0 [&>button]:hidden"
            >
              {/* Título accesible para lectores de pantalla */}
              <VisuallyHidden>
                <h2>Menú</h2>
              </VisuallyHidden>

              <div className="flex flex-col h-full">
                {/* Cabecera con logo y botón de cierre */}
                <div className="py-6 px-6 border-b border-orange-200 flex justify-between items-center bg-gradient-to-r from-orange-50 to-white">
                  <Link href="/" className="flex items-center">
                    <span className="font-bold text-2xl">LOGO</span>
                  </Link>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-orange-300 hover:bg-orange-100 hover:text-orange-600"
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Cerrar</span>
                    </Button>
                  </SheetClose>
                </div>

                {/* Navegación */}
                <nav className="flex flex-col mt-4 flex-1 px-2">
                  <Link
                    href="/"
                    className="flex items-center gap-4 px-5 py-4 text-base font-medium transition-colors rounded-lg hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100"
                  >
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Home className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Inicio</span>
                  </Link>
                  <Link
                    href="/tienda"
                    className="flex items-center gap-4 px-5 py-4 text-base font-medium transition-colors rounded-lg hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100"
                  >
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <ShoppingBag className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Tienda</span>
                  </Link>
                  <Link
                    href="/productos"
                    className="flex items-center gap-4 px-5 py-4 text-base font-medium transition-colors rounded-lg hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100"
                  >
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Package className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Productos</span>
                  </Link>
                  <Link
                    href="/mi-cuenta"
                    className="flex items-center gap-4 px-5 py-4 text-base font-medium transition-colors rounded-lg hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100"
                  >
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <User className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Mi Cuenta</span>
                  </Link>
                  <Link
                    href="/nosotros"
                    className="flex items-center gap-4 px-5 py-4 text-base font-medium transition-colors rounded-lg hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100"
                  >
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Nosotros</span>
                  </Link>
                  <Link
                    href="/contacto"
                    className="flex items-center gap-4 px-5 py-4 text-base font-medium transition-colors rounded-lg hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100"
                  >
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Contacto</span>
                  </Link>
                </nav>

                {/* Footer del menú */}
                <div className="mt-auto border-t border-orange-200 py-6 px-6">
                  <p className="text-sm text-muted-foreground mb-4 text-center">Síguenos en redes sociales</p>
                  <div className="flex justify-center space-x-5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-orange-200 hover:bg-orange-100 hover:border-orange-300"
                    >
                      <Facebook className="h-5 w-5 text-orange-500" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-orange-200 hover:bg-orange-100 hover:border-orange-300"
                    >
                      <Instagram className="h-5 w-5 text-orange-500" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-orange-200 hover:bg-orange-100 hover:border-orange-300"
                    >
                      <Twitter className="h-5 w-5 text-orange-500" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl md:text-2xl">LOGO</span>
          </Link>

          {/* Menú de navegación en desktop */}
          <nav className="hidden md:flex ml-6 lg:ml-8 gap-4 lg:gap-6">
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
            <Link
              href="/nosotros"
              className="text-sm font-medium transition-colors hover:text-primary hidden lg:inline-block"
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-medium transition-colors hover:text-primary hidden lg:inline-block"
            >
              Contacto
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Barra de búsqueda en desktop */}
          <div className="hidden md:flex relative w-full max-w-sm items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pl-8 w-[150px] sm:w-[180px] lg:w-[250px] xl:w-[300px]"
            />
          </div>

          {/* Carrito de compras */}
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Carrito de compras</span>
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              0
            </span>
          </Button>
        </div>
      </div>

      {/* Barra de búsqueda en móviles */}
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
