import { Twitter, Facebook, Github } from "lucide-react"; 

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="hover:text-blue-400 transition-colors" size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="hover:text-blue-600 transition-colors" size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="hover:text-gray-400 transition-colors" size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}