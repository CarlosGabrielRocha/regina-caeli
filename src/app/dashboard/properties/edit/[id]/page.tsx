import { getProperty } from "../../../../../services/propertyService";
import A from "../../../../../components/A";
import EditPropertyClientPage from "./client-page";

interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;
  const response = await getProperty(id);

  if (response.status === "error" || !response.data) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-400">
        <p>{response.message || "Propriedade não encontrada."}</p>
        <A
          href="/dashboard/properties"
          className="text-highlight hover:underline mt-4 block"
        >
          Voltar para lista
        </A>
      </div>
    );
  }

  return <EditPropertyClientPage property={response.data} />;
}
