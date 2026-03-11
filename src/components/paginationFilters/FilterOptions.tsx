import { cn } from "@/lib/utils";
import { FilterOption } from "./FilterOption";
import { FilterOptionsProps, TagType } from "./types";

export function FilterOptions({
  open,
  activeFilter,
  setOpen,
  setActiveFilter,
}: FilterOptionsProps) {
  const handleFilterClick = (type: TagType) => {
    setActiveFilter((prev: TagType | null) => (prev === type ? null : type));
  };

  return (
    <div
      className={cn(
        "absolute top-12 left-0 bg-tertiary border rounded-sm w-42 md:w-55 3xl:w-65 p-2 shadow-md z-40",
        open ? "block" : "hidden",
      )}
    >
      <FilterOption
        type="text"
        id="state"
        label="Estado"
        open={activeFilter === "state"}
        onClick={() => handleFilterClick("state")}
        setOpen={setOpen}
      >
        Estado
      </FilterOption>
      <FilterOption
        type="text"
        id="city"
        label="Cidade"
        open={activeFilter === "city"}
        onClick={() => handleFilterClick("city")}
        setOpen={setOpen}
      >
        Cidade
      </FilterOption>
      <FilterOption
        type="price"
        id="minPrice"
        label="Preço Minimo"
        open={activeFilter === "minPrice"}
        onClick={() => handleFilterClick("minPrice")}
        setOpen={setOpen}
      >
        Preço Minimo
      </FilterOption>
      <FilterOption
        type="price"
        id="maxPrice"
        label="Preço Maximo"
        open={activeFilter === "maxPrice"}
        onClick={() => handleFilterClick("maxPrice")}
        setOpen={setOpen}
      >
        Preço Maximo
      </FilterOption>
      <FilterOption
        type="number"
        id="bedrooms"
        label="Quartos"
        open={activeFilter === "bedrooms"}
        onClick={() => handleFilterClick("bedrooms")}
        setOpen={setOpen}
      >
        Quartos
      </FilterOption>
      <FilterOption
        type="number"
        id="bathrooms"
        label="Banheiros"
        open={activeFilter === "bathrooms"}
        onClick={() => handleFilterClick("bathrooms")}
        setOpen={setOpen}
      >
        Banheiros
      </FilterOption>
    </div>
  );
}
