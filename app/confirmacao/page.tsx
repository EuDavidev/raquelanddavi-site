"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Heart,
  Search,
  Users,
  CheckCircle,
  XCircle,
  Filter,
  Menu,
} from "lucide-react";
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

type FilterType = "todos" | "confirmados" | "nao-confirmados";

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
  const [adminFilter, setAdminFilter] = useState<FilterType>("todos");
  const [adminSearchTerm, setAdminSearchTerm] = useState("");

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
      console.log(
        "Confirmando presença para:",
        convidado,
        "com dados:",
        formData
      );

      const response = await fetch(`/api/convidados/${convidado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: convidado.nome,
          confirmado: true,
          email: formData.email || null,
          mensagem: formData.mensagem || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao confirmar presença");
      }

      await fetchConvidados();
      setSelectedConvidado(null);
      setIsSubmitted(true);
      toast.success("Presença confirmada com sucesso!");
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao confirmar presença"
      );
    }
  };

  const handleToggleConfirmacao = async (convidado: Convidado) => {
    if (!isAdmin) return;

    try {
      console.log(
        "Admin alterando confirmação para:",
        convidado,
        "novo status:",
        !convidado.confirmado
      );

      const response = await fetch(`/api/convidados/${convidado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: convidado.nome,
          confirmado: !convidado.confirmado,
          // Mantém os dados existentes se estiver confirmando, limpa se estiver cancelando
          email: !convidado.confirmado ? convidado.email : null,
          mensagem: !convidado.confirmado ? convidado.mensagem : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar convidado");
      }

      await fetchConvidados();
      toast.success(
        `Presença ${
          convidado.confirmado ? "cancelada" : "confirmada"
        } com sucesso!`
      );
    } catch (error) {
      console.error("Erro ao atualizar convidado:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar convidado"
      );
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
    if (!convidadoToEdit) {
      toast.error("Nenhum convidado selecionado para edição");
      return;
    }

    try {
      console.log("Editando convidado:", convidadoToEdit.id, formData);

      const response = await fetch(`/api/convidados/${convidadoToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          confirmado: convidadoToEdit.confirmado, // Mantém o status atual
          email: formData.email,
          mensagem: formData.mensagem,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar convidado");
      }

      await fetchConvidados();
      setConvidadoToEdit(null);
      toast.success("Convidado atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar convidado:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar convidado"
      );
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

  // Funções para o modo admin
  const getFilteredConvidados = () => {
    let filtered = convidados;

    // Filtrar por status
    if (adminFilter === "confirmados") {
      filtered = filtered.filter((c) => c.confirmado);
    } else if (adminFilter === "nao-confirmados") {
      filtered = filtered.filter((c) => !c.confirmado);
    }

    // Filtrar por busca
    if (adminSearchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.nome.toLowerCase().includes(adminSearchTerm.toLowerCase()) ||
          (c.email &&
            c.email.toLowerCase().includes(adminSearchTerm.toLowerCase()))
      );
    }

    return filtered;
  };

  const getEstatisticas = () => {
    const total = convidados.length;
    const confirmados = convidados.filter((c) => c.confirmado).length;
    const naoConfirmados = total - confirmados;
    const percentualConfirmados =
      total > 0 ? Math.round((confirmados / total) * 100) : 0;

    return { total, confirmados, naoConfirmados, percentualConfirmados };
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
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Como esta página já tem muitos estados, vou usar uma função simples
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
                className="block text-terracotta hover:text-terracotta-dark transition-colors py-2 font-medium"
              >
                Confirmar Presença
              </Link>
              <Link
                href="/contato"
                className="block text-terracotta-dark hover:text-terracotta transition-colors py-2"
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
                presença até o dia 15 de Agosto de 2025! ❤️
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

          {/* Admin View - Todos os Convidados */}
          {isAdmin && !showBuscaInicial && (
            <div className="mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-terracotta-light/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-terracotta-dark flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Visualização Administrativa
                  </h2>
                  <div className="text-sm text-terracotta">
                    {getEstatisticas().total} convidados no total
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-cream rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-terracotta-dark">
                      {getEstatisticas().total}
                    </div>
                    <div className="text-sm text-terracotta">Total</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                    <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                      <CheckCircle className="h-5 w-5" />
                      {getEstatisticas().confirmados}
                    </div>
                    <div className="text-sm text-green-600">Confirmados</div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                    <div className="text-2xl font-bold text-red-600 flex items-center justify-center gap-1">
                      <XCircle className="h-5 w-5" />
                      {getEstatisticas().naoConfirmados}
                    </div>
                    <div className="text-sm text-red-600">Não Confirmados</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {getEstatisticas().percentualConfirmados}%
                    </div>
                    <div className="text-sm text-blue-600">
                      Taxa de Confirmação
                    </div>
                  </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terracotta" />
                      <Input
                        placeholder="Buscar por nome ou email..."
                        value={adminSearchTerm}
                        onChange={(e) => setAdminSearchTerm(e.target.value)}
                        className="pl-10 border-terracotta-light/30 focus:border-terracotta"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={adminFilter === "todos" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAdminFilter("todos")}
                      className={
                        adminFilter === "todos"
                          ? "bg-terracotta hover:bg-terracotta-dark"
                          : "border-terracotta text-terracotta"
                      }
                    >
                      Todos
                    </Button>
                    <Button
                      variant={
                        adminFilter === "confirmados" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setAdminFilter("confirmados")}
                      className={
                        adminFilter === "confirmados"
                          ? "bg-green-600 hover:bg-green-700"
                          : "border-green-600 text-green-600"
                      }
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirmados
                    </Button>
                    <Button
                      variant={
                        adminFilter === "nao-confirmados"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setAdminFilter("nao-confirmados")}
                      className={
                        adminFilter === "nao-confirmados"
                          ? "bg-red-600 hover:bg-red-700"
                          : "border-red-600 text-red-600"
                      }
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Não Confirmados
                    </Button>
                  </div>
                </div>

                {/* Lista de Convidados */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getFilteredConvidados().length > 0 ? (
                    getFilteredConvidados().map((convidado) => (
                      <div
                        key={convidado.id}
                        className="flex items-center justify-between p-4 bg-cream rounded-xl border border-terracotta-light/20"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                convidado.confirmado
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <div>
                              <h3 className="font-medium text-terracotta-dark">
                                {convidado.nome}
                              </h3>
                              {convidado.email && (
                                <p className="text-sm text-terracotta">
                                  {convidado.email}
                                </p>
                              )}
                              {convidado.mensagem && (
                                <p className="text-sm text-terracotta/70 mt-1 italic">
                                  "{convidado.mensagem}"
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              convidado.confirmado
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {convidado.confirmado
                              ? "Confirmado"
                              : "Não Confirmado"}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setConvidadoToEdit(convidado)}
                            className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleConfirmacao(convidado)}
                            className={`${
                              convidado.confirmado
                                ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                            }`}
                          >
                            {convidado.confirmado ? "Cancelar" : "Confirmar"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              if (window.confirm(`Tem certeza que deseja excluir o convidado '${convidado.nome}'?`)) {
                                handleDeleteConvidado(convidado);
                              }
                            }}
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-terracotta/50 mx-auto mb-4" />
                      <p className="text-terracotta">
                        Nenhum convidado encontrado com os filtros aplicados.
                      </p>
                    </div>
                  )}
                </div>
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
