import Footer from "../../views/footer";
import DashboardHeader from "../../views/dashboard/DashboardHeader";
import ContainerLimit from "@/components/ContainerLimit";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 bg-background min-h-screen">
        <ContainerLimit size="medium">
          {children}
        </ContainerLimit>
      </main>
      <Footer />
    </>
  );
}
