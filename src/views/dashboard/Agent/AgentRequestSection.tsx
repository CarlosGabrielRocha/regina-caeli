import Pagination from "@/components/Pagination";
import Title from "@/components/Title";
import AgentRequestList from "./AgentRequestList";
import { ContactRequest } from "@/actions/types/Modals";

interface AgentRequestSectionProps {
  title: string;
  indicatorColor: string;
  isPulse?: boolean;
  requests: ContactRequest[];
  type: "pending" | "done";
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export default function AgentRequestSection({
  title,
  indicatorColor,
  isPulse,
  requests,
  type,
  pagination,
}: AgentRequestSectionProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-wrap items-center gap-2">
        <Title size="sm" className="flex items-center gap-2">
          <div
            className={`min-w-3 min-h-3 rounded-full ${indicatorColor} ${
              isPulse ? "animate-pulse" : ""
            }`}
          />
          {title}
        </Title>
        <span className="bg-white/10 px-2 py-0.5 rounded text-sm font-mono text-white/80">
          {requests.length}
        </span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <AgentRequestList requests={requests} type={type} />
        {pagination && <Pagination {...pagination} />}
      </div>
    </div>
  );
}
