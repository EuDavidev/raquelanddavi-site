import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft, Calendar, MapPin } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-terracotta-light/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-terracotta" />
              <span className="font-serif text-xl text-terracotta-dark">Raquel & Davi</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-terracotta-dark hover:text-terracotta transition-colors">
                Home
              </Link>
              <Link href="/sobre" className="text-terracotta hover:text-terracotta-dark transition-colors font-medium">
                Nossa História
              </Link>
              <Link href="/presentes" className="text-terracotta-dark hover:text-terracotta transition-colors">
                Lista de Presentes
              </Link>
              <Link href="/confirmacao" className="text-terracotta-dark hover:text-terracotta transition-colors">
                Confirmar Presença
              </Link>
              <Link href="/contato" className="text-terracotta-dark hover:text-terracotta transition-colors">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8 text-terracotta hover:text-terracotta-dark">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Início</span>
            </Link>
          </Button>

          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl text-terracotta-dark mb-6">Nossa História</h1>
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
                      <span className="font-serif text-2xl text-terracotta-dark">2022</span>
                    </div>
                    <h3 className="font-serif text-xl text-terracotta-dark mb-3">O Primeiro Encontro</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nos encontramos no meio do corredor do colégio onde estudávamos. Ela perguntou o nome da mãe de Davi para confirmar se era o mesmo Davi que as suas tias e sua própria mãe falavam. A partir daí, começamos a conversar. Foi o início de uma linda história de amor. 
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
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
                    src="/placeholder.svg?height=400&width=500"
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
                      <span className="font-serif text-2xl text-terracotta-dark">2022</span>
                    </div>
                    <h3 className="font-serif text-xl text-terracotta-dark mb-3">Oficializando o Amor</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Após meses de conversas e encontros, decidimos oficializar nosso relacionamento. Foi um momento
                      mágico, cheio de promessas e sonhos compartilhados. Desde então, nossa história só tem crescido.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2023 - Nosso primeiro trabalho */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-terracotta-light/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-serif text-2xl text-terracotta-dark">2023</span>
                    </div>
                    <h3 className="font-serif text-xl text-terracotta-dark mb-3">Nosso Primeiro Trabalho</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Após nos formarmos no ensino médio, fomos em busca de um trabalho para crescer profissionalmente, e foi então que fomos chamados para trabalhar em uma loja de Departamentos em Alagoinhas-Ba. 
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="Nossa primeira casa - 2022"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* 2024 - Pedido de Casamento */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="Pedido de casamento - 2023"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <div className="bg-terracotta text-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-terracotta" />
                      </div>
                      <span className="font-serif text-2xl">2024</span>
                    </div>
                    <h3 className="font-serif text-xl mb-3">O Pedido Especial</h3>
                    <p className="leading-relaxed opacity-90">
                      Em um dia de aniversário de namoro, Davi preparou uma surpresa para Raquel. Ele foi com ela a um restaurante, mas eles foram em carros diferentes. Raquel chegou primeiro e, quando Davi chegou, ele estava com um buquê de flores e um anel de noivado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wedding Details */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-terracotta-light/20 mb-16">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl text-terracotta-dark mb-4">Detalhes do Nosso Casamento</h2>
              <p className="text-terracotta text-lg">Informações importantes para nossos convidados</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl text-terracotta-dark mb-4">Dress Code</h3>
                <p className="text-gray-600 mb-6">
                  <strong>Traje Esporte Fino:</strong> Sugerimos cores claras e tons pastéis. Evitem branco, off-white e
                  tons muito próximos ao branco.
                </p>

                <h3 className="font-serif text-xl text-terracotta-dark mb-4">Horários</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    <strong>15:00</strong> - Chegada dos convidados
                  </li>
                  <li>
                    <strong>15:30</strong> - Cerimônia
                  </li>
                  <li>
                    <strong>A DEFINIR</strong> - Coquetel
                  </li>
                  <li>
                    <strong>A DEFINIR</strong> - Jantar e festa
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-xl text-terracotta-dark mb-4">Local</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Espaço Rosa Linda</strong>
                  <br />
                  Rua em frente a Texeiras Vidros - Travessa 5 Bahia, 39
                  <br />
                  Alagoinhas - BA
                </p>

                <h3 className="font-serif text-xl text-terracotta-dark mb-4">Observações</h3>
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
            <h2 className="font-serif text-3xl text-terracotta-dark mb-6">Queremos Celebrar Com Você!</h2>
            <p className="text-terracotta text-lg mb-8 max-w-2xl mx-auto">
              Sua presença é o que tornará nosso dia verdadeiramente especial. Mal podemos esperar para compartilhar
              este momento único com você.
              Deus estará conosco neste dia tão especial, e queremos juntos com vocês louvar a Deus pela grande obra que ele tem realizado em nossas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-terracotta hover:bg-terracotta-dark text-white px-8 py-3">
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
  )
}
