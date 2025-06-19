"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  CheckCircle,
  Menu,
} from "lucide-react";

export default function ContatoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Correção: acessar a variável de ambiente client-side
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    if (response.ok) {
      setIsSubmitted(true);
    } else {
      alert("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 border-terracotta-light/30">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-terracotta-dark mb-4">
              Mensagem Enviada!
            </h2>
            <p className="text-terracotta mb-6">
              Obrigado por entrar em contato! Responderemos sua mensagem em
              breve.
            </p>
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
              >
                <Link href="/">Voltar ao Início</Link>
              </Button>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
              >
                Enviar Outra Mensagem
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                className="text-terracotta hover:text-terracotta-dark transition-colors font-medium"
              >
                Contato
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Como esta página já tem estado, vou usar uma função simples
                  const menuElement = document.querySelector(
                    ".mobile-menu-dropdown"
                  );
                  if (menuElement) {
                    menuElement.classList.toggle("hidden");
                  }
                }}
                className="p-2"
              >
                <span className="sr-only">Menu</span>
                <Menu className="h-5 w-5 text-terracotta-dark" />
              </Button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <div className="md:hidden mobile-menu-dropdown hidden absolute top-full left-0 right-0 bg-white border-b border-terracotta-light/20 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
              >
                Home
              </Link>
              <Link
                href="/sobre"
                className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
              >
                Nossa História
              </Link>
              <Link
                href="/presentes"
                className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
              >
                Lista de Presentes
              </Link>
              <Link
                href="/confirmacao"
                className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
              >
                Confirmar Presença
              </Link>
              <Link
                href="/contato"
                className="block text-terracotta hover:text-terracotta-dark transition-colors py-2 font-medium"
              >
                Contato
              </Link>
            </div>
          </div>
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

          {/* Header */}
          <div className="text-center mb-12">
            <MessageCircle className="h-16 w-16 text-terracotta mx-auto mb-6" />
            <h1 className="font-serif text-5xl text-terracotta-dark mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-terracotta max-w-3xl mx-auto">
              Tem alguma dúvida sobre o casamento? Precisa de informações
              especiais? Estamos aqui para ajudar!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-terracotta-light/30 shadow-lg">
              <CardHeader className="bg-terracotta-light/5">
                <CardTitle className="text-terracotta-dark">
                  Envie uma Mensagem
                </CardTitle>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="border-terracotta-light/30 focus:border-terracotta"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="border-terracotta-light/30 focus:border-terracotta"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      required
                      placeholder="Ex: Dúvidas sobre o local, informações sobre hospedagem"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      className="border-terracotta-light/30 focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Digite sua mensagem aqui..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className="border-terracotta-light/30 focus:border-terracotta"
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-terracotta hover:bg-terracotta-dark text-white py-3"
                    disabled={
                      !formData.name ||
                      !formData.email ||
                      !formData.subject ||
                      !formData.message
                    }
                  >
                    Enviar Mensagem
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    * Campos obrigatórios
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <Card className="border-terracotta-light/30 shadow-lg">
                <CardHeader className="bg-terracotta-light/5">
                  <CardTitle className="text-terracotta-dark">
                    Contato Direto
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-terracotta-light rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-medium text-terracotta-dark">
                        WhatsApp
                      </p>
                      <p className="text-terracotta">Ana: (11) 99999-1234</p>
                      <p className="text-terracotta">Carlos: (11) 99999-5678</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-terracotta-light rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-medium text-terracotta-dark">E-mail</p>
                      <p className="text-terracotta">davisouza128@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-terracotta-light rounded-full flex items-center justify-center">
                      <Instagram className="h-6 w-6 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-medium text-terracotta-dark">
                        Instagram
                      </p>
                      <p className="text-terracotta">@raquel_adlf</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-terracotta text-white border-terracotta">
                <CardContent className="p-6 text-center">
                  <Phone className="h-12 w-12 mx-auto mb-4 opacity-90" />
                  <h3 className="font-serif text-xl mb-2">
                    Contato de Emergência
                  </h3>
                  <p className="mb-4 opacity-90">
                    No dia do casamento, para emergências:
                  </p>
                  <p className="font-medium text-lg">
                    Organizadora: (75) 99700-0244
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-terracotta-light/20 max-w-2xl mx-auto">
              <Heart className="h-12 w-12 text-terracotta mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-terracotta-dark mb-4">
                Ainda não confirmou sua presença?
              </h2>
              <p className="text-terracotta mb-6">
                Não esqueça de confirmar sua presença até 1º de junho. Sua
                confirmação nos ajuda muito no planejamento!
              </p>
              <Button
                asChild
                className="bg-terracotta hover:bg-terracotta-dark text-white px-8 py-3"
              >
                <Link href="/confirmacao">Confirmar Presença Agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
