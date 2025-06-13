"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Heart, Search, Users } from "lucide-react";
import { toast } from "sonner";
import { AdminLogin } from "./_componentes/AdminLogin";
import { ConvidadoCard } from "./_componentes/ConvidadoCard";
import { AddConvidadoDialog } from "./_componentes/AddConvidadoDialog";
import { ConfirmarPresencaDialog } from "./_componentes/ConfirmarPresencaDialog";
import { EditConvidadoDialog } from "./_componentes/EditConvidadoDialog";
import { BuscaInicialDialog } from "./_componentes/BuscaInicialDialog";

interface Convidado {
  id: number;
  nome: string;
  email?: string;
  confirmado: boolean;
  mensagem?: string;
}

export default function ConfirmacaoPage() {
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [selectedConvidado, setSelectedConvidado] = useState<Convidado | null>(
    null
  );
  const [convidadoToEdit, setConvidadoToEdit] = useState<Convidado | null>(
    null
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBuscaInicial, setShowBuscaInicial] = useState(true);
  const [convidadoEncontrado, setConvidadoEncontrado] =
    useState<Convidado | null>(null);

  useEffect(() => {
    fetchConvidados();
  }, []);

  const fetchConvidados = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/convidados");
      if (!response.ok) throw new Error("Erro ao carregar convidados");
      const data = await response.json();
      setConvidados(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erro ao carregar convidados");
      setConvidados([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmarPresenca = async (
    convidado: Convidado,
    formData: { email: string; mensagem: string }
  ) => {
    try {
      const response = await fetch(`/api/convidados/${convidado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirmado: true,
          email: formData.email,
          mensagem: formData.mensagem,
        }),
      });

      if (!response.ok) throw new Error("Erro ao confirmar presença");

      await fetchConvidados();
      setSelectedConvidado(null);
      setIsSubmitted(true);
      toast.success("Presença confirmada com sucesso!");
    } catch (error) {
      toast.error("Erro ao confirmar presença");
    }
  };

  const handleToggleConfirmacao = async (convidado: Convidado) => {
    if (!isAdmin) return;

    try {
      const response = await fetch(`/api/convidados/${convidado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirmado: !convidado.confirmado,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar convidado");

      await fetchConvidados();
      toast.success(
        `Presença ${
          convidado.confirmado ? "cancelada" : "confirmada"
        } com sucesso!`
      );
    } catch (error) {
      toast.error("Erro ao atualizar convidado");
    }
  };

  const handleDeleteConvidado = async (convidado: Convidado) => {
    try {
      const response = await fetch(`/api/convidados/${convidado.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar convidado");

      await fetchConvidados();
      toast.success("Convidado excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir convidado");
    }
  };

  const handleEditConvidado = async (formData: {
    nome: string;
    email: string;
    mensagem: string;
  }) => {
    if (!convidadoToEdit) return;

    try {
      const response = await fetch(`/api/convidados/${convidadoToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          mensagem: formData.mensagem,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar convidado");

      await fetchConvidados();
      setConvidadoToEdit(null);
      toast.success("Convidado atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar convidado");
    }
  };

  const handleBuscaInicial = (nome: string) => {
    setSearchTerm(nome);
    setShowBuscaInicial(false);
    buscarConvidado(nome);
  };

  const buscarConvidado = (nome: string) => {
    const convidado = convidados.find(
      (c) => c.nome.toLowerCase() === nome.toLowerCase()
    );
    setConvidadoEncontrado(convidado || null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nome = e.target.value;
    setSearchTerm(nome);
    buscarConvidado(nome);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-terracotta-light/20">
            <Heart className="h-16 w-16 text-terracotta mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-terracotta-dark mb-4">
              Confirmação Recebida!
            </h2>
            <p className="text-terracotta mb-6">
              Obrigado por confirmar sua presença. Recebemos suas informações e
              entraremos em contato se necessário.
            </p>
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
              >
                <Link href="/">Voltar ao Início</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
              >
                <Link href="/presentes">Ver Lista de Presentes</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
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
                className="text-terracotta-dark hover:text-terracotta transition-colors"
              >
                Lista de Presentes
              </Link>
              <Link
                href="/confirmacao"
                className="text-terracotta hover:text-terracotta-dark transition-colors font-medium"
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
            <Users className="h-16 w-16 text-terracotta mx-auto mb-6" />
            <h1 className="font-serif text-5xl text-terracotta-dark mb-6">
              Confirmação de Presença
            </h1>
            <p className="text-xl text-terracotta max-w-3xl mx-auto mb-8">
              Sua presença é muito importante para nós! Por favor, confirme sua
              presença para que possamos nos organizar melhor.
            </p>

            <div className="bg-terracotta-light/10 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-terracotta-dark">
                <strong>Como funciona:</strong> Digite seu nome na busca abaixo
                e clique em "Confirmar Presença". Você pode deixar uma mensagem
                opcional para os noivos. Não se esqueça de confirmar sua
                presença até o dia 21 de agosto de 2025! ❤️
              </p>
            </div>
          </div>

          {/* Admin Controls */}
          <div className="flex justify-end gap-4 mb-4">
            <AdminLogin
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              showAdminLogin={showAdminLogin}
              setShowAdminLogin={setShowAdminLogin}
              adminPassword={adminPassword}
              setAdminPassword={setAdminPassword}
            />
            {isAdmin && (
              <AddConvidadoDialog onConvidadoAdded={fetchConvidados} />
            )}
          </div>

          {/* Search */}
          {!showBuscaInicial && (
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terracotta" />
                <Input
                  placeholder="Buscar seu nome..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 border-terracotta-light/30 focus:border-terracotta"
                />
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-terracotta text-lg">
                Carregando convidados...
              </p>
            </div>
          ) : (
            <>
              {/* Convidado Encontrado */}
              {convidadoEncontrado && (
                <div className="max-w-md mx-auto">
                  <ConvidadoCard
                    convidado={convidadoEncontrado}
                    isAdmin={isAdmin}
                    onToggleConfirmacao={handleToggleConfirmacao}
                    onDelete={handleDeleteConvidado}
                    onEdit={setConvidadoToEdit}
                    onConfirmarPresenca={setSelectedConvidado}
                  />
                </div>
              )}

              {/* No Convidado Found Message */}
              {!convidadoEncontrado && searchTerm && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-terracotta/50 mx-auto mb-4" />
                  <p className="text-terracotta text-lg">
                    Nenhum convidado encontrado com o nome pesquisado.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Bottom Message */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-terracotta-light/20 mt-12">
            <Heart className="h-12 w-12 text-terracotta mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-terracotta-dark mb-4">
              Não encontrou seu nome na lista?
            </h2>
            <p className="text-terracotta mb-6 max-w-2xl mx-auto">
              Entre em contato conosco para que possamos adicionar seu nome à
              lista de convidados.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
            >
              <Link href="/contato">Entrar em Contato</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmar Presença Dialog */}
      <ConfirmarPresencaDialog
        convidado={selectedConvidado}
        onClose={() => setSelectedConvidado(null)}
        onConfirm={(formData) => {
          if (selectedConvidado) {
            handleConfirmarPresenca(selectedConvidado, formData);
          }
        }}
      />

      {/* Edit Convidado Dialog */}
      <EditConvidadoDialog
        convidado={convidadoToEdit}
        onClose={() => setConvidadoToEdit(null)}
        onEdit={handleEditConvidado}
      />

      {/* Busca Inicial Dialog */}
      <BuscaInicialDialog
        open={showBuscaInicial}
        onClose={() => setShowBuscaInicial(false)}
        onSearch={handleBuscaInicial}
      />
    </div>
  );
}
