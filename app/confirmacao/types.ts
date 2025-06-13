export interface Convidado {
  id: number;
  nome: string;
  email?: string;
  confirmado: boolean;
  mensagem?: string;
  createdAt: Date;
  updatedAt: Date;
}
