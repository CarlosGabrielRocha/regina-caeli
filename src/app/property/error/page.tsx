"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Title from "../../../components/Title";
import Text from "../../../components/Text";
import { Button } from "../../../components/ui/button";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-6 text-center px-4">
      <div className="flex flex-col gap-5">
        <Title size="lg" className="text-destructive">
          Ops! Algo deu errado.
        </Title>
        <Text size="bigger" className="text-muted-foreground max-w-md">
          {message || "Desculpe, ocorreu um erro inesperado."}
        </Text>
      </div>
      <Button variant="outline" size="lg" onClick={() => router.push("/")}>
        Voltar para o Início
      </Button>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
