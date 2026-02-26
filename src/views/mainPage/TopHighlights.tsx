import Properties from "../../components/properties";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import {
  SearchFilter,
  SearchPropertiesReturn,
} from "../../services/propertyService/types";
import Title from "../../components/Title";
import { PagitionFilters } from "../../components/paginationFilters";
import { getProperties } from "../../services/propertyService";
import { headers } from "next/headers";

export default async function TopHighlights({
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

  let result = (await getProperties({
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
    <section
      id="highlights"
      className="flex flex-col gap-15 items-center w-full px-3 md:px-10 2xl:px-10 py-10 md:py-15 bg-linear-to-b from-background via-black/30 to-background"
    >
      <Title size="lg">Destaques</Title>
      <div className="flex md:flex-row flex-col gap-15 items-center w-full">
        <SearchBar />
        <PagitionFilters className="self-start" />
      </div>
      <Properties properties={result?.data} />
      {result?.pagination && result.data && result.data.length > 0 && (
        <Pagination {...result.pagination} />
      )}
    </section>
  );
}
