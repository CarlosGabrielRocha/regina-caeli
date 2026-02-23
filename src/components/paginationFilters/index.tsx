"use client";

import { cn } from "@/lib/utils";
import DefaultProps from "../props/DefaultProps";
import { TagType } from "./types";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterButton } from "./FilterButton";
import { FilterTag } from "./FilterTag";
import { FilterOptions } from "./FilterOptions";

interface PaginationFilterProps extends DefaultProps {}

export function PagitionFilters({ className }: PaginationFilterProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [activeFilter, setActiveFilter] = useState<TagType | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleTagDelete = (type: string) => {
    const params = new URLSearchParams(activeParams);
    params.delete(type);
    if (params.get("initial")) {
      params.delete("initial");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleTagEdit = (type: TagType) => {
    setOpen(true);
    setActiveFilter(type);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex gap-5", className)}
    >
      <div className="flex gap-5">
        <FilterButton onClick={() => setOpen(!open)} />
      </div>
      <div className="flex gap-3 flex-wrap">
        {activeParams.get("city") && (
          <FilterTag
            type="city"
            handleTagDelete={() => handleTagDelete("city")}
            handleTagEdit={() => handleTagEdit("city")}
          >
            {activeParams.get("city")}
          </FilterTag>
        )}
        {activeParams.get("state") && (
          <FilterTag
            type="state"
            handleTagDelete={() => handleTagDelete("state")}
            handleTagEdit={() => handleTagEdit("state")}
          >
            {activeParams.get("state")}
          </FilterTag>
        )}
        {activeParams.get("minPrice") && (
          <FilterTag
            type="minPrice"
            handleTagDelete={() => handleTagDelete("minPrice")}
            handleTagEdit={() => handleTagEdit("minPrice")}
          >
            {activeParams.get("minPrice")}
          </FilterTag>
        )}
        {activeParams.get("maxPrice") && (
          <FilterTag
            type="maxPrice"
            handleTagDelete={() => handleTagDelete("maxPrice")}
            handleTagEdit={() => handleTagEdit("maxPrice")}
          >
            {activeParams.get("maxPrice")}
          </FilterTag>
        )}
        {activeParams.get("bedrooms") && (
          <FilterTag
            type="bedrooms"
            handleTagDelete={() => handleTagDelete("bedrooms")}
            handleTagEdit={() => handleTagEdit("bedrooms")}
          >
            {activeParams.get("bedrooms")}
          </FilterTag>
        )}
        {activeParams.get("bathrooms") && (
          <FilterTag
            type="bathrooms"
            handleTagDelete={() => handleTagDelete("bathrooms")}
            handleTagEdit={() => handleTagEdit("bathrooms")}
          >
            {activeParams.get("bathrooms")}
          </FilterTag>
        )}
      </div>
      <FilterOptions
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        open={open}
      />
    </div>
  );
}
