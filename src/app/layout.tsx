import type { Metadata } from "next";
import { Rochester, Poppins, ZCOOL_XiaoWei } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NotificationProvider } from "../contexts/NotificationContext";
import { UserProvider } from "../contexts/UserContext";
import { AlertProvider } from "../contexts/AlertContext";
import { ProfileProvider } from "../contexts/ProfileContext";
import { ContactAlertProvider } from "../contexts/ContactAlertContext";
import { PropertyUpdatedProvider } from "../contexts/PropertyUpdatedContext";

export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const rochester = Rochester({
  variable: "--font-rochester",
  weight: "400",
  subsets: ["latin"],
});

export const xiaoWei = ZCOOL_XiaoWei({
  variable: "--font-xiao-wei",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Regina Caeli Imóveis",
  description: "Regina Caeli, Promoção de imóveis em todo o Brasil.",
  keywords: [
    "Regina Caeli",
    "Promotora de imóveis",
    "Imóveis",
    "Pernambuco",
    "Imóveis em Pernambuco",
    "Dayse Rocha Promotora",
    "Casas em Pernambuco",
    "Casa em Pernambuco",
    "Apartamentos em Pernambuco",
    "Apartamento em Pernambuco",
    "Casa sem entrada",
    "Imóvel sem entrada",
    "Imóveis sem entrada",
    "Apartamento sem entrada",
    "Entrada facilitada",
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${poppins.className} ${rochester.variable} ${xiaoWei.variable} bg-background`}
      >
        <UserProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
          >
            <NotificationProvider>
              <ProfileProvider>
                <ContactAlertProvider>
                  <PropertyUpdatedProvider>
                    <AlertProvider>
                      {children}
                      <Toaster />
                    </AlertProvider>
                  </PropertyUpdatedProvider>
                </ContactAlertProvider>
              </ProfileProvider>
            </NotificationProvider>
          </GoogleOAuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}
