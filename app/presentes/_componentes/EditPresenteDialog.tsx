"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Presente } from "../types";
import { toast } from "sonner";

interface Categoria {
  id: number;
  nome: string;
  descricao: string;
}

interface EditPresenteDialogProps {
  presente: Presente | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (data: {
    nome: string;
    descricao?: string;
    preco?: number;
    link?: string;
    imagemUrl?: string;
    categoriaId: number;
  }) => Promise<void>;
  categorias: Categoria[];
}

export function EditPresenteDialog({
  presente,
  isOpen,
  onClose,
  onEdit,
  categorias,
}: EditPresenteDialogProps) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    link: "",
    imagemUrl: "",
    categoriaId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (presente) {
      setFormData({
        nome: presente.nome,
        descricao: presente.descricao || "",
        preco: presente.preco?.toString() || "",
        link: presente.link || "",
        imagemUrl: presente.imagemUrl || "",
        categoriaId: presente.categoriaId.toString(),
      });
    }
  }, [presente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!presente) return;

    setIsSubmitting(true);
    try {
      await onEdit({
        nome: formData.nome,
        descricao: formData.descricao || undefined,
        preco: formData.preco ? parseFloat(formData.preco) : undefined,
        link: formData.link || undefined,
        imagemUrl: formData.imagemUrl || undefined,
        categoriaId: parseInt(formData.categoriaId),
      });
      onClose();
    } catch (error) {
      console.error("Erro ao editar presente:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Presente</DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias no presente e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome do Presente *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                placeholder="Nome do presente"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                placeholder="Descrição do presente"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                type="number"
                step="0.01"
                min="0"
                value={formData.preco}
                onChange={(e) =>
                  setFormData({ ...formData, preco: e.target.value })
                }
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="link">Link do Produto</Label>
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imagemUrl">URL da Imagem</Label>
              <Input
                id="imagemUrl"
                type="url"
                value={formData.imagemUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imagemUrl: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <Select
                value={formData.categoriaId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoriaId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem
                      key={categoria.id}
                      value={categoria.id.toString()}
                    >
                      {categoria.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
