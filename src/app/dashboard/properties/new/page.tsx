"use client";

import Title from "../../../../components/Title";
import PropertyForm from "../../../../views/dashboard/PropertyForm";
import { PropertyFormData } from "../../../../schemas/property-schemas";
import { createPropertyAction } from "../../../../actions/property/createProperty";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import CoverImage from "../../../../views/dashboard/Properties/CoverImage";
import CreateShowcaseManager from "../../../../views/dashboard/Properties/ShowcaseManager/CreateShowcaseManager";
import BackButton from "../../../../components/buttons/BackButton";
import compressImage from "../../../../helpers/imageCompression";

export default function NewPropertyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [showcaseImages, setShowcaseImages] = useState<File[]>([]);

  const handleSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      if (!coverImage) {
        toast.error("Uma imagem de capa (cover) deve ser selecionada.");
        return;
      }

      const compressedImage = await compressImage(coverImage);
      if (!compressedImage) {
        toast.error("A imagem de capa (cover) não é válida.");
        return;
      }
      formData.append("coverImg", compressedImage);

      if (showcaseImages.length < 1) {
        toast.error(
          "Pelo menos uma imagem de demonstração (showcase) deve ser selecionada.",
        );
        return;
      }

      for (const file of showcaseImages) {
        const compressedImage = await compressImage(file);
        if (!compressedImage) {
          toast.error(`A imagem ${file.name} não é válida.`);
          return;
        }
        formData.append("showcaseImgs", compressedImage);
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key === "address") {
          formData.append("address", JSON.stringify(value));
        } else if (key === "area") {
          if (!isNaN(Number(value))) formData.append("area", String(value));
          else return;
        } else {
          formData.append(key, String(value));
        }
      });

      const result = await createPropertyAction({
        formData,
      });

      if (result.status === "ok") {
        toast.success("Propriedade criada com sucesso!");
        router.push("/dashboard/properties");
      } else {
        toast.error(result.message || "Erro ao tentar criar propriedade.");
      }
    } catch (error) {
      toast.error("Erro ao tentar criar propriedade.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl 2xl:max-8xl">
      <div className="flex items-center gap-4">
        <BackButton />
        <Title size="md">Nova Propriedade</Title>
      </div>

      <div className="space-y-6">
        <CoverImage
          onImageChange={setCoverImage}
          className="w-full max-w-2xl 2xl:max-w-3xl mx-auto"
        />

        <CreateShowcaseManager onImagesChange={setShowcaseImages} />

        <PropertyForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Criar Propriedade"
        />
      </div>
    </div>
  );
}
