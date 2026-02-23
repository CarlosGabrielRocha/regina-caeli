"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useUser } from "../../../contexts/UserContext";

export default function LoginWithTokenSucess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getUser } = useUser();

  useEffect(() => {
    getUser({ load: false }).then(() => {
      router.push("/");
    });
  }, [getUser, router]);

  return (
    <Card className="w-full max-w-md border-none shadow-xl sm:border-border p-4">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="rounded-full bg-green-500/10 p-3">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
          </div>
        </div>
        <CardTitle>Login Bem-Sucedido</CardTitle>
        <CardDescription>Você foi autenticado com sucesso</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Você será redirecionado em breve...
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
