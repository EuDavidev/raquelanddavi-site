import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Trash2, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Convidado {
  id: number;
  nome: string;
  email?: string;
  confirmado: boolean;
  mensagem?: string;
}

interface ConvidadoCardProps {
  convidado: Convidado;
  isAdmin: boolean;
  onToggleConfirmacao: (convidado: Convidado) => void;
  onDelete: (convidado: Convidado) => void;
  onEdit: (convidado: Convidado) => void;
  onConfirmarPresenca: (convidado: Convidado) => void;
}

export function ConvidadoCard({
  convidado,
  isAdmin,
  onToggleConfirmacao,
  onDelete,
  onEdit,
  onConfirmarPresenca,
}: ConvidadoCardProps) {
  return (
    <Card className="border-terracotta-light/30 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-terracotta-dark text-lg">
            {convidado.nome}
          </CardTitle>
          <Badge
            className={
              convidado.confirmado
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }
          >
            {convidado.confirmado ? "Confirmado" : "Pendente"}
          </Badge>
        </div>
        {convidado.email && (
          <p className="text-terracotta text-sm">{convidado.email}</p>
        )}
      </CardHeader>

      <CardContent>
        {convidado.mensagem && (
          <p className="text-gray-600 text-sm mb-4">{convidado.mensagem}</p>
        )}

        <div className="flex gap-2">
          {isAdmin ? (
            <>
              <Button
                onClick={() => onToggleConfirmacao(convidado)}
                className={`flex-1 ${
                  convidado.confirmado
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {convidado.confirmado ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar Confirmação
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Confirmar Presença
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(convidado)}
                className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
              >
                <Edit className="h-4 w-4" />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir o convidado "
                      {convidado.nome}"? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(convidado)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            !convidado.confirmado && (
              <Button
                onClick={() => onConfirmarPresenca(convidado)}
                className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Confirmar Presença
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
