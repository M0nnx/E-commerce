import Link from "next/link"
import { Facebook, Instagram, MessageCircle, MapPin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Logo en móvil - visible solo en pantallas pequeñas */}
        <div className="flex justify-center mb-8 sm:hidden">
          <Link href="/" className="inline-block">
            <span className="font-bold text-xl">LOGO</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Logo y descripción (oculto en móvil, visible en tablet y desktop) */}
          <div className="hidden sm:block space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-bold text-xl">LOGO</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ofrecemos productos de alta calidad con el mejor servicio al cliente.
            </p>
          </div>

          {/* Columna 2: Redes sociales */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-center sm:text-left">Síguenos</h3>
            <div className="flex justify-center sm:justify-start gap-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                  <path d="M15 8h.01" />
                  <path d="M11 8v8c0 .97.84 1.71 1.81 1.51C14.04 17.2 15 16.09 15 14.5V8h4c-.43-2.76-2.54-5-5.24-5.61A7.003 7.003 0 0 0 5 8" />
                </svg>
                <span className="sr-only">TikTok</span>
              </Link>
            </div>
          </div>

          {/* Columna 3: Contacto */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-center sm:text-left">Contáctanos</h3>
            <div className="flex flex-col items-center sm:items-start gap-3">
              <Link
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>+1 (234) 567-890</span>
              </Link>
              <Link
                href="mailto:info@empresa.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>info@empresa.com</span>
              </Link>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>Calle Principal #123, Ciudad</span>
              </div>
            </div>
          </div>

          {/* Columna 4: Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-center sm:text-left">Enlaces</h3>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Link href="/nosotros" className="hover:text-primary transition-colors">
                Nosotros
              </Link>
              <Link href="/tienda" className="hover:text-primary transition-colors">
                Tienda
              </Link>
              <Link href="/preguntas-frecuentes" className="hover:text-primary transition-colors">
                Preguntas frecuentes
              </Link>
              <Link href="/politicas-de-privacidad" className="hover:text-primary transition-colors">
                Políticas de privacidad
              </Link>
            </div>
          </div>
        </div>

        {/* Descripción en móvil - visible solo en pantallas pequeñas */}
        <div className="sm:hidden mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Ofrecemos productos de alta calidad con el mejor servicio al cliente.
          </p>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} Nombre de la Empresa. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/politicas-de-cambio" className="text-sm hover:underline">
              Políticas de cambio
            </Link>
            <Link href="/politicas-de-reembolso" className="text-sm hover:underline">
              Políticas de reembolso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

