"use client";

import Text from "../../../../../components/Text";
import { Button } from "../../../../../components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import Image from "next/image";

interface ShowcaseImage {
  id: string | number;
  url: string;
}

interface ShowcaseImageGridProps {
  images: ShowcaseImage[];
  onDelete: (id: string | number, index: number) => void;
  deletingId?: string | number | null;
}

export function ShowcaseImageGrid({
  images,
  onDelete,
  deletingId,
}: ShowcaseImageGridProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 h-65 overflow-y-auto overflow-x-hidden lg:h-auto lg:min-h-70 2xl:min-h-90 custom-scrollbar">
      {images.length === 0 && (
        <div className="w-full py-8 text-center text-muted-foreground border-2 border-dashed border-white/10 rounded-lg">
          <Text type="span" size="medium">
            Nenhuma imagem adicionada.
          </Text>
        </div>
      )}

      {images.map((img, index) => (
        <div
          key={img.id}
          className="relative w-full h-60 md:min-h-80 2xl:min-h-100 min-w-60 flex-1 group aspect-square bg-white/5 rounded-lg overflow-y-hidden border border-white/10"
        >
          <Image
            src={img.url}
            alt="Imagem de Demonstração"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/60 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(img.id, index)}
              disabled={deletingId === img.id}
              className="rounded-full"
            >
              {deletingId === img.id ? (
                <Loader2 className="animate-spin size-4 sm:size-5 2xl:size-6" />
              ) : (
                <Trash2 className="size-4 sm:size-5 2xl:size-6" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
