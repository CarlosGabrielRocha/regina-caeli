"use client";

import Title from "../../../../../components/Title";
import PropertyForm from "../../../../../views/dashboard/PropertyForm";
import EditShowcaseManager from "../../../../../views/dashboard/Properties/ShowcaseManager/EditShowcaseManager";
import { PropertyFormData } from "../../../../../schemas/property-schemas";
import { updatePropertyAction } from "../../../../../actions/property/updateProperty";
import { setLaunchPropertyAction } from "../../../../../actions/property/setLaunch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { FormattedProperty } from "../../../../../services/propertyService/types";
import { Button } from "../../../../../components/ui/button";
import { Rocket, Loader2 } from "lucide-react";
import CoverImage from "../../../../../views/dashboard/Properties/CoverImage";
import BackButton from "../../../../../components/buttons/BackButton";
import { usePropertyUpdated } from "../../../../../contexts/PropertyUpdatedContext";
import { Loader } from "../../../../../components/ui/loader";
import Text from "../../../../../components/Text";

interface EditPropertyClientPageProps {
  property: FormattedProperty;
}

export default function EditPropertyClientPage({
  property,
}: EditPropertyClientPageProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasNewCoverImage, setHasNewCoverImage] = useState(false);
  const [coverImage, setCoverImage] = useState<File | string | null>(
    property.coverImg?.url || null,
  );

  const { showPropertyUpdatedAlert } = usePropertyUpdated();

  const initialData: Partial<PropertyFormData> = useMemo(
    () => ({
      title: property.title,
      shortDescription: property.shortDescription,
      longDescription: property.longDescription,
      price: property.price ? String(property.price) : "",
      bedrooms: String(property.bedrooms),
      bathrooms: String(property.bathrooms),
      area: String(property.area),
      type: property.type,
      address: property.address,
    }),
    [property],
  );

  const handleSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);

    if (!coverImage && hasNewCoverImage) {
      toast.error("A imagem de capa é obrigatória");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();

    if (coverImage instanceof File) {
      formData.append("coverImg", coverImage);
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

    const result = await updatePropertyAction({
      id: property.id,
      formData,
    });

    if (result.status === "ok") {
      showPropertyUpdatedAlert(property);
      router.refresh();
    } else {
      toast.error(result.message || "Erro ao atualizar propriedade.");
    }

    setIsSubmitting(false);
    setHasNewCoverImage(false);
  };

  const [isSettingLaunch, setIsSettingLaunch] = useState(false);

  const handleSetLaunch = async () => {
    setIsSettingLaunch(true);
    const result = await setLaunchPropertyAction(property.id);
    if (result.status === "success") {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
    setIsSettingLaunch(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl 2xl:max-8xl">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <Title size="md">Editar Propriedade</Title>
        </div>

        <Button
          onClick={handleSetLaunch}
          disabled={isSettingLaunch || property.isLaunch}
          variant={"modify"}
          className={`gap-2 ${property.isLaunch ? "opacity-50 pointer-events-none" : ""}`}
        >
          {isSettingLaunch ? (
            <Loader />
          ) : (
            <Rocket className="size-4 md:size-5 2xl:size-6" />
          )}
          <Text type="span">
            {property.isLaunch
              ? "Esta propriedade é um lançamento"
              : "Definir como Lançamento"}
          </Text>
        </Button>
      </div>

      <div className="space-y-6">
        {/* Cover Image */}
        <CoverImage
          initialImage={property.coverImg?.url}
          onImageChange={(file) => {
            setCoverImage(file);
            setHasNewCoverImage(true);
          }}
          className="w-full max-w-2xl 2xl:max-w-3xl mx-auto"
        />

        <PropertyForm
          initialData={initialData as PropertyFormData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Salvar Alterações"
          hasNewCoverImage={hasNewCoverImage}
        />

        <EditShowcaseManager
          property={property}
          images={property.showcaseImgs || []}
        />
      </div>
    </div>
  );
}
