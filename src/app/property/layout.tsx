import ContainerLimit from "@/components/ContainerLimit";
import Footer from "../../views/footer";
import PropertyHeader from "../../views/property/propertyHeader";

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PropertyHeader />
      <ContainerLimit size="medium">
        {children}
      </ContainerLimit>
      <Footer />
    </>
  );
}
