"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Gift, Trash2, X, Edit } from "lucide-react";
import Image from "next/image";
import { Presente } from "../types";
import { toast } from "sonner";

interface GiftCardProps {
  presente: {
    id: number;
    nome: string;
    descricao?: string | null;
    preco?: number | null;
    link?: string | null;
    imagemUrl?: string | null;
    reservado: boolean;
    reservadoPor?: string | null;
    categoria?: {
      id: number;
      nome: string;
    } | null;
  };
  onDelete?: (id: number) => void;
  onReserve?: (id: number) => void;
  onCancelReserva?: (id: number) => void;
  onEdit?: (presente: any) => void;
  isAdmin?: boolean;
}

export function GiftCard({
  presente,
  onDelete,
  onReserve,
  onCancelReserva,
  onEdit,
  isAdmin = false,
}: GiftCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReserving, setIsReserving] = useState(false);

  const handleDelete = async () => {
    if (isDeleting || !onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(presente.id);
      toast.success("Presente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir presente:", error);
      toast.error("Erro ao excluir presente");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReserve = async () => {
    if (isReserving || !onReserve) return;

    setIsReserving(true);
    try {
      await onReserve(presente.id);
    } catch (error) {
      console.error("Erro ao reservar presente:", error);
      toast.error("Erro ao reservar presente");
    } finally {
      setIsReserving(false);
    }
  };

  const handleCancelReserva = async () => {
    if (!onCancelReserva) return;

    try {
      await onCancelReserva(presente.id);
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      toast.error("Erro ao cancelar reserva");
    }
  };

  return (
    <Card className="relative overflow-hidden">
      {presente.reservado && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm">
          Reservado
        </div>
      )}
      <CardHeader>
        <CardTitle>{presente.nome}</CardTitle>
        {presente.categoria && (
          <CardDescription>{presente.categoria.nome}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {presente.imagemUrl ? (
          <div className="relative w-full h-48 mb-4">
            <img
              src={
                presente.imagemUrl?.replace(
                  "via.placeholder.com",
                  "placehold.co"
                ) ?? ""
              }
              alt={presente.nome ?? ""}
              style={{
                width: "100%",
                height: "192px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              onError={(e) => {
                console.error("Erro ao carregar imagem:", presente.imagemUrl);
              }}
            />
          </div>
        ) : (
          <div className="w-full h-48 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-400">Sem imagem</span>
          </div>
        )}
        {presente.descricao && (
          <p className="text-sm text-muted-foreground mb-4">
            {presente.descricao}
          </p>
        )}
        {presente.preco && (
          <p className="text-lg font-semibold mb-4">
            R$ {presente.preco.toFixed(2)}
          </p>
        )}
        {presente.link && (
          <a
            href={presente.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline block mb-4"
          >
            Ver produto
          </a>
        )}
        {presente.reservadoPor && (
          <p className="text-sm text-muted-foreground">
            Reservado por: {presente.reservadoPor}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isAdmin && onEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(presente)}
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        {isAdmin && onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        {isAdmin && presente.reservado && onCancelReserva && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelReserva}
            className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {!isAdmin && !presente.reservado && onReserve && (
          <Button
            onClick={handleReserve}
            disabled={isReserving}
            className="bg-terracotta hover:bg-terracotta-dark text-white"
          >
            Reservar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
