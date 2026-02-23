import { ContactRequest } from "@/actions/types/Modals";
import A from "@/components/A";
import CompleteRequestButton from "./CompleteRequestButton";
import ContactRequestTable from "@/views/dashboard/ContactRequestList/ContactRequestTable";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";

interface AgentRequestListProps {
  requests: ContactRequest[];
  type: "pending" | "done";
}

export default function AgentRequestList({
  requests,
  type,
}: AgentRequestListProps) {
  const renderActions = (request: ContactRequest) => (
    <div className="flex items-center justify-end gap-3">
      {request.clientId !== "deleted" ? (
        <A href={`/dashboard/contact-requests/${request.id}`}>
          <Button size={"sm"}>
            <Text type="span" size="small">
              Ver Detalhes
            </Text>
          </Button>
        </A>
      ) : (
        <Button disabled size={"sm"}>
          <Text type="span" size="small">
            Ver Detalhes
          </Text>
        </Button>
      )}

      {type === "pending" && <CompleteRequestButton requestId={request.id} />}
    </div>
  );

  return (
    <ContactRequestTable
      requests={requests}
      showStatus={false}
      renderActions={renderActions}
      emptyMessage="Nenhuma solicitação encontrada nesta categoria."
    />
  );
}
