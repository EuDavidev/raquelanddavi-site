import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    // Validar campos obrigatórios
    if (body.confirmado === undefined) {
      return NextResponse.json(
        { error: "O campo 'confirmado' é obrigatório" },
        { status: 400 }
      );
    }

    // Se estiver atualizando apenas o status de confirmação
    if (body.confirmado === false) {
      const convidado = await prisma.$executeRaw`
        UPDATE Convidado
        SET 
          confirmado = false,
          email = NULL,
          mensagem = NULL,
          updatedAt = NOW()
        WHERE id = ${id}
      `;
      return NextResponse.json({ success: true });
    }

    // Se estiver confirmando presença ou atualizando dados
    const convidado = await prisma.$executeRaw`
      UPDATE Convidado
      SET 
        nome = COALESCE(${body.nome}, nome),
        confirmado = ${body.confirmado},
        email = ${body.email === undefined ? prisma.raw("email") : body.email},
        mensagem = ${
          body.mensagem === undefined ? prisma.raw("mensagem") : body.mensagem
        },
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

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
