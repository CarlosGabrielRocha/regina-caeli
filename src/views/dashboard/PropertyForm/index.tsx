"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertyFormSchema,
  type PropertyFormData,
} from "../../../schemas/property-schemas";
import { FormInput } from "../../../components/form/FormInput";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";
import Title from "../../../components/Title";
import { toast } from "sonner";
import { useRef, useState, useEffect } from "react";
import { searchCepInfo } from "../../../schemas/validators/cep-validator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { FormTextarea } from "../../../components/form/FormTextarea";
import Text from "../../../components/Text";

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  onSubmit: (data: PropertyFormData) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
  hasNewCoverImage?: boolean;
}

export default function PropertyForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel,
  hasNewCoverImage = false,
}: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<PropertyFormData>({
    mode: "onBlur",
    resolver: zodResolver(propertyFormSchema),
    defaultValues: initialData || {
      type: "apartment",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const lastFetchedCep = useRef<string>(initialData?.address?.cep || "");
  const [isCepLoading, setIsCepLoading] = useState(false);

  const type = watch("type");
  const cep = watch("address.cep");

  const onCepChange = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    const cleanCep = cep?.replace(/\D/g, "");

    if (cleanCep?.length === 8 && cleanCep !== lastFetchedCep.current) {
      const timeout = setTimeout(() => {
        setIsCepLoading(true);
        const fetchCepData = async () => {
          const loadingToast = toast.loading("Buscando CEP...");
          const res = await searchCepInfo(cleanCep);
          toast.dismiss(loadingToast);

          if (res.valid && res.data) {
            setValue("address.street", res.data.street);
            setValue("address.neighborhood", res.data.neighborhood);
            setValue("address.city", res.data.city);
            setValue("address.state", res.data.state);
            toast.success("Endereço preenchido!");
            lastFetchedCep.current = cleanCep;
          } else {
            toast.error("CEP não encontrado.");
          }
          setIsCepLoading(false);
        };
        fetchCepData();
      }, 2000);
      timeoutId.current = timeout;
    }
  };

  const isButtonDisabled = (!isDirty && !hasNewCoverImage) || isSubmitting;

  return (
    <form
      id="propertyForm"
      name="propertyForm"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-tertiary shadow-md p-6 rounded-xl border border-white/10"
    >
      <div className="space-y-4">
        <Title size="sm">Informações Básicas</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <FormInput
              label="Título"
              name="title"
              placeholder="Ex: Apartamento luxuoso no centro"
              register={register}
              error={errors.title}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-foreground text-xs md:text-sm 2xl:text-base">
              Tipo de Imóvel <span className="text-highlight">*</span>
            </label>
            <Select
              value={type}
              onValueChange={(val: any) =>
                setValue("type", val, { shouldDirty: true })
              }
            >
              <SelectTrigger className="w-full bg-background border-input text-foreground font-light text-xs md:text-sm 2xl:text-base 2xl:h-12">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartamento</SelectItem>
                <SelectItem value="house">Casa</SelectItem>
                <SelectItem value="condominium">Condomínio</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-xs text-red-500 font-light">
                {errors.type.message}
              </p>
            )}
          </div>

          <FormInput
            label="Preço (R$)"
            name="price"
            type="number"
            placeholder="0.00"
            register={register}
            error={errors.price}
            required
          />

          <div className="md:col-span-2">
            <FormInput
              label="Descrição Curta"
              name="shortDescription"
              placeholder="Breve resumo do imóvel que irá aparecer no card"
              maxLength={125}
              register={register}
              error={errors.shortDescription}
              required
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <FormTextarea
              placeholder="Essa é a descrição que irá aparecer na página do imóvel"
              label="Descrição completa"
              name="longDescription"
              register={register}
              error={errors.longDescription}
              className="min-h-[200px]"
              required
            />
            {errors.longDescription && (
              <p className="text-xs text-red-500 font-light">
                {errors.longDescription.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Title size="sm">Detalhes</Title>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormInput
            label="Quartos"
            name="bedrooms"
            type="number"
            register={register}
            error={errors.bedrooms}
            required
          />
          <FormInput
            label="Banheiros"
            name="bathrooms"
            type="number"
            register={register}
            error={errors.bathrooms}
            required
          />
          <FormInput
            label="Área (m²)"
            name="area"
            type="number"
            register={register}
            error={errors.area}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Title size="sm">Endereço</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            disabled={isCepLoading}
            label="CEP"
            name="address.cep"
            onKeyUp={onCepChange}
            register={register}
            error={errors.address?.cep}
          />
          <div className="md:col-span-2">
            <FormInput
              label="Rua"
              name="address.street"
              register={register}
              error={errors.address?.street}
              required
            />
          </div>

          <FormInput
            label="Número"
            name="address.number"
            register={register}
            error={errors.address?.number}
          />
          <FormInput
            label="Complemento"
            name="address.complement"
            register={register}
            error={errors.address?.complement}
          />
          <FormInput
            label="Bairro"
            name="address.neighborhood"
            register={register}
            error={errors.address?.neighborhood}
            required
          />

          <FormInput
            label="Cidade"
            name="address.city"
            register={register}
            error={errors.address?.city}
            required
          />
          <FormInput
            label="UF"
            name="address.state"
            register={register}
            error={errors.address?.state}
            placeholder="EX: SP"
            required
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          disabled={isButtonDisabled}
          type="submit"
          className="bg-highlight hover:bg-highlight/90 text-white min-w-40"
        >
          <Text type="span">
            {isSubmitting ? <Loader2 className="animate-spin" /> : submitLabel}
          </Text>
        </Button>
      </div>
    </form>
  );
}
