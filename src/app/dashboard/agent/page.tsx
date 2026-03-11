import Title from "../../../components/Title";
import { headers } from "next/headers";
import AgentDashboardContent from "../../../views/dashboard/Agent/AgentDashboardContent";
import A from "../../../components/A";
import { ContactRequest } from "../../../actions/types/Modals";
import { getAgent } from "../../../services/agentService";
import AgentFilter from "../../../views/dashboard/Agent/AgentFilter";
import Text from "../../../components/Text";

interface AgentDashboardPageProps {
  searchParams: Promise<{
    createdAt?: string;
    page?: string;
  }>;
}

export default async function AgentDashboardPage({
  searchParams,
}: AgentDashboardPageProps) {
  const { createdAt, page } = await searchParams;
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /mobile/i.test(userAgent);
  const pageSize = isMobile ? 6 : 12;

  const result = await getAgent({
    createdAt,
    page: page ? parseInt(page) : 1,
    pageSize,
  });

  if (result.status === "error" || !result.data) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-400">
        <Text>{result.message || "Erro ao carregar dados do agente."}</Text>
        <Text size="small" className="text-white/60 mt-2">
          Certifique-se de que você possui permissões de Agente.
        </Text>
        <A href="/" className="text-highlight hover:underline mt-4 block">
        <Text>
          Voltar para Home
        </Text>
        </A>
      </div>
    );
  }

  const agentData = result.data;
  const inProgressRequests = agentData.inProgressContactReqs.data || [];
  const inProgressPagination = agentData.inProgressContactReqs.pagination;

  // Extract the inner contactRequest from DoneContactRequest items
  const doneRequests = agentData.doneContactReqs.data.map((d) => {
    // ... (mapping logic remains the same)
    if (d.contactRequest) return d.contactRequest;

    return {
      id: `deleted-${d.id}`,
      status: "done",
      description:
        "Informações não estão mais disponíveis, usuário deletado do sistema.",
      agentId: d.agentId,
      clientId: "deleted",
      createdAt: d.createdAt,
      updatedAt: d.createdAt,
    } as ContactRequest;
  });
  const donePagination = agentData.doneContactReqs.pagination;

  return (
    <div className="container mx-auto px-1 py-4 md:px-4 md:py-8">
      <div className="bg-tertiary/50 border border-white/10 rounded-xl shadow-lg p-2 md:p-6 space-y-12 min-h-[85vh]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
          <div>
            <Title size="md">Painel do Agente</Title>
            <Text className="text-muted-foreground mt-2 max-w-2xl">
              Bem-vindo(a), {agentData.agent.user.name}! Gerencie suas solicitações
              de contato e acompanhe seu histórico.
            </Text>
          </div>
          <AgentFilter />
        </div>

        <AgentDashboardContent
          inProgressRequests={inProgressRequests}
          doneRequests={doneRequests}
          inProgressPagination={inProgressPagination}
          donePagination={donePagination}
        />
      </div>
    </div>
  );
}
