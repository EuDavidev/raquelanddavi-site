export interface Presente {
  id: number;
  nome: string;
  descricao: string | null;
  preco: number | null;
  link: string | null;
  imagemUrl: string | null;
  reservado: boolean;
  reservadoPor: string | null;
  categoriaId: number;
  categoria: {
    id: number;
    nome: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
