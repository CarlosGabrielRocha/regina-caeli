"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { cn } from "@/lib/utils";
import Text from "../../../../components/Text";
import { Edit2, ImageIcon, Trash2 } from "lucide-react";

interface CoverImageProps {
  initialImage?: string | null;
  onImageChange?: (file: File | null) => void;
  className?: string;
}

export default function CoverImage({
  initialImage,
  onImageChange,
  className,
}: CoverImageProps) {
  const [currentImage, setCurrentImage] = useState<string | null>(
    initialImage || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to trigger file input click
  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    event.target.value = "";
    setCurrentImage(URL.createObjectURL(file));

    if (onImageChange) onImageChange(file);
  };

  const handleDelete = async () => {
    if (onImageChange) onImageChange(null);
    setCurrentImage(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between items-center">
        <Text type="h3" size="medium" className="font-semibold text-white">
          Imagem de Capa
        </Text>
        {currentImage && (
          <Button
            variant="modify"
            size="sm"
            className="text-white "
            onClick={handleTriggerUpload}
          >
            <Edit2 className="size-4 sm:size-5 2xl:size-6 mr-2" />
            <Text type="span" className="font-medium">
              Substituir
            </Text>
          </Button>
        )}
      </div>

      <div
        className={cn(
          "relative aspect-video rounded-xl overflow-hidden border border-white/50 bg-tertiary shadow-lg group transition-all",
          !currentImage && "border-dashed hover:border-white cursor-pointer",
        )}
        onClick={!currentImage ? handleTriggerUpload : undefined}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {currentImage ? (
          <>
            <Image
              src={currentImage}
              alt="Capa da Propriedade"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/60 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <Trash2 className="size-4 sm:size-5 2xl:size-6 mr-2" />
                <Text type="span" className="font-medium">
                  Remover
                </Text>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
            <div className="p-4 bg-white/5 rounded-full">
              <ImageIcon className="size-5 md:size-7 2xl:size-8 text-white/40" />
            </div>
            <div className="text-center">
              <Text
                type="span"
                size="medium"
                className="font-medium text-white"
              >
                Clique para adicionar uma imagem de capa
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
