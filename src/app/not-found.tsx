import Link from "next/link";
import { Button } from "../components/ui/button";
import Title from "../components/Title";
import Text from "../components/Text";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-6 text-center px-4">
      <div className="flex flex-col gap-2">
        <Title size="md" className="text-destructive">
          Página não encontrada
        </Title>
        <Text size="medium" className="text-muted-foreground max-w-md">
          A página que você está procurando não existe ou foi movida.
        </Text>
      </div>
      <Button asChild variant="default" size="lg">
        <Link href="/">Voltar para o Início</Link>
      </Button>
    </div>
  );
}
