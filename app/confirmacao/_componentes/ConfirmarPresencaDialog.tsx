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

interface ConfirmarPresencaDialogProps {
  convidado: { id: number; nome: string } | null;
  onClose: () => void;
  onConfirm: (formData: { email: string; mensagem: string }) => void;
}

export function ConfirmarPresencaDialog({
  convidado,
  onClose,
  onConfirm,
}: ConfirmarPresencaDialogProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const mensagem = formData.get("mensagem") as string;

    onConfirm({ email, mensagem });
  };

  return (
    <Dialog open={!!convidado} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-terracotta-dark">
            Confirmar Presença
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={convidado?.nome} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (opcional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Seu email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem (opcional)</Label>
            <Textarea
              id="mensagem"
              name="mensagem"
              placeholder="Deixe uma mensagem para os noivos"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
          >
            Confirmar Presença
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
