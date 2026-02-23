import Link from "next/link";
import { Button } from "../../components/ui/button";
import Title from "../../components/Title";
import Text from "../../components/Text";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] gap-8 text-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="relative">
        <div className="absolute -inset-4 bg-highlight/20 blur-2xl rounded-full" />
        <ShieldAlert className="w-20 h-20 text-highlight relative z-10" />
      </div>

      <div className="flex flex-col gap-3 max-w-md">
        <Title size="md" className="text-foreground">
          Acesso Negado
        </Title>
        <Text size="big" className="text-muted-foreground">
          Você não tem as permissões necessárias para acessar esta rota.
        </Text>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default" size="lg" className="px-8">
          <Link href="/">Voltar para o Início</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="px-8">
          <Link href="/auth">Entrar com outra conta</Link>
        </Button>
      </div>
    </div>
  );
}
