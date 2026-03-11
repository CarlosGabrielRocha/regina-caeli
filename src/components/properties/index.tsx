import { FormattedProperty } from "../../services/propertyService/types";
import PropertyList from "./PropertyList";
import EmptyProperties from "./EmptyProperties";
import { ReactNode } from "react";

interface PropertiesProps {
  properties?: (FormattedProperty | undefined)[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function PropertiesContainer({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min-content,max-content))] sm:grid-cols-[repeat(auto-fit,minmax(14.5rem,17rem))] lg:grid-cols-[repeat(4,minmax(14.5rem,17rem))] 2xl:grid-cols-[repeat(4,minmax(18rem,22rem))] 3xl:grid-cols-[repeat(4,minmax(22rem,26rem))] gap-3 md:gap-6 3xl:gap-8 w-full py-5 md:py-10 justify-center items-center">
      {children}
    </div>
  );
}

export default function Properties({
  properties,
  emptyTitle,
  emptyDescription,
}: PropertiesProps) {
  return (
    <PropertiesContainer>
      {properties && properties.length > 0 ? (
        <PropertyList properties={properties} />
      ) : (
        <EmptyProperties title={emptyTitle} description={emptyDescription} />
      )}
    </PropertiesContainer>
  );
}
