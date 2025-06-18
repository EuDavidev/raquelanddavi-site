import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const presentes = await prisma.$queryRaw`
      SELECT 
        p.id,
        p.nome,
        p.descricao,
        COALESCE(p.preco, 0) as preco,
        p.link,
        p.imagemUrl,
        p.reservado,
        p.reservadoPor,
        p.categoriaId,
        c.id as categoria_id,
        c.nome as categoria_nome
      FROM Presente p
      LEFT JOIN Categoria c ON p.categoriaId = c.id
    `;

    console.log("Presentes encontrados:", presentes);
    return NextResponse.json(presentes);
  } catch (error) {
    console.error("Erro ao buscar presentes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar presentes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Dados recebidos para cadastro:", body);
    console.log("URL da imagem:", body.imagemUrl);

    await prisma.$executeRaw`
      INSERT INTO Presente (
        nome,
        descricao,
        preco,
        link,
        imagemUrl,
        categoriaId,
        reservado,
        createdAt,
        updatedAt
      ) VALUES (
        ${body.nome},
        ${body.descricao || null},
        ${body.preco ? parseFloat(body.preco) : null},
        ${body.link || null},
        ${body.imagemUrl || null},
        ${parseInt(body.categoriaId)},
        false,
        NOW(),
        NOW()
      )
    `;

    console.log("Presente cadastrado com sucesso");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao cadastrar presente:", error);
    return NextResponse.json(
      { error: "Erro ao cadastrar presente" },
      { status: 500 }
    );
  }
}
