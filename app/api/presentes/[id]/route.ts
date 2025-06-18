import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const data = await request.json();

    // Se for um cancelamento de reserva, atualiza apenas os campos relacionados
    if (data.reservado === false) {
      const presente = await prisma.presente.update({
        where: { id },
        data: {
          reservado: false,
          reservadoPor: null,
          reservadoEmail: null,
          reservadoMensagem: null,
          updatedAt: new Date(),
        },
        include: {
          categoria: true,
        },
      });

      return NextResponse.json(presente);
    }

    // Se for uma reserva, atualiza os campos de reserva
    if (data.reservado === true) {
      const presente = await prisma.presente.update({
        where: { id },
        data: {
          reservado: true,
          reservadoPor: data.reservadoPor,
          reservadoEmail: data.reservadoEmail,
          reservadoMensagem: data.reservadoMensagem,
          updatedAt: new Date(),
        },
        include: {
          categoria: true,
        },
      });

      return NextResponse.json(presente);
    }

    // Se for uma atualização normal, atualiza todos os campos
    const presente = await prisma.presente.update({
      where: { id },
      data: {
        nome: data.nome,
        categoriaId: data.categoriaId,
        updatedAt: new Date(),
      },
      include: {
        categoria: true,
      },
    });

    return NextResponse.json(presente);
  } catch (error) {
    console.error("Erro ao atualizar presente:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar presente" },
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

    await prisma.presente.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar presente:", error);
    return NextResponse.json(
      { error: "Erro ao deletar presente" },
      { status: 500 }
    );
  }
}
