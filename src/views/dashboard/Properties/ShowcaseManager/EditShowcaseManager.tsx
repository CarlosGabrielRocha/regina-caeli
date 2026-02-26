"use client";

import { useState } from "react";
import { ShowcaseImageGrid } from "./components/ShowcaseImageGrid";
import { ShowcasePanel } from "./components/ShowcasePanel";
import { uploadShowcaseImagesAction } from "../../../../actions/property/uploadShowcaseImages";
import { deleteShowcaseImageAction } from "../../../../actions/property/deleteShowcaseImage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import compressImage from "../../../../helpers/imageCompression";
import { ConfirmModal } from "../../../../components/ConfirmModal";
import { usePropertyUpdated } from "../../../../contexts/PropertyUpdatedContext";
import { FormattedProperty } from "../../../../services/propertyService/types";

interface ShowcaseImage {
  id: string;
  url: string;
}

interface EditShowcaseManagerProps {
  property: FormattedProperty;
  images: ShowcaseImage[];
}

export default function EditShowcaseManager({
  property,
  images,
}: EditShowcaseManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [imagesCount, setImagesCount] = useState(images.length);
  const [files, setFiles] = useState<File[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const router = useRouter();
  const { showPropertyUpdatedAlert } = usePropertyUpdated();

  const handleFilesSelected = async (files: File[]) => {
    setIsUploading(true);

    if (imagesCount + files.length > 6) {
      toast.error("Limite máximo de 6 imagens excedido!");
      setIsUploading(false);
      return;
    }

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Imagem muito grande! Tamanho máximo permitido: 10MB");
        setIsUploading(false);
        return;
      }
    }

    const formData = new FormData();
    for (const file of files) {
      const compressedImage = await compressImage(file);
      if (compressedImage) {
        formData.append("images", compressedImage);
      } else {
        toast.error(`Erro ao tentar comprimir ${file.name}`);
      }
    }

    formData.append("propertyId", property.id);

    const result = await uploadShowcaseImagesAction(formData);

    if (result.status === "ok") {
      showPropertyUpdatedAlert(property);
      setImagesCount(imagesCount + files.length);
      router.refresh();
    } else {
      toast.error(
        result.message || "Erro ao tentar adicionar imagem de demonstração",
      );
    }
    setIsUploading(false);
  };

  const handleDelete = async (imageId: string) => {
    setDeletingId(imageId);
    const result = await deleteShowcaseImageAction({
      propertyId: property.id,
      imageId,
    });

    if (result.status === "ok") {
      showPropertyUpdatedAlert(property);
      setImagesCount(imagesCount - 1);
      router.refresh();
    } else {
      toast.error(result.message || "Erro ao tentar remover imagem");
    }
    setDeletingId(null);
  };

  return (
    <>
      <ConfirmModal
        isOpen={modalOpen}
        buttonConfirmType="confirm"
        onConfirm={() => {
          if (files) {
            handleFilesSelected(files);
          }
          setModalOpen(false);
          setFiles(null);
        }}
        onClose={() => {
          setFiles(null);
          setModalOpen(false);
        }}
        title="Confirmação de upload"
        description={modalMessage}
      />
      <ShowcasePanel
        onFilesSelected={(fileList: File[]) => {
          setFiles(fileList);
          const filesNames = fileList.map((file) => file.name).join(", ");
          setModalMessage(
            `Você selecionou as seguintes imagens: ${filesNames}. Deseja continuar?`,
          );
          setModalOpen(true);
        }}
        isUploading={isUploading}
      >
        <ShowcaseImageGrid
          images={images}
          onDelete={(id) => handleDelete(id as string)}
          deletingId={deletingId}
        />
      </ShowcasePanel>
    </>
  );
}
