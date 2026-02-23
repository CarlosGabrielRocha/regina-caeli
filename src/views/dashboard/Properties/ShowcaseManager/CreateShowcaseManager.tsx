"use client";

import { useState } from "react";
import { ShowcaseImageGrid } from "./components/ShowcaseImageGrid";
import { ShowcasePanel } from "./components/ShowcasePanel";
import { toast } from "sonner";

interface CreateShowcaseManagerProps {
  onImagesChange: (files: File[]) => void;
}

export default function CreateShowcaseManager({
  onImagesChange,
}: CreateShowcaseManagerProps) {
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [localPreviewUrls, setLocalPreviewUrls] = useState<string[]>([]);

  const handleFilesSelected = (files: File[]) => {
    const newFiles = Array.from(files);

    if (localImages.length + newFiles.length > 6) {
      toast.error("Máximo de 6 imagens excedido!");
      return;
    }

    for (const file of newFiles) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Imagem muito grande! Tamanho máximo permitido: 10MB");
        return;
      }
    }

    const updatedFiles = [...localImages, ...newFiles];
    setLocalImages(updatedFiles);

    // Generate previews
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setLocalPreviewUrls([...localPreviewUrls, ...newPreviews]);

    if (onImagesChange) onImagesChange(updatedFiles);
  };

  const handleDelete = (index: number) => {
    const newFiles = localImages.filter((_, i) => i !== index);
    setLocalImages(newFiles);

    const newPreviews = localPreviewUrls.filter((_, i) => i !== index);
    setLocalPreviewUrls(newPreviews);

    if (onImagesChange) onImagesChange(newFiles);
  };

  const displayImages = localPreviewUrls.map((url, i) => ({
    id: `local-${i}`,
    url,
  }));

  return (
    <ShowcasePanel onFilesSelected={handleFilesSelected}>
      <ShowcaseImageGrid
        images={displayImages}
        onDelete={(_, index) => handleDelete(index)}
      />
    </ShowcasePanel>
  );
}
