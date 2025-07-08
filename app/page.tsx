"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Clock, Calendar, Gift, Menu, X } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-terracotta-light/20">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-terracotta" />
              <span className="font-serif text-lg sm:text-xl text-terracotta-dark">
                Raquel & Davi
              </span>
            </div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
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
                className="text-terracotta-dark hover:text-terracotta transition-colors"
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
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="p-2"
              >
                <span className="sr-only">Menu</span>
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-terracotta-dark" />
                ) : (
                  <Menu className="h-5 w-5 text-terracotta-dark" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-terracotta-light/20 shadow-lg">
              <div className="container mx-auto px-4 py-4 space-y-3">
                <Link
                  href="/"
                  className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link
                  href="/sobre"
                  className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
                  onClick={closeMenu}
                >
                  Nossa História
                </Link>
                <Link
                  href="/presentes"
                  className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
                  onClick={closeMenu}
                >
                  Lista de Presentes
                </Link>
                <Link
                  href="/confirmacao"
                  className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
                  onClick={closeMenu}
                >
                  Confirmar Presença
                </Link>
                <Link
                  href="/contato"
                  className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
                  onClick={closeMenu}
                >
                  Contato
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-terracotta-light/10 to-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-terracotta-dark mb-4 sm:mb-6">
                Raquel & Davi
              </h1>
              <p className="text-lg sm:text-xl text-terracotta mb-6 sm:mb-8 font-light">
                Celebrando nosso amor com vocês
              </p>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-terracotta flex-shrink-0" />
                  <span className="text-sm sm:text-base text-terracotta-dark">
                    21 de Setembro, 2025
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-terracotta flex-shrink-0" />
                  <span className="text-sm sm:text-base text-terracotta-dark">
                    15:00 - Começo da Cerimônia
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-terracotta flex-shrink-0" />
                  <span className="text-sm sm:text-base text-terracotta-dark">
                    Rosa Linda Espaço de Eventos, Alagoinhas, Bahia
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  className="bg-terracotta hover:bg-terracotta-dark text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                >
                  <Link href="/confirmacao">Confirmar Presença</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                >
                  <Link href="/presentes">Ver Lista de Presentes</Link>
                </Button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
                <Image
                  src="/Davi&Raquel-10.jpg?height=600&width=500"
                  alt="Ana e Carlos - Foto do noivado"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-terracotta rounded-full flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-terracotta-dark mb-3 sm:mb-4">
              Detalhes do Evento
            </h2>
            <p className="text-terracotta text-base sm:text-lg max-w-2xl mx-auto">
              Será um dia especial e queremos compartilhar cada momento com
              vocês
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="border-terracotta-light/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-terracotta-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-terracotta" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-terracotta-dark mb-3 sm:mb-4">
                  Começo da Cerimônia
                </h3>
                <p className="text-terracotta mb-3 sm:mb-4">15:00</p>
                <p className="text-gray-600 text-sm sm:text-base">
                  A cerimônia será realizada no espaço de eventos Rosa Linda, em
                  um ambiente íntimo e acolhedor.
                </p>
              </CardContent>
            </Card>

            <Card className="border-terracotta-light/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-terracotta-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-terracotta" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-terracotta-dark mb-3 sm:mb-4">
                  Festa
                </h3>
                <p className="text-terracotta mb-3 sm:mb-4">Após a cerimônia</p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Vamos celebrar com jantar e muito louvor!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="bg-terracotta-light/10 rounded-xl sm:rounded-2xl p-6 sm:p-8">
            <h3 className="font-serif text-xl sm:text-2xl text-terracotta-dark mb-4 sm:mb-6 text-center">
              Localização
            </h3>
            <div className="bg-gray-200 rounded-lg sm:rounded-xl h-48 sm:h-64 flex items-center justify-center">
              <div className="text-center px-4">
                <MapPin className="h-8 w-8 sm:h-12 sm:w-12 text-terracotta mx-auto mb-3 sm:mb-4" />
                <p className="text-terracotta-dark font-medium text-sm sm:text-base">
                  Espaço Rosa Linda
                </p>
                <p className="text-terracotta text-xs sm:text-sm">
                  Rua em frente a Texeiras Vidros
                </p>
                <p className="text-terracotta text-xs sm:text-sm">
                  Travessa 5 Bahia, 39
                </p>
                <p className="text-terracotta text-xs sm:text-sm">
                  Jardim Petrolar, Alagoinhas - BA
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-3 sm:mt-4 border-terracotta text-terracotta hover:bg-terracotta hover:text-white text-xs sm:text-sm px-4 sm:px-6 py-2"
                    >
                      Ver no Google Maps
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.4356505514884!2d-38.41380402493721!3d-12.150715788094326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x716bd3d6a81eead%3A0xe6b7b6b3110b18d2!2sRosa%20Linda%20Espa%C3%A7o%20de%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1749751209409!5m2!1spt-BR!2sbr"
                      width="600"
                      height="450"
                      style={{ border: 0, width: "100%", height: "450px" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Couple */}
      <section className="py-12 sm:py-16 bg-terracotta-light/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/Davi&Raquel-26.jpg?height=500&width=600"
                alt="Ana e Carlos - Momento especial"
                width={600}
                height={500}
                className="rounded-xl sm:rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-terracotta-dark mb-4 sm:mb-6">
                Nossa História
              </h2>
              <p className="text-terracotta text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                Duas pessoas com um só propósito, dois mundos totalmente diferentes que se unem em uma só história. Deus abençoou esta união e se fará presente em cada detalhe desta missão. Que este amor seja fortalecido por gerações.
              </p>
              <p className="text-terracotta text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                Eclesiastes 4:12 – "Um homem sozinho pode ser vencido, mas dois conseguem defender-se. Um cordão de três dobras não se rompe com facilidade."
              </p>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
  
                Decidimos oficializar nosso amor e queremos celebrar este
                momento especial com as pessoas que mais amamos. Sua presença
                tornará nosso dia ainda mais especial!
              </p>
              
              <Button
                asChild
                className="bg-terracotta hover:bg-terracotta-dark text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
              >
                <Link href="/sobre">Conheça Nossa História Completa</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gift List CTA */}
      <section className="py-12 sm:py-16 bg-terracotta text-white">
        <div className="container mx-auto px-4 text-center">
          <Gift className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 opacity-90" />
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
            Lista de Presentes
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90">
            Sua presença já é o maior presente, mas se quiser nos presentear,
            preparamos uma lista especial com carinho.
          </p>
          <Button
            asChild
            variant="secondary"
            className="bg-white text-terracotta hover:bg-cream px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          >
            <Link href="/presentes">Ver Lista de Presentes</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-terracotta-dark text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-serif text-xl sm:text-2xl">
              Raquel & Davi
            </span>
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <p className="text-terracotta-light mb-3 sm:mb-4 text-sm sm:text-base">
            21 de Setembro, 2025
          </p>
          <p className="text-xs sm:text-sm opacity-75">
            Feito com ❤️ para celebrar nosso amor
          </p>
        </div>
      </footer>
    </div>
  );
}
