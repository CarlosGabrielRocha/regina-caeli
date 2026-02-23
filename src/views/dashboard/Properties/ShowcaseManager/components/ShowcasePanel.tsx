"use client";

import { useRef } from "react";
import { Button } from "../../../../../components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import Text from "../../../../../components/Text";

interface ShowcasePanelProps {
  children: React.ReactNode;
  onFilesSelected: (files: File[]) => void;
  isUploading?: boolean;
  title?: string;
}

export function ShowcasePanel({
  children,
  onFilesSelected,
  isUploading = false,
  title = "Imagens de Demonstração do imóvel",
}: ShowcasePanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    onFilesSelected(Array.from(files));

    // Reset input value so the same file can be selected again if needed
    event.target.value = "";
  };

  return (
    <div className="space-y-4 p-6 bg-tertiary rounded-xl border border-white/50 shadow-lg">
      <div className="flex gap-5 justify-between items-center flex-wrap">
        <Text
          type="h3"
          size="medium"
          className="font-semibold max-sm:w-full text-center text-white"
        >
          {title}
        </Text>
        <Button
          onClick={handleTriggerUpload}
          disabled={isUploading}
          size="sm"
          className="bg-secondary hover:bg-secondary/80 text-white gap-2"
        >
          {isUploading ? (
            <Loader2 className="animate-spin size-4 sm:size-5 2xl:size-6" />
          ) : (
            <Plus className="size-4 sm:size-5 2xl:size-6" />
          )}
          <Text type="span">Adicionar Imagem</Text>
        </Button>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {children}
    </div>
  );
}
