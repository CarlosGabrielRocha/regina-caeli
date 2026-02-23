import { FormattedProperty } from "../../services/propertyService/types";
import PropertyCard from "./PropertyCard";

interface PropertyListProps {
  properties: (FormattedProperty | undefined)[];
}

export default function PropertyList({ properties }: PropertyListProps) {
  return (
    <>
      {properties.map((property, index) => {
        const key = property?.id ?? `property-${index}`;
        return <PropertyCard key={key} property={property} />;
      })}
    </>
  );
}
