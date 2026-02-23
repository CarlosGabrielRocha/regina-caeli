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
            <LayoutDashboard className="size-4" />
            Meu Painel
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 text-left"
            onClick={() => handleNavigation("/dashboard/contact-requests")}
          >
            <ListTodo className="size-4" />
            Solicitações de Contato
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 text-left"
            onClick={() => handleNavigation("/dashboard/properties")}
          >
            <Building2 className="size-4" />
            Gerenciar Propriedades
          </Button>

          <Button
            className="w-full justify-start gap-3 h-12 text-left bg-highlight hover:bg-highlight/90 text-white border-none"
            onClick={() => handleNavigation("/dashboard/properties/new")}
          >
            <PlusCircle className="size-4" />
            Nova Propriedade
          </Button>
        </div>
      </div>
    </div>
  );
}
