"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export default function StatusFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={searchParams.get("status") || "pending"}
      onValueChange={handleStatusChange}
    >
      <SelectTrigger className="w-[180px] bg-neutral-950 border-white text-white">
        <SelectValue placeholder="Filtrar por Status" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-950 border-white/20 text-white">
        <SelectItem value="pending">Pendente</SelectItem>
        <SelectItem value="inProgress">Em Andamento</SelectItem>
        <SelectItem value="done">Concluído</SelectItem>
        <SelectItem value="all">Todos</SelectItem>
      </SelectContent>
    </Select>
  );
}
