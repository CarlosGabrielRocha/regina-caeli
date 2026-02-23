"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import Text from "@/components/Text";
import { Input } from "@/components/ui/input";
import { FilterTag } from "@/components/paginationFilters/FilterTag";

export default function AgentFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [date, setDate] = useState(searchParams.get("createdAt") || "");
  const input = useRef<HTMLInputElement>(null);

  const updateURL = useCallback(
    (newDate: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newDate) {
        params.set("createdAt", newDate);
      } else {
        params.delete("createdAt");
      }
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      input.current?.showPicker();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (newVal) clearFilter();
    setDate(newVal);
    updateURL(newVal);
  };

  const clearFilter = useCallback(() => {
    setDate("");
    updateURL("");
  }, [updateURL]);

  return (
    <div className="flex flex-wrap items-end gap-6 md:gap-4 bg-tertiary/50 p-4 rounded-lg border border-white/10">
      <div className="flex-1 max-w-xs cursor-pointer z-10" onClick={handleClick}>
        <Text className="mb-1 text-white/90">Data Mínima: </Text>
        <Input
          ref={input}
          type="date"
          onChange={handleChange}
          className="text-white text-sm 2xl:text-base border bg-linear-to-r from-primary to-secondary shadow-xs hover:translate-y-0.5 transition-all px-4 py-2 cursor-pointer"
        />
      </div>
      {date && (
        <FilterTag type="createdDate" className="z-10" handleTagDelete={() => {
          if (input.current) input.current.value = ""
          clearFilter()
        }}>
          {date}
        </FilterTag>
      )}
    </div>
  );
}
