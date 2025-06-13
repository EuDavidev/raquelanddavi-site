import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock, Unlock } from "lucide-react";
import { toast } from "sonner";

interface AdminLoginProps {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  showAdminLogin: boolean;
  setShowAdminLogin: (value: boolean) => void;
  adminPassword: string;
  setAdminPassword: (value: string) => void;
}

export function AdminLogin({
  isAdmin,
  setIsAdmin,
  showAdminLogin,
  setShowAdminLogin,
  adminPassword,
  setAdminPassword,
}: AdminLoginProps) {
  const handleAdminLogin = () => {
    if (adminPassword === "RaqueleDavi") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      toast.success("Modo administrador ativado");
    } else {
      toast.error("Senha incorreta");
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        {!isAdmin ? (
          <Button
            variant="outline"
            onClick={() => setShowAdminLogin(true)}
            className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
          >
            <Lock className="h-4 w-4 mr-2" />
            Modo Admin
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsAdmin(false)}
            className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
          >
            <Unlock className="h-4 w-4 mr-2" />
            Sair do Modo Admin
          </Button>
        )}
      </div>

      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-terracotta-dark">
              Acesso Administrativo
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Senha</Label>
              <Input
                id="adminPassword"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Digite a senha de administrador"
              />
            </div>
            <Button
              onClick={handleAdminLogin}
              className="w-full bg-terracotta hover:bg-terracotta-dark text-white"
            >
              Entrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
