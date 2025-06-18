import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";

interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
}

interface AddGiftDialogProps {
  onGiftAdded: () => void;
}

export function AddGiftDialog({ onGiftAdded }: AddGiftDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [imagemUrl, setImagemUrl] = useState<string>("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        console.log("Iniciando busca de categorias...");
        const response = await fetch("/api/categorias");
        console.log("Resposta da API:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro na resposta:", errorData);
          throw new Error("Erro ao buscar categorias");
        }

        const data = await response.json();
        console.log("Categorias recebidas:", data);
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        toast.error("Erro ao buscar categorias. Por favor, tente novamente.");
      }
    };

    if (open) {
      console.log("Modal aberto, buscando categorias...");
      fetchCategorias();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome"),
      descricao: formData.get("descricao"),
      preco: parseFloat(formData.get("preco") as string),
      categoriaId: parseInt(formData.get("categoriaId") as string),
      link: formData.get("link") || undefined,
      imagemUrl: imagemUrl || undefined,
    };

    console.log("Dados sendo enviados:", data);

    try {
      const response = await fetch("/api/presentes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar presente");

      toast.success("Presente cadastrado com sucesso!");
      setOpen(false);
      setImagemUrl(""); // Limpar a imagem após cadastro
      onGiftAdded();
    } catch (error) {
      toast.error("Erro ao cadastrar presente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-terracotta hover:bg-terracotta-dark text-white">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Presente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-terracotta-dark">
            Cadastrar Novo Presente
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Presente</Label>
            <Input
              id="nome"
              name="nome"
              required
              placeholder="Ex: Jogo de Panelas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              name="descricao"
              required
              placeholder="Descreva o presente..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preco">Preço (R$)</Label>
            <Input
              id="preco"
              name="preco"
              type="number"
              step="0.01"
              required
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoriaId">Categoria</Label>
            <Select name="categoriaId" required>
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

          <div className="space-y-2">
            <Label htmlFor="link">Link (opcional)</Label>
            <Input id="link" name="link" type="url" placeholder="https://..." />
          </div>

          <div className="space-y-2">
            <ImageUpload
              onImageUpload={(url) => {
                console.log("URL da imagem recebida:", url);
                setImagemUrl(url);
              }}
              currentImageUrl={imagemUrl}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
            disabled={isLoading}
          >
            {isLoading ? "Cadastrando..." : "Cadastrar Presente"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
