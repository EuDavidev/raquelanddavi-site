import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

interface BuscaInicialDialogProps {
  open: boolean;
  onClose: () => void;
  onSearch: (nome: string) => void;
}

export function BuscaInicialDialog({
  open,
  onClose,
  onSearch,
}: BuscaInicialDialogProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get("nome") as string;
    onSearch(nome);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-terracotta-dark text-center">
            Buscar seu Nome
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Digite seu nome</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terracotta" />
              <Input
                id="nome"
                name="nome"
                placeholder="Seu nome completo"
                className="pl-10 border-terracotta-light/30 focus:border-terracotta"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
          >
            Buscar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
