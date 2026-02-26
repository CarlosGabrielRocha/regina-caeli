import { getProperties } from "../../../services/propertyService";
import { headers } from "next/headers";
import {
  SearchFilter,
  SearchPropertiesReturn,
} from "../../../services/propertyService/types";
import Title from "../../../components/Title";
import SearchBar from "../../../components/SearchBar";
import { PagitionFilters } from "../../../components/paginationFilters";
import Pagination from "../../../components/Pagination";
import DashboardPropertyCard from "../../../views/dashboard/Properties/DashboardPropertyCard";
import { Button } from "../../../components/ui/button";
import { PlusCircle } from "lucide-react";
import A from "../../../components/A";
import { PropertiesContainer } from "../../../components/properties";
import EmptyProperties from "../../../components/properties/EmptyProperties";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchFilter>;
}) {
  const { title, page, city, state, minPrice, maxPrice, bedrooms, bathrooms } =
    await searchParams;

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /mobile/i.test(userAgent);
  const pageSize = isMobile ? 4 : 8;

  const result = (await getProperties({
    pageSize,
    page: page || 1,
    title: title || undefined,
    city: city || undefined,
    state: state || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    bedrooms: bedrooms || undefined,
    bathrooms: bathrooms || undefined,
  })) as SearchPropertiesReturn;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Title size="md">Gerenciar Propriedades</Title>
        <A href="/dashboard/properties/new">
          <Button className="bg-highlight hover:bg-highlight/90 text-white gap-2">
            <PlusCircle className="size-4" />
            Nova Propriedade
          </Button>
        </A>
      </div>

      <div className="flex md:flex-row flex-col gap-8 items-center w-full bg-white/5 p-6 rounded-xl border border-white/10">
        <SearchBar />
        <PagitionFilters className="self-start" />
      </div>

      {result.status === "error" ? (
        <div className="text-center py-10 text-red-400">
          Erro ao carregar propriedades.
        </div>
      ) : (
        <>
          {!result.data || result.data.length === 0 ? (
            <EmptyProperties />
          ) : (
            <PropertiesContainer>
              {result.data.map((property) => (
                <DashboardPropertyCard key={property.id} property={property} />
              ))}
            </PropertiesContainer>
          )}

          {result.pagination && result.data && result.data.length > 0 && (
            <div className="flex justify-center">
              <Pagination {...result.pagination} mobileScrollTo={300} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
