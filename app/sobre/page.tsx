"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Calendar, MapPin, Menu, X, Gem } from "lucide-react";
import { useState } from "react";

export default function SobrePage() {
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
                className="text-terracotta hover:text-terracotta-dark transition-colors font-medium"
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
                  className="block text-terracotta hover:text-terracotta-dark transition-colors py-2 font-medium"
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

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            asChild
            className="mb-8 text-terracotta hover:text-terracotta-dark"
          >
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Início</span>
            </Link>
          </Button>

          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl text-terracotta-dark mb-6">
              Nossa História
            </h1>
            <p className="text-xl text-terracotta max-w-3xl mx-auto">
              Uma jornada de amor e sonhos compartilhados
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="space-y-12">
              {/* 2022 - Primeiro Encontro */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-terracotta-light/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-serif text-2xl text-terracotta-dark">
                        2007
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-terracotta-dark mb-3">
                      O Primeiro Encontro
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nossa história começa aqui, duas crianças traquinas que só pensavam em se divertir e não faziam ideia do que o futuro lhes preparava. Depois daqueles dias, nunca mais nos vimos ou sequer conversamos, até que...
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <Image
                    src="/foto-1.jpg?height=400&width=500"
                    alt="Primeiro encontro - 2022"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* 2020 - Primeiro Namoro */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/foto-2.jpg?height=400&width=500"
                    alt="Início do namoro - 2022"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-terracotta-light/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-serif text-2xl text-terracotta-dark">
                        2022
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-terracotta-dark mb-3">
                      Oficializando o Amor
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Em 2022, nos encontramos, começamos a conversar e tivemos nosso primeiro encontro, que, por acaso, foi no Dia dos Namorados. Kkkk...
                    </p>
                  </div>
                </div>
              </div>

              {/* 2023 - Início do Namoro */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-terracotta-light/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-serif text-2xl text-terracotta-dark">
                        2022
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-terracotta-dark mb-3">
                      Início do Namoro
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      E tudo ainda estava apenas no começo. Começamos a namorar e, no mesmo ano, nos formamos juntos.
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <Image
                    src="/foto-3.jpg?height=400&width=500"
                    alt="Início do namoro"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* 2024 - Primeira Viagem */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/foto-6.jpg?height=400&width=500"
                    alt="Pedido de casamento - 2023"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-terracotta-light/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6  text-white" />
                      </div>
                      <span className="font-serif text-2xl">2023</span>
                    </div>
                    <h3 className="font-serif text-xl mb-3">Primeira Viagem</h3>
                    <p className="leading-relaxed opacity-90">
                      Em 2023, fizemos nossa primeira viagem em família, e com o tempo nosso amor só crescia cada vez mais...
                    </p>
                  </div>
                </div>
              </div>

              {/* 2024 - Pedido de Casamento */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-terracotta-light/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6  text-white" />
                      </div>
                      <span className="font-serif text-2xl">2024</span>
                    </div>
                    <h3 className="font-serif text-xl mb-3">
                      O Pedido Especial
                    </h3>
                    <p className="leading-relaxed opacity-90">
                      Em 2024, aconteceu a realização de um dos nossos maiores sonhos: o tão sonhado pedido de casamento. Nossos pais nos abençoaram e vibraram conosco.
                    </p>
                  </div>
                </div>
                <div>
                  <Image
                    src="/foto-4.jpg?height=400&width=500"
                    alt="Pedido de casamento - 2023"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Nosso noivado */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/foto-5.jpg?height=400&width=500"
                    alt="Pedido de casamento - 2024"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-terracotta-light/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                        <Gem className="h-6 w-6  text-white" />
                      </div>
                      <span className="font-serif text-2xl">2024</span>
                    </div>
                    <h3 className="font-serif text-xl mb-3">Nosso Noivado</h3>
                    <p className="leading-relaxed opacity-90">
                      Em Setembro de 2024, realizamos o nosso tão sonhado noivado, onde apresentamos este momento ao Senhor, e Ele planejou tudo.
                    </p>
                  </div>
                </div>
              </div>

              {/* A espera do Grande Dia */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-terracotta text-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-terracotta" />
                      </div>
                      <span className="font-serif text-2xl">2025</span>
                    </div>
                    <h3 className="font-serif text-xl mb-3">A espera do Grande Dia</h3>
                    <p className="leading-relaxed opacity-90">
                      Com a bênção de Deus e de nossos pais, estamos à espera deste dia tão sonhado que é o nosso casamento. Pedimos que estejam orando por nós, para que o Senhor possa estar presente neste dia e que as Suas bênçãos recaiam sobre nossas vidas. Te esperamos lá para nos alegrarmos juntos!
                    </p>
                  </div>
                </div>
                <div>
                  <Image
                    src="/Davi&Raquel-18.jpg?height=400&width=500"
                    alt="Pedido de casamento - 2024"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Wedding Details */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-terracotta-light/20 mb-16">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl text-terracotta-dark mb-4">
                Detalhes do Nosso Casamento
              </h2>
              <p className="text-terracotta text-lg">
                Informações importantes para nossos convidados
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl text-terracotta-dark mb-4">
                  Dress Code
                </h3>
                <p className="text-gray-600 mb-6">
                  <strong>Traje Esporte Fino:</strong> Sugerimos cores claras e
                  tons pastéis. Evitem branco, off-white e tons muito próximos
                  ao branco.
                </p>

                <h3 className="font-serif text-xl text-terracotta-dark mb-4">
                  Horários
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    <strong>14:30</strong> - Chegada dos convidados
                  </li>
                  <li>
                    <strong>15:00</strong> - Começo da Cerimônia
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-xl text-terracotta-dark mb-4">
                  Local
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>Espaço Rosa Linda</strong>
                  <br />
                  Rua em frente a Texeiras Vidros - Travessa 5 Bahia, 39
                  <br />
                  Alagoinhas - BA
                </p>

                <h3 className="font-serif text-xl text-terracotta-dark mb-4">
                  Observações
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Cerimônia ao ar livre</li>
                  <li>• Traje esporte fino</li>
                  <li>• Não usar celular no momento da cerimônia</li>
                  <li>• Fotográfos estarão registrando o momento</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="font-serif text-3xl text-terracotta-dark mb-6">
              Queremos Celebrar Com Você!
            </h2>
            <p className="text-terracotta text-lg mb-8 max-w-2xl mx-auto">
              Sua presença é o que tornará nosso dia verdadeiramente especial.
              Mal podemos esperar para compartilhar este momento único com você.
              Deus estará conosco neste dia tão especial, e queremos juntos com
              vocês louvar a Deus pela grande obra que ele tem realizado em
              nossas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-terracotta hover:bg-terracotta-dark text-white px-8 py-3"
              >
                <Link href="/confirmacao">Confirmar Presença</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white px-8 py-3"
              >
                <Link href="/presentes">Ver Lista de Presentes</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
