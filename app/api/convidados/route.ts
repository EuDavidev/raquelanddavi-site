import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const convidados = await prisma.$queryRaw`
      SELECT 
        id,
        nome,
        email,
        confirmado,
        mensagem,
        createdAt,
        updatedAt
      FROM Convidado
      ORDER BY nome ASC
    `;

    return NextResponse.json(convidados);
  } catch (error) {
    console.error("Erro ao buscar convidados:", error);
    return NextResponse.json(
      { error: "Erro ao buscar convidados" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Dados recebidos para cadastro:", body);

    const convidado = await prisma.$executeRaw`
      INSERT INTO Convidado (
        nome,
        email,
        mensagem,
        confirmado,
        createdAt,
        updatedAt
      ) VALUES (
        ${body.nome},
        ${body.email || null},
        ${body.mensagem || null},
        false,
        NOW(),
        NOW()
      )
    `;

    console.log("Convidado cadastrado com sucesso");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao cadastrar convidado:", error);
    return NextResponse.json(
      { error: "Erro ao cadastrar convidado" },
      { status: 500 }
    );
  }
}
