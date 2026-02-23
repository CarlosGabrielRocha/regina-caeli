import { getContactRequest } from "../../../../services/contactRequestService";
import { getUser } from "../../../../services/userService";
import Title from "../../../../components/Title";
import Text from "../../../../components/Text";
import InterestList from "../../../../views/dashboard/ContactRequestDetails/InterestList";
import ActionsBar from "../../../../views/dashboard/ContactRequestDetails/ActionsBar";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { User } from "../../../../actions/types/Modals";
import BackButton from "../../../../components/buttons/BackButton";
import ErrorPage from "../../../../views/Error";

interface ContactRequestDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ContactRequestDetailsPage({
  params,
}: ContactRequestDetailsPageProps) {
  const { id } = await params;

  const response = await getContactRequest({
    id,
  });

  if (response.status === "error" || !response.data) {
    return (
      <ErrorPage
        callbackRoute="/dashboard"
        title="Um erro ocorreu"
        description="Não foi possível carregar os dados desta solicitação"
        content="Certifique-se de que você possui permissões de Agente e que esta solicitação existe."
        buttonText="Voltar para o Dashboard"
      />
    );
  }

  const request = response.data;

  let clientUser: User | null = null;
  let agentUser: User | null = null;

  if (request.client?.userId) {
    const clientRes = await getUser(request.client.userId);
    if (clientRes.status === "ok" && clientRes.data) {
      clientUser = clientRes.data;
    }
  }

  if (request.agent?.userId) {
    const agentRes = await getUser(request.agent.userId);
    if (agentRes.status === "ok" && agentRes.data) {
      agentUser = agentRes.data;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-4 flex-wrap">
        <BackButton />
        <div className="flex flex-col gap-2 bg-black/20 border border-white/60 p-4 rounded-md shadow-md">
          <Title size="md">Detalhes da Solicitação</Title>
          <Text className="text-white/70 text-sm">
            Criado em:{" "}
            <span className="font-semibold text-white/90">
              {format(
                new Date(request.createdAt),
                "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                { locale: ptBR },
              )}
            </span>
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <ActionsBar
            status={request.status}
            requestId={request.id}
            agent={agentUser || undefined}
            client={clientUser || undefined}
          />
        </div>
      </div>

      <div className="bg-primary/50 p-6 rounded-xl border border-white/10 space-y-4">
        <div>
          <Text className="uppercase tracking-wider font-bold mb-2">
            Descrição
          </Text>
          <Text size="medium" className="leading-relaxed">
            {request.description || "Sem descrição fornecida."}
          </Text>
        </div>

        <div className="flex gap-8 pt-4 border-t border-white/10">
          <div>
            <Text className="text-sm text-muted-foreground">Status Atual</Text>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-block size-2 2xl:size-3 rounded-full ${
                  request.status === "pending"
                    ? "bg-yellow-500"
                    : request.status === "inProgress"
                      ? "bg-blue-500"
                      : "bg-green-500"
                }`}
              />
              <Text className="font-semibold capitalize">
                {request.status === "pending"
                  ? "Pendente"
                  : request.status === "inProgress"
                    ? "Em Andamento"
                    : "Concluído"}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 w-full items-center justify-center">
        <Title size="md" className="text-white">
          Imóveis de Interesse
        </Title>
        <InterestList interests={request.interests || []} />
      </div>
    </div>
  );
}
