import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface EditConvidadoDialogProps {
  convidado: {
    id: number;
    nome: string;
    email?: string;
    mensagem?: string;
  } | null;
  onClose: () => void;
  onEdit: (formData: { nome: string; email: string; mensagem: string }) => void;
}

export function EditConvidadoDialog({
  convidado,
  onClose,
  onEdit,
}: EditConvidadoDialogProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const mensagem = formData.get("mensagem") as string;

    console.log("Enviando dados do formulário:", { nome, email, mensagem });

    if (!nome.trim()) {
      toast.error("O nome é obrigatório");
      return;
    }

    onEdit({
      nome: nome.trim(),
      email: email.trim(),
      mensagem: mensagem.trim(),
    });
  };

  return (
    <Dialog open={!!convidado} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-terracotta-dark">
            Editar Convidado
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              defaultValue={convidado?.nome || ""}
              required
              placeholder="Nome do convidado"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (opcional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={convidado?.email || ""}
              placeholder="Email do convidado"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem (opcional)</Label>
            <Textarea
              id="mensagem"
              name="mensagem"
              defaultValue={convidado?.mensagem || ""}
              placeholder="Mensagem para o convidado"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white"
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
