import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { confirmado, email, mensagem } = await request.json();
    const id = parseInt(params.id);

    const convidado = await prisma.$executeRaw`
      UPDATE Convidado
      SET 
        confirmado = ${confirmado},
        email = ${email || null},
        mensagem = ${mensagem || null},
        updatedAt = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar convidado:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar convidado" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const convidado = await prisma.$executeRaw`
      DELETE FROM Convidado
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar convidado:", error);
    return NextResponse.json(
      { error: "Erro ao deletar convidado" },
      { status: 500 }
    );
  }
}
