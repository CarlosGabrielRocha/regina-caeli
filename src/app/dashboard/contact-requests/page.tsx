import { getContactRequests } from "../../../services/contactRequestService";
import { GetContactRequestsReturn } from "../../../services/contactRequestService/types";
import { headers } from "next/headers";
import Title from "../../../components/Title";
import Pagination from "../../../components/Pagination";
import ContactRequestTable from "../../../views/dashboard/ContactRequestList/ContactRequestTable";
import StatusFilter from "../../../views/dashboard/ContactRequestList/StatusFilter";

interface ContactRequestsPageProps {
  searchParams: Promise<{
    status?: "pending" | "done" | "inProgress" | "all";
    page?: string;
  }>;
}

export default async function ContactRequestsPage({
  searchParams,
}: ContactRequestsPageProps) {
  const { status, page } = await searchParams;
  const statusFilter = status === "all" ? undefined : status || "pending";

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /mobile/i.test(userAgent);
  const pageSize = isMobile ? 6 : 12;

  const response: GetContactRequestsReturn = await getContactRequests({
    page: page ? parseInt(page) : 1,
    pageSize,
    status: statusFilter,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <Title size="md">Solicitações de Contato</Title>
        <div className="flex items-center gap-4">
          <StatusFilter />
        </div>
      </div>

      {response.status === "error" ? (
        <div className="text-center py-10 text-red-400">
          <p>{response.message || "Erro ao carregar solicitações."}</p>
        </div>
      ) : (
        response.data && (
          <div className="flex flex-col gap-6 items-center">
            <ContactRequestTable requests={response.data.data} />
            <Pagination {...response.data.pagination} />
          </div>
        )
      )}
    </div>
  );
}
