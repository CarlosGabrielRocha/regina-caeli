"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Text from "./Text";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function Pagination({
  page,
  pageSize,
  total,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const AllPagesNumber = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pagesToSkip = Math.floor((page - 1) / 5);

  const skippedPages = AllPagesNumber.slice(pagesToSkip * 5);
  const slicePages = AllPagesNumber.slice(pagesToSkip * 5, pagesToSkip * 5 + 5);

  const handlePageChange = (newPage: number) => {
    const param = new URLSearchParams(searchParams);
    param.set("page", newPage.toString());
    replace(`${pathname}?${param.toString()}`, { scroll: false });

    // Scroll to top on mobile
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 w-fit">
      <button
        onClick={() => {
          handlePageChange(page - 1);
        }}
        className={`flex items-center ${
          !hasPreviousPage && "pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className={`size-9 2xl:size-11 text-tertiary hover:text-highlight transition-colors ${
            hasPreviousPage ? "" : "opacity-50 hover:text-tertiary"
          }`}
          aria-label="Anterior"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      </button>
      <div
        className={`flex gap-2 ${
          skippedPages.length > 5 ? "after:content-['...']" : ""
        }`}
      >
        {slicePages.map((p) => (
          <button
            key={p}
            className={`${p === page && "font-bold"}`}
            onClick={() => {
              handlePageChange(p);
            }}
          >
            <Text size="big" type="span">
              {p}
            </Text>
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          handlePageChange(page + 1);
        }}
        className={`flex items-center ${!hasNextPage && "pointer-events-none"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className={`size-9 2xl:size-11 text-tertiary hover:text-highlight transition-colors ${
            hasNextPage ? "" : "opacity-50 hover:text-tertiary"
          }`}
          aria-label="Proximo"
        >
          <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
        </svg>
      </button>
    </div>
  );
}
