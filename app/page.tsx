import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MapPin, Clock, Calendar, Gift } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

export default function HomePage() {
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
              <Link href="/sobre" className="text-terracotta-dark hover:text-terracotta transition-colors">
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

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-terracotta-light/10 to-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-serif text-5xl lg:text-6xl text-terracotta-dark mb-6">Raquel & Davi</h1>
              <p className="text-xl text-terracotta mb-8 font-light">Celebrando nosso amor com vocês</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Calendar className="h-5 w-5 text-terracotta" />
                  <span className="text-terracotta-dark">21 de Setembro, 2025</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Clock className="h-5 w-5 text-terracotta" />
                  <span className="text-terracotta-dark">15:00 - Cerimônia</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <MapPin className="h-5 w-5 text-terracotta" />
                  <span className="text-terracotta-dark">Rosa Linda Espaço de Eventos, Alagoinahs, Bahia</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Ana e Carlos - Foto do noivado"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-terracotta rounded-full flex items-center justify-center shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-terracotta-dark mb-4">Detalhes do Evento</h2>
            <p className="text-terracotta text-lg max-w-2xl mx-auto">
              Será um dia especial e queremos compartilhar cada momento com vocês
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-terracotta-light/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-terracotta-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-terracotta" />
                </div>
                <h3 className="font-serif text-2xl text-terracotta-dark mb-4">Cerimônia</h3>
                <p className="text-terracotta mb-4">15:00</p>
                <p className="text-gray-600">
                  A cerimônia será realizada no espaço de eventos Rosa Linda, em um ambiente íntimo e acolhedor.
                </p>
              </CardContent>
            </Card>

            <Card className="border-terracotta-light/30 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-terracotta-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="h-8 w-8 text-terracotta" />
                </div>
                <h3 className="font-serif text-2xl text-terracotta-dark mb-4">Festa</h3>
                <p className="text-terracotta mb-4">Após a cerimônia</p>
                <p className="text-gray-600">Vamos celebrar com jantar e muito louvor!</p>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="bg-terracotta-light/10 rounded-2xl p-8">
            <h3 className="font-serif text-2xl text-terracotta-dark mb-6 text-center">Localização</h3>
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-terracotta mx-auto mb-4" />
                <p className="text-terracotta-dark font-medium">Espaço Rosa Linda</p>
                <p className="text-terracotta">Rua em frente a Texeiras Vidros</p>
                <p className="text-terracotta">Travessa 5 Bahia, 39</p>
                <p className="text-terracotta">Jardim Petrolar, Alagoinhas - BA</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-4 border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                    >
                      Ver no Google Maps
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.4356505514884!2d-38.41380402493721!3d-12.150715788094326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x716bd3d6a81eead%3A0xe6b7b6b3110b18d2!2sRosa%20Linda%20Espa%C3%A7o%20de%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1749751209409!5m2!1spt-BR!2sbr"
                      width="600"
                      height="450"
                      style={{ border: 0, width: '100%', height: '450px' }}
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
      <section className="py-16 bg-terracotta-light/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Ana e Carlos - Momento especial"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div>
              <h2 className="font-serif text-4xl text-terracotta-dark mb-6">Nossa História</h2>
              <p className="text-terracotta text-lg mb-6 leading-relaxed">
                Ainda no cólegio, perto do término do ensino médio, derrepente nos encontramos e nos reconhecemos, pois ainda bebês já tinhamos uma história juntos. Desde então, nossa conexão foi instantânea e especial.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Decidimos oficializar nosso amor e queremos celebrar este momento especial com as pessoas que mais
                amamos. Sua presença tornará nosso dia ainda mais especial!
              </p>
              <Button asChild className="bg-terracotta hover:bg-terracotta-dark text-white px-8 py-3">
                <Link href="/sobre">Conheça Nossa História Completa</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gift List CTA */}
      <section className="py-16 bg-terracotta text-white">
        <div className="container mx-auto px-4 text-center">
          <Gift className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="font-serif text-4xl mb-6">Lista de Presentes</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Sua presença já é o maior presente, mas se quiser nos presentear, preparamos uma lista especial com carinho.
          </p>
          <Button asChild variant="secondary" className="bg-white text-terracotta hover:bg-cream px-8 py-3">
            <Link href="/presentes">Ver Lista de Presentes</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-terracotta-dark text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-6 w-6" />
            <span className="font-serif text-2xl">Raquel & Davi</span>
            <Heart className="h-6 w-6" />
          </div>
          <p className="text-terracotta-light mb-4">21 de Setembro, 2025</p>
          <p className="text-sm opacity-75">Feito com ❤️ para celebrar nosso amor</p>
        </div>
      </footer>
    </div>
  )
}
