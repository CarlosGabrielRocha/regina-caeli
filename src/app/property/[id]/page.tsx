import Icon from "../../../components/icons/Icon";
import Title from "../../../components/Title";
import Text from "../../../components/Text";
import { redirect } from "next/navigation";
import PropertyDescription from "../../../views/property/PropertyDescription";
import PropertyImages from "../../../views/property/PropertyImages";
import Tutorial from "../../../components/Tutorial";
import ContactButton from "../../../components/ContactButton";
import SimilarProperties from "../../../views/property/SimilarProperties";
import { SearchFilter } from "../../../services/propertyService/types";
import { getProperty } from "../../../services/propertyService";
import { AreaChart } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchFilter & { initial?: string | boolean }>;
}

export default async function page({ params, searchParams }: PageProps) {
  const { id } = await params;

  const result = await getProperty(id);

  if (result.status === "error" || !result.data) {
    return redirect("/property/error?message=" + result.message);
  }

  const address = result.data.address;

  const addressString = `${address.street}, ${
    address.number
  }, ${address.neighborhood}. ${address.city} - ${address.state} ${address.complement ?? ""}`;

  const longDescription = result.data.longDescription.split("\n");

  return (
    <>
      <main className="flex flex-col xl:flex-row justify-between gap-7 mt-10 md:mt-20 px-2 md:px-4">
        <section className="flex flex-1 flex-col gap-5 md:min-w-120">
          <div className="flex flex-col gap-2 bg-black/20 border border-white/60 p-4 3xl:p-8 3xl:gap-5 rounded-md shadow-md">
            <Title size="lg" className="mb-10 text-secondary-light">
              {result.data.title}
            </Title>
            <div className="flex items-center gap-2">
              <Text type="span" size="bigger" className="font-bold">
                R$
              </Text>
              <Text type="span" size="bigger" className="font-light">
                {result.data.formattedPrice}
              </Text>
            </div>

            <div className="flex items-center gap-2">
              <Icon size="big" src="/icons/address-icon.svg" alt="Endereço" />
              <Text
                type="address"
                className="font-bold text-muted-foreground 3xl:text-2xl"
              >
                {addressString}
              </Text>
            </div>
            {result.data.area && (
              <div className="flex self-end items-center gap-2">
                <AreaChart className="size-6" />
                <Text
                  type="address"
                  className="font-bold text-muted-foreground"
                >
                  Área:{" "}
                  <Text type="span" className="font-light">
                    {result.data.area}
                  </Text>{" "}
                  m²
                </Text>
              </div>
            )}
          </div>
          <div className="sticky flex flex-wrap gap-2 items-center justify-between bg-black/20 shadow-md p-4 rounded-md">
            <Text size="bigger" className="font-bold">
              Ficou interessado?
            </Text>
            <ContactButton propertyId={id} />
          </div>
          <PropertyDescription description={longDescription} />
        </section>
        <section className="flex flex-1 flex-col gap-10 md:min-w-140">
          <Tutorial>Role para ver mais</Tutorial>
          <PropertyImages
            images={result.data.showcaseImgs?.map((img) => img.url) || []}
            title={result.data.title}
          />
        </section>
      </main>
      <div className="w-full px-2 md:px-4 mt-15">
        <hr className="w-full h-px border-white/70" />
      </div>
      <SimilarProperties
        currentProperty={result.data}
        searchParams={searchParams}
      />
    </>
  );
}
