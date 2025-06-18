"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadImage } from "../../lib/actions";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Arquivo selecionado:", e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (!file) return;

    // Verificar o tipo do arquivo
    if (!file.type.startsWith("image/")) {
      toast.error(
        "Por favor, selecione apenas arquivos de imagem (JPG, PNG, GIF, etc.)."
      );
      return;
    }

    // Verificar o tamanho do arquivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("O arquivo deve ter no máximo 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      console.log("Iniciando upload...");

      // Criar preview imediato
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload da imagem para o servidor
      const imageUrl = await uploadImage(file);
      console.log("Upload concluído:", imageUrl);

      // Atualizar o preview com a URL real do servidor
      setPreviewUrl(imageUrl);
      onImageUpload(imageUrl);

      toast.success("Imagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      toast.error("Erro ao fazer upload da imagem. Tente novamente.");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUpload("");
    toast.success("Imagem removida");
  };

  const handleButtonClick = () => {
    console.log("Botão clicado!");
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label>Imagem do Presente</Label>

      {previewUrl && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-terracotta-light/20 bg-gray-50">
          <Image
            src={previewUrl}
            alt="Preview do presente"
            fill
            className="object-cover"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white border-red-200 text-red-600 hover:text-red-700"
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />

        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Escolher Imagem
            </>
          )}
        </Button>

        {isUploading && (
          <span className="text-sm text-terracotta">
            Fazendo upload da imagem...
          </span>
        )}
      </div>

      <div className="text-xs text-gray-500">
        Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB.
      </div>
    </div>
  );
}
