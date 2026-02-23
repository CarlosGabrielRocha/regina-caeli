"use client";

import { LogIn } from "lucide-react";
import Text from "../../../components/Text";
import Title from "../../../components/Title";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

interface NotLoggedViewProps {
  onLoginClick: () => void;
  onGoogleSuccess: (response: any) => void;
}

export default function NotLoggedView({
  onLoginClick,
  onGoogleSuccess,
}: NotLoggedViewProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-3 max-w-[80%] mx-auto">
        <Title size="sm" className="text-xl">
          Bem-vindo(a)!
        </Title>
        <Text className="text-muted-foreground text-center leading-relaxed">
          Faça login ou cadastre-se para aproveitar todos os recursos.
        </Text>
      </div>
      <div className="w-full space-y-4 pt-4">
        <Button
          asChild
          className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
          size="lg"
        >
          <Link href="/auth" onClick={onLoginClick}>
            <LogIn className="w-5 h-5 mr-2" />
            <Text type="span">Entre ou Cadastre-se</Text>
          </Link>
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <Text
              type="span"
              className="bg-tertiary px-2 text-muted-foreground"
            >
              Ou
            </Text>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={() => toast.error("Falha no login com Google")}
            theme="outline"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}
