import Footer from "../../views/footer";
import PropertyHeader from "../../views/property/propertyHeader";
import { ContactAlertProvider } from "../../contexts/ContactAlertContext";

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PropertyHeader />
      {children}
      <Footer />
    </>
  );
}
