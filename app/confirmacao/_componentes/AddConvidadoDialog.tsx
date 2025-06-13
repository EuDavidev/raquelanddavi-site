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
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddConvidadoDialogProps {
  onConvidadoAdded: () => void;
}

export function AddConvidadoDialog({
  onConvidadoAdded,
}: AddConvidadoDialogProps) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/convidados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          mensagem,
        }),
      });

      if (!response.ok) throw new Error("Erro ao adicionar convidado");

      toast.success("Convidado adicionado com sucesso!");
      setOpen(false);
      setNome("");
      setEmail("");
      setMensagem("");
      onConvidadoAdded();
    } catch (error) {
      toast.error("Erro ao adicionar convidado");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-terracotta hover:bg-terracotta-dark text-white">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Convidado
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-terracotta-dark">
            Adicionar Novo Convidado
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do convidado"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (opcional)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email do convidado"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem (opcional)</Label>
            <Textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Mensagem para o convidado"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
          >
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
