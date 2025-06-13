"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImageUrl?: string;
}

export function ImageUpload({
  onImageUpload,
  currentImageUrl,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Criar um FormData para enviar o arquivo
      const formData = new FormData();
      formData.append("file", file);

      // Enviar para a API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao fazer upload da imagem");

      const data = await response.json();
      setPreviewUrl(data.url);
      onImageUpload(data.url);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Imagem do Presente</Label>

      {previewUrl && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-terracotta-light/20">
          <Image
            src={previewUrl}
            alt="Preview do presente"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
          id="image-upload"
        />
        <Label
          htmlFor="image-upload"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Button
            type="button"
            variant="outline"
            className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
            disabled={isUploading}
          >
            {isUploading ? (
              "Enviando..."
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Escolher Imagem
              </>
            )}
          </Button>
        </Label>
      </div>
    </div>
  );
}
