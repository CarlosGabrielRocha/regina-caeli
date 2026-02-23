export type AuthView = "login" | "register" | "forgot-password" | "message";

export interface AuthPageProps {
  onNavigate: (view: AuthView, messageData?: MessageData) => void;
}

export interface MessageData {
  data?: string;
  title?: string;
  description?: string;
  dataDescription?: string;
  footerText?: string;
}
