import DefaultProps from "../../props/DefaultProps";
import Icon from "../../icons/Icon";
import SmallTitle from "../../SmallTitle";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PropertyCardHeaderProps, PropertyCardProps } from "./types";

const PropertyCard: React.FC<PropertyCardProps> = ({
  className = "",
  property,
  props,
}) => {
  const queryParams = new URLSearchParams({
    bedrooms: property?.bedrooms.toString() ?? "",
    price: property?.price.toString() ?? "",
    type: property?.type ?? "",
    city: property?.address.city ?? "",
    state: property?.address.state ?? "",
  });
  return (
    <Link href={`/api/similar/${property?.id}?${queryParams.toString()}`}className={!property ? "cursor-not-allowed" : ""}>
      <article
        className={cn(
          "flex flex-col w-full h-100 max-md:max-w-17rem max-md:min-w-13 xl:h-110 2xl:h-130 p-4 bg-tertiary hover:bg-tertiary/90 text-white rounded-xl shadow-lg/20 cursor-pointer transition-colors",
          !property && "cursor-not-allowed bg-tertiary/50",
          className,
        )}
        {...props}
      >
        <PropertyCardHeader
          imgSrc={property?.coverImg.url ?? "/images/placeholder-image.png"}
          imgAlt={property?.title ?? "Propriedade não encontrada"}
          price={property?.formattedPrice}
          bedrooms={property?.bedrooms}
          bathrooms={property?.bathrooms}
        />
        <PropertyCardBody>
          <PropertyCardTitle>{property?.title ?? "Propriedade não encontrada"}</PropertyCardTitle>
          <PropertyCardDescription>
            {property?.shortDescription ?? "Propriedade deletada do sistema ou indisponível"}
          </PropertyCardDescription>
        </PropertyCardBody>
      </article>
    </Link>
  );
};

const PropertyCardHeader: React.FC<PropertyCardHeaderProps> = (props) => {
  const { imgSrc, imgAlt, price, bedrooms, bathrooms } = props;
  return (
    <div className={`flex flex-col gap-4 w-full`}>
      <div className={`w-full h-40 2xl:h-55 relative shadow-lg`}>
        <Image
          fill
          src={imgSrc}
          alt={imgAlt}
          sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={100}
          className="contrast-125 saturate-110 brightness-100 object-cover"
        />
      </div>
      <div className={`flex justify-between items-center`}>
        <span className="font-bold text-sm 2xl:text-lg">
          R$: {price}
        </span>
        <div className={`flex gap-2`}>
          <div className={`flex gap-2 items-center`}>
            <Icon src="/icons/bed-icon.svg" alt="Quartos" />
            <span className="font-bold text-xs xl:text-sm 2xl:text-lg">
              {bedrooms}
            </span>
          </div>
          <div className={`flex gap-2 items-center`}>
            <Icon src="/icons/shower-icon.svg" alt="Banheiros" />
            <span className="font-bold text-xs xl:text-sm 2xl:text-lg">
              {bathrooms}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyCardBody: React.FC<DefaultProps> = ({ children }) => {
  return <div className="flex flex-col gap-2 mt-4">{children}</div>;
};

const PropertyCardTitle: React.FC<DefaultProps> = ({ children }) => {
  return (
    <SmallTitle className="w-full font-medium line-clamp-2">
      {children}
    </SmallTitle>
  );
};

const PropertyCardDescription: React.FC<DefaultProps> = ({ children }) => {
  return (
    <p className="w-full font-light line-clamp-6 text-sm 2xl:text-md">
      {children}
    </p>
  );
};

export default PropertyCard;
