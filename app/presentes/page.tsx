"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Gift, Heart, Search } from "lucide-react";
import { toast } from "sonner";
import { AdminLogin } from "./_componentes/AdminLogin";
import { GiftCard } from "./_componentes/GiftCard";
import { ReserveDialog } from "./_componentes/ReserveDialog";
import { Presente } from "./types";
import { AddGiftDialog } from "./_componentes/AddGiftDialog";
import { AddPresenteDialog } from "./_componentes/AddPresenteDialog";
import { EditPresenteDialog } from "./_componentes/EditPresenteDialog";

type Categoria = {
  id: number;
  nome: string;
  descricao: string;
};

export default function PresentesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedPresente, setSelectedPresente] = useState<Presente | null>(
    null
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isReserveDialogOpen, setIsReserveDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPresente, setEditingPresente] = useState<Presente | null>(null);

  useEffect(() => {
    fetchPresentes();
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch("/api/categorias");
      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      toast.error("Erro ao buscar categorias");
    }
  };

  const fetchPresentes = async () => {
    try {
      const response = await fetch("/api/presentes");
      if (!response.ok) {
        throw new Error("Erro ao buscar presentes");
      }
      const data = await response.json();
      setPresentes(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar presentes:", error);
      toast.error("Erro ao buscar presentes");
      setIsLoading(false);
    }
  };

  const handleReservePresente = async (id: number) => {
    const presente = presentes.find((p) => p.id === id);
    if (presente) {
      setSelectedPresente(presente);
      setIsReserveDialogOpen(true);
    }
  };

  const handleToggleReserva = async (presente: Presente) => {
    if (!isAdmin) return;

    try {
      const response = await fetch(`/api/presentes/${presente.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservado: !presente.reservado,
          reservadoPor: null,
          email: null,
          mensagem: null,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar presente");

      await fetchPresentes();
      toast.success(
        `Presente ${presente.reservado ? "liberado" : "reservado"} com sucesso!`
      );
    } catch (error) {
      toast.error("Erro ao atualizar presente");
    }
  };

  const handleDeletePresente = async (id: number) => {
    try {
      const response = await fetch(`/api/presentes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar presente");
      }

      toast.success("Presente excluído com sucesso!");
      fetchPresentes();
    } catch (error) {
      console.error("Erro ao deletar presente:", error);
      toast.error("Erro ao deletar presente");
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = form.password.value;

    if (password === "admin123") {
      setIsAdmin(true);
      toast.success("Login realizado com sucesso!");
    } else {
      toast.error("Senha incorreta!");
    }
  };

  const handleAddPresente = async (data: {
    nome: string;
    descricao?: string;
    preco?: number;
    link?: string;
    imagemUrl?: string;
    categoriaId: number;
  }) => {
    try {
      const response = await fetch("/api/presentes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar presente");
      }

      toast.success("Presente adicionado com sucesso!");
      setIsAddDialogOpen(false);
      fetchPresentes();
    } catch (error) {
      console.error("Erro ao adicionar presente:", error);
      toast.error("Erro ao adicionar presente");
    }
  };

  const handleEditPresente = async (data: {
    nome: string;
    descricao?: string;
    preco?: number;
    link?: string;
    imagemUrl?: string;
    categoriaId: number;
  }) => {
    if (!editingPresente) return;

    try {
      const response = await fetch(`/api/presentes/${editingPresente.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar presente");
      }

      toast.success("Presente editado com sucesso!");
      setIsEditDialogOpen(false);
      setEditingPresente(null);
      fetchPresentes();
    } catch (error) {
      console.error("Erro ao editar presente:", error);
      toast.error("Erro ao editar presente");
    }
  };

  const handleOpenEditDialog = (presente: Presente) => {
    setEditingPresente(presente);
    setIsEditDialogOpen(true);
  };

  const handleCancelReserva = async (presenteId: number) => {
    try {
      const response = await fetch(`/api/presentes/${presenteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservado: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cancelar reserva");
      }

      toast.success("Reserva cancelada com sucesso!");
      fetchPresentes();
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      toast.error("Erro ao cancelar reserva");
    }
  };

  const handleReserveSubmit = async (data: {
    nome: string;
    email: string;
    mensagem?: string;
  }) => {
    try {
      const response = await fetch(`/api/presentes/${selectedPresente?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservado: true,
          reservadoPor: data.nome,
          reservadoEmail: data.email,
          reservadoMensagem: data.mensagem,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao reservar presente");
      }

      toast.success("Presente reservado com sucesso!");
      setIsReserveDialogOpen(false);
      fetchPresentes();
    } catch (error) {
      console.error("Erro ao reservar presente:", error);
      toast.error("Erro ao reservar presente");
    }
  };

  const filteredPresentes = presentes.filter((presente) => {
    const matchesCategory =
      selectedCategory === "Todos" ||
      categorias.find((c) => c.id === presente.categoriaId)?.nome ===
        selectedCategory;
    const matchesSearch = searchTerm
      ? presente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (presente.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false)
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream">
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
            <Gift className="h-16 w-16 text-terracotta mx-auto mb-6" />
            <h1 className="font-serif text-5xl text-terracotta-dark mb-6">
              Lista de Presentes
            </h1>
            <p className="text-xl text-terracotta max-w-3xl mx-auto mb-8">
              Sua presença já é o maior presente! Mas se quiser nos presentear,
              escolhemos alguns itens especiais para começar nossa vida juntos.
            </p>

            <div className="bg-terracotta-light/10 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-terracotta-dark">
                <strong>Como funciona:</strong> Escolha um presente, clique em
                "Reservar" e siga as instruções. Você pode comprar online ou em
                loja física. Se desejar dividir o valor do presente com outro convidado, fique a vontade! 
                Não se preocupe se não quiser presentear - sua
                presença é o que mais importa! ❤️
              </p>
              <p className="text-terracotta-dark">
                <strong>Atenção:</strong> Os presentes abaixo listados são SUGESTÕES, são possíveis para compra, mas se você desejar comprar em outro lugar ou loja fique a vontade! Só se atente para as cores. Um grande abraço!!
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
              <>
                <AddGiftDialog onGiftAdded={fetchPresentes} />
              </>
            )}
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terracotta" />
                  <Input
                    placeholder="Buscar presentes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-terracotta-light/30 focus:border-terracotta"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                key="Todos"
                variant={selectedCategory === "Todos" ? "default" : "outline"}
                onClick={() => setSelectedCategory("Todos")}
                className={
                  selectedCategory === "Todos"
                    ? "bg-terracotta hover:bg-terracotta-dark text-white"
                    : "border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                }
              >
                Todos
              </Button>
              {categorias.map((categoria) => (
                <Button
                  key={categoria.id}
                  variant={
                    selectedCategory === categoria.nome ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(categoria.nome)}
                  className={
                    selectedCategory === categoria.nome
                      ? "bg-terracotta hover:bg-terracotta-dark text-white"
                      : "border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                  }
                >
                  {categoria.nome}
                </Button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-terracotta text-lg">Carregando presentes...</p>
            </div>
          ) : (
            <>
              {/* Gift Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPresentes.map((presente) => (
                  <GiftCard
                    key={presente.id}
                    presente={presente}
                    onDelete={isAdmin ? handleDeletePresente : undefined}
                    onReserve={
                      !isAdmin && !presente.reservado
                        ? handleReservePresente
                        : undefined
                    }
                    onCancelReserva={
                      isAdmin && presente.reservado
                        ? handleCancelReserva
                        : undefined
                    }
                    onEdit={isAdmin ? handleOpenEditDialog : undefined}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>

              {/* No Gifts Message */}
              {filteredPresentes.length === 0 && (
                <div className="text-center py-12">
                  <Gift className="h-16 w-16 text-terracotta/50 mx-auto mb-4" />
                  <p className="text-terracotta text-lg">
                    Nenhum presente encontrado com os filtros selecionados.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Bottom Message */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-terracotta-light/20">
            <Heart className="h-12 w-12 text-terracotta mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-terracotta-dark mb-4">
              Não encontrou nada que goste?
            </h2>
            <p className="text-terracotta mb-6 max-w-2xl mx-auto">
              Não se preocupe! Sua presença em nosso casamento já é o presente
              mais especial. Se ainda assim quiser nos presentear, entre em
              contato conosco.
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

      {/* Reserve Dialog */}
      {selectedPresente && (
        <ReserveDialog
          presente={selectedPresente}
          isOpen={isReserveDialogOpen}
          onClose={() => {
            setIsReserveDialogOpen(false);
            setSelectedPresente(null);
          }}
          onSubmit={handleReserveSubmit}
        />
      )}

      <AddPresenteDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddPresente}
      />

      <EditPresenteDialog
        presente={editingPresente}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingPresente(null);
        }}
        onEdit={handleEditPresente}
        categorias={categorias}
      />
    </div>
  );
}
