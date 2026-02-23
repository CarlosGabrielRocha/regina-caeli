"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { AuthNavigationButton } from "../../components/AuthNavigationButton";
import { AuthPageProps } from "./types";

export interface MessagePageProps extends AuthPageProps {
  data?: string;
  title?: string;
  description?: string;
  dataDescription?: string;
  footerText?: string;
}

export default function MessagePage({
  onNavigate,
  data = "",
  title = "",
  dataDescription = "",
  description = "",
  footerText = "",
}: MessagePageProps) {
  return (
    <Card className="w-full max-w-md border-none shadow-xl sm:border-border">
      <CardHeader className="space-y-1 text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="text-center text-sm font-light">
            <p>{dataDescription} </p>
            <p className="font-light text-highlight">{data}</p>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            <p>{footerText}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <AuthNavigationButton
          onClick={() => onNavigate("login")}
          className="text-sm"
        >
          Voltar para o Login
        </AuthNavigationButton>
      </CardFooter>
    </Card>
  );
}
