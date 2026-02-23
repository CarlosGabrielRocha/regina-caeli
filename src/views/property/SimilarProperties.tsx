import {
  SearchFilter,
  SearchPropertiesReturn,
} from "../../services/propertyService/types";
import Properties from "../../components/properties";
import Title from "../../components/Title";
import SearchBar from "../../components/SearchBar";
import { PagitionFilters } from "../../components/paginationFilters";
import PropertyPagination from "../../components/PropertyPagination";
import { FormattedProperty } from "../../services/propertyService/types";
import {
  getProperties,
  getSimilarProperties,
} from "../../services/propertyService";
import { headers } from "next/headers";

interface SimilarPropertiesProps {
  currentProperty: FormattedProperty;
  searchParams: Promise<SearchFilter & { initial?: string | boolean }>;
}

export default async function SimilarProperties({
  searchParams,
  currentProperty,
}: SimilarPropertiesProps) {
  const {
    title,
    page,
    city,
    state,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    initial,
  } = await searchParams;

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /mobile/i.test(userAgent);
  const pageSize = isMobile ? 4 : 8;

  let result: SearchPropertiesReturn;

  if (initial) {
    result = (await getSimilarProperties({
      pageSize,
      page: page || 1,
      id: currentProperty.id,
    })) as SearchPropertiesReturn;
  } else {
    result = (await getProperties({
      pageSize,
      page: page || 1,
      title: title || "",
      city: city || "",
      state: state || "",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      bedrooms: bedrooms || "",
      bathrooms: bathrooms || "",
    })) as SearchPropertiesReturn;
  }

  return (
    <section className="flex flex-col gap-15 items-center w-full px-2 md:px-15 py-15 bg-linear-to-b from-background via-black/30 to-background">
      <Title size="lg" className="w-full lg:mb-10 mb-3 text-center">
        Talvez você goste
      </Title>
      <div className="flex md:flex-row flex-col gap-15 items-center w-full">
        <SearchBar />
        <PagitionFilters />
      </div>

      <Properties properties={result?.data} />
      {result?.pagination && result.data && result.data.length > 0 && (
        <PropertyPagination {...result.pagination} />
      )}
    </section>
  );
}
