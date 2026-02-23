import { NotificationProvider } from "../../contexts/NotificationContext";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <div
        className="relative flex min-h-screen items-center justify-center p-4 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage:
            "url('/images/gradient-background.png'), linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))",
        }}
      >
        {children}
      </div>
    </NotificationProvider>
  );
}
