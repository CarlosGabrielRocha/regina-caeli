"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircle } from "lucide-react";
import { AuthNavigationButton } from "../components/AuthNavigationButton";

interface ErrorPageProps {
  title: string;
  description: string;
  content?: string;
  callbackRoute: string;
  buttonText?: string;
}

export default function ErrorPage({
  title,
  description,
  content,
  callbackRoute,
  buttonText,
}: ErrorPageProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-xl sm:border-border">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4 text-sm text-muted-foreground">
          <p>
            {content ??
              "Você pode voltar para a tela de Login e tentar novamente."}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <AuthNavigationButton
            onClick={() => router.push(callbackRoute)}
            className="w-full"
          >
            {buttonText ?? "Voltar para a tela de Login"}
          </AuthNavigationButton>
        </CardFooter>
      </Card>
    </div>
  );
}
