import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Executar migrações
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS Categoria (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) UNIQUE NOT NULL,
      descricao TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS Presente (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      descricao TEXT,
      preco FLOAT,
      link VARCHAR(255),
      imagem VARCHAR(255),
      reservado BOOLEAN DEFAULT FALSE,
      reservadoPor VARCHAR(100),
      email VARCHAR(255),
      mensagem TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      categoriaId INT,
      FOREIGN KEY (categoriaId) REFERENCES Categoria(id)
    )`;

    // Inserir categorias padrão se não existirem
    await prisma.categoria.upsert({
      where: { nome: "Casa" },
      update: {},
      create: {
        nome: "Casa",
        descricao: "Presentes para casa",
      },
    });

    await prisma.categoria.upsert({
      where: { nome: "Tecnologia" },
      update: {},
      create: {
        nome: "Tecnologia",
        descricao: "Produtos tecnológicos",
      },
    });

    await prisma.categoria.upsert({
      where: { nome: "Moda" },
      update: {},
      create: {
        nome: "Moda",
        descricao: "Roupas e acessórios",
      },
    });

    await prisma.categoria.upsert({
      where: { nome: "Experiências" },
      update: {},
      create: {
        nome: "Experiências",
        descricao: "Experiências e passeios",
      },
    });

    return NextResponse.json({
      message: "Database migrated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      {
        error: "Migration failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    // Verificar se as tabelas existem
    const categorias = await prisma.categoria.findMany();
    const presentes = await prisma.presente.findMany();

    return NextResponse.json({
      status: "Database is ready",
      categorias: categorias.length,
      presentes: presentes.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database check error:", error);
    return NextResponse.json(
      {
        error: "Database check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
