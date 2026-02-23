import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { ContactRequest } from "../../../actions/types/Modals"; // Updated import
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Text from "../../../components/Text";
import { ReactNode } from "react";

interface ContactRequestTableProps {
  requests: ContactRequest[];
  showStatus?: boolean;
  renderActions?: (request: ContactRequest) => ReactNode;
  emptyMessage?: string;
}

const statusMap: Record<string, string> = {
  pending: "Pendente",
  inProgress: "Em Andamento",
  done: "Concluído",
};

export default function ContactRequestTable({
  requests,
  showStatus = true,
  renderActions,
  emptyMessage = "Nenhuma solicitação encontrada.",
}: ContactRequestTableProps) {
  return (
    <div className="w-full overflow-y-hidden rounded-lg border border-white/40 shadow-lg">
      <Table>
        <TableHeader className="mb-5">
          <TableRow className="border-white/50 bg-linear-to-r from-primary to-secondary hover:bg-transparent p-2">
            <TableHead className="text-white">Data</TableHead>
            {showStatus && (
              <TableHead className="text-white">Status</TableHead>
            )}
            <TableHead className="text-white">Descrição</TableHead>
            <TableHead className="text-white">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow
              key={request.id}
              className="border-white/10 bg-tertiary hover:bg-tertiary/80 cursor-pointer p-1"
            >
              <TableCell className="font-medium text-white/80">
                {format(new Date(request.createdAt), "dd/MM/yyyy HH:mm", {
                  locale: ptBR,
                })}
              </TableCell>
              {showStatus && (
                <TableCell className="text-white/80">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block size-2 rounded-full ${
                        request.status === "pending"
                          ? "bg-yellow-500"
                          : request.status === "inProgress"
                            ? "bg-blue-500"
                            : "bg-green-500"
                      }`}
                    />
                    {statusMap[request.status] || request.status}
                  </div>
                </TableCell>
              )}
              <TableCell className="text-white/80 max-w-xs truncate">
                {request.description || "Sem descrição"}
              </TableCell>
              <TableCell className="text-right">
                {renderActions ? (
                  renderActions(request)
                ) : (
                  <Button asChild variant="default" size={"sm"}>
                    <Link href={`/dashboard/contact-requests/${request.id}`}>
                      <Text type="span" className="text-white">
                        Ver Detalhes
                      </Text>
                    </Link>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {requests.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={showStatus ? 4 : 3}
                className="text-center text-white/80 py-4"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
