"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Menu Hambúrguer para Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-terracotta"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {/* Menu Desktop */}
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

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-terracotta-light/20">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-terracotta-dark hover:text-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/sobre"
                className="text-terracotta-dark hover:text-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nossa História
              </Link>
              <Link
                href="/presentes"
                className="text-terracotta hover:text-terracotta-dark transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Lista de Presentes
              </Link>
              <Link
                href="/confirmacao"
                className="text-terracotta-dark hover:text-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Confirmar Presença
              </Link>
              <Link
                href="/contato"
                className="text-terracotta-dark hover:text-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
