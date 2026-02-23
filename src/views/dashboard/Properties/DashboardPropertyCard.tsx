"use client";

import PropertyCard from "../../../components/properties/PropertyCard";
import DeletePropertyButton from "./DeletePropertyButton";
import A from "../../../components/A";
import { Pencil } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { FormattedProperty } from "../../../services/propertyService/types";

interface DashboardPropertyCardProps {
  property: FormattedProperty;
}

export default function DashboardPropertyCard({
  property,
}: DashboardPropertyCardProps) {
  return (
    <div className="relative group">
      {/* Property Display */}
      <div className="relative">
        <PropertyCard property={property} />
      </div>

      {/* Overlay Actions */}
      <div className="absolute top-2 right-2 flex gap-2 z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
        <A href={`/dashboard/properties/edit/${property.id}`}>
          <Button
            size="icon"
            className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Pencil className="size-4" />
          </Button>
        </A>
        <DeletePropertyButton propertyId={property.id} />
      </div>
    </div>
  );
}
