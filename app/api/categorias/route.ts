import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const categoriasPadrao = [
  { nome: "Cozinha", descricao: "Itens para a cozinha" },
  { nome: "Eletrodomésticos", descricao: "Eletrodomésticos diversos" },
  { nome: "Quarto", descricao: "Itens para o quarto" },
  { nome: "Sala", descricao: "Itens para a sala" },
  { nome: "Mesa", descricao: "Itens para a mesa" },
  { nome: "Experiências", descricao: "Experiências e passeios" },
];

export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return NextResponse.json(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}
