"use client";

import Icon from "./icons/Icon";
import { useState, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [value, setValue] = useState(
    searchParams.get("title")?.toString() || "",
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyUp = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setIsLoading(true);

    timeout.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("title", value);
      } else {
        params.delete("title");
      }

      if (params.get("initial")) {
        params.delete("initial");
      }
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`, { scroll: false });
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  return (
    <div className="flex items-center gap-2 w-50 sm:w-full sm:max-w-80 2xl:max-w-90 min-w-55 transition-all">
      <div className="relative h-fit w-full shadow-lg">
        <input
          type="text"
          className="peer bg-neutral-950 border border-white w-full py-1.5 md:py-2 ps-5 pe-6 2xl:py-3 rounded-lg 2xl:rounded-xl text-sm 2xl:text-md font-light focus:border-highlight"
          name="search"
          id="search"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar..."
        />
        <div className="opacity-0 peer-focus:opacity-100 absolute w-1 h-px left-5 top-0 z-10 px-3 bg-background" />
        <label
          className="absolute top-1/2 -translate-y-1/2 right-2 w-fit peer-focus:left-5.5 peer-focus:top-0 peer-focus:scale-85 peer-focus:z-10 transition-all ease-in-out duration-100"
          htmlFor="search"
        >
          <Icon
            src="/icons/search-icon.svg"
            alt="Pesquisar"
            size="smaller"
            responsive={false}
          />
        </label>
      </div>
      {isLoading && <Loader2 className="size-4 animate-spin text-white" />}
    </div>
  );
}
