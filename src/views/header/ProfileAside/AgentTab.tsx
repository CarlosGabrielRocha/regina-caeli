import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { LayoutDashboard, ListTodo, Building2, PlusCircle } from "lucide-react";
import Text from "../../../components/Text";

interface AgentTabProps {
  closeProfile: () => void;
}

export default function AgentTab({ closeProfile }: AgentTabProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    closeProfile();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-tertiary/50 border border-white/10 rounded-lg">
        <Text className="text-sm text-muted-foreground mb-4">
          Acesso Administrativo
        </Text>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 text-left"
            onClick={() => handleNavigation("/dashboard/agent")}
          >
            <LayoutDashboard className="size-4 2xl:size-5 3xl:size-6" />
            <Text>
              Meu Painel
            </Text>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 text-left"
            onClick={() => handleNavigation("/dashboard/contact-requests")}
          >
            <ListTodo className="size-4 2xl:size-5 3xl:size-6" />
            <Text>
              Solicitações de Contato
            </Text>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 text-left"
            onClick={() => handleNavigation("/dashboard/properties")}
          >
            <Building2 className="size-4 2xl:size-5 3xl:size-6" />
            <Text>
              Gerenciar Propriedades
            </Text>
          </Button>

          <Button
            className="w-full justify-start gap-3 h-12 text-left bg-highlight hover:bg-highlight/90 text-white border-none"
            onClick={() => handleNavigation("/dashboard/properties/new")}
          >
            <PlusCircle className="size-4 2xl:size-5 3xl:size-6" />
            <Text>
              Nova Propriedade
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
}
