"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import type { BlobUploadResponse } from "./types";

export async function uploadImage(file: File): Promise<string> {
  try {
    // Verificar se o token do Vercel Blob está configurado
    if (
      !process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.BLOB_READ_WRITE_TOKEN === "your_vercel_blob_token_here"
    ) {
      // Fallback temporário: retorna uma URL de placeholder
      console.warn(
        "Token do Vercel Blob não configurado. Usando placeholder temporário."
      );
      return `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(
        file.name
      )}`;
    }

    // Upload da imagem para o Vercel Blob
    const blob = (await put(`presentes/${uuidv4()}-${file.name}`, file, {
      access: "public",
    })) as BlobUploadResponse;

    // Revalidar a página para atualizar a lista de presentes
    revalidatePath("/presentes");

    return blob.url;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);

    // Fallback em caso de erro
    return `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(
      file.name
    )}`;
  }
}
