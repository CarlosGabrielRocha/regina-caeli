import Paralax from "../../components/Paralax";
import Text from "../../components/Text";
import Link from "next/link";
import { getProperty } from "../../services/propertyService";

export default async function New() {
  const result = await getProperty("", true);

  const queryParams = new URLSearchParams({
    initial: "true",
    bathrooms: result?.data?.bathrooms?.toString() || "",
    price: result?.data?.price?.toString() || "",
    type: result?.data?.type || "",
    city: result?.data?.address?.city || "",
    state: result?.data?.address?.state || "",
  });

  return (
    <section id="launch" className="py-30 tertiary-gradient">
      <div className="flex items-center mb-20">
        <div className="md:h-[2px] h-px w-full bg-white" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl 3xl:text-7xl px-4">
          Lançamento
        </h1>
        <div className="md:h-[2px] h-px w-full bg-white" />
      </div>
      <Paralax
        overlay={true}
        src={result?.data?.coverImg?.url || "images/placeholder-image.png"}
      >
        <Text
          size="big"
          className="text-white/90 bg-black/50 p-4 md:max-w-9/12 w-full mt-15 rounded-md text-center"
        >
          {result?.data?.shortDescription ?? "Não há um lançamento no momento."}
        </Text>
        <Link
          href={`/api/similar/${result?.data?.id}?${queryParams.toString()}`}
        >
          <button
            className="bg-black/80 text-white/90 px-13 py-3 mb-15 rounded-md text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl border border-white/50 hover:bg-white/5 transition-colors"
            disabled={!result?.data?.id}
          >
            Saiba Mais
          </button>
        </Link>
      </Paralax>
    </section>
  );
}
