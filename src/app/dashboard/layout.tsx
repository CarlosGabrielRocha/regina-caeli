import Footer from "../../views/footer";
import DashboardHeader from "../../views/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 bg-background min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
