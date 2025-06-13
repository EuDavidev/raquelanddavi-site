import Link from "next/link";
import { Heart } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-terracotta-light/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-terracotta" />
            <span className="font-serif text-xl text-terracotta-dark">
              Raquel & Davi
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-terracotta-dark hover:text-terracotta transition-colors"
            >
              Home
            </Link>
            <Link
              href="/sobre"
              className="text-terracotta-dark hover:text-terracotta transition-colors"
            >
              Nossa História
            </Link>
            <Link
              href="/presentes"
              className="text-terracotta hover:text-terracotta-dark transition-colors font-medium"
            >
              Lista de Presentes
            </Link>
            <Link
              href="/confirmacao"
              className="text-terracotta-dark hover:text-terracotta transition-colors"
            >
              Confirmar Presença
            </Link>
            <Link
              href="/contato"
              className="text-terracotta-dark hover:text-terracotta transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
