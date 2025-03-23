import Link from "next/link"
import { Facebook, Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Síguenos</h3>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
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

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contáctanos</h3>
            <Link
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              <MessageCircle className="h-5 w-5" />
              <span>+1 (234) 567-890</span>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-bold text-xl">LOGO</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ofrecemos productos de alta calidad con el mejor servicio al cliente.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Nombre de la Empresa. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
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