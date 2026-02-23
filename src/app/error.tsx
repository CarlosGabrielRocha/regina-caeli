"use client";

import Title from "../components/Title";
import Text from "../components/Text";
import { Button } from "../components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-6 text-center px-4">
      <div className="flex flex-col gap-2">
        <Title size="md" className="text-destructive">
          Ops! Algo deu errado.
        </Title>
        <Text size="medium" className="text-muted-foreground max-w-md">
          Desculpe, ocorreu um erro inesperado ao carregar esta página:
        </Text>
        <Text size="medium" className="text-white max-w-md">
          {error.message}
        </Text>
      </div>
      <Button
        variant="default"
        size="lg"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Tentar Novamente
      </Button>
    </div>
  );
}
