import Image from "next/image";
import { PropertyCardHeaderProps } from "../props/cardProps";
import DefaultProps from "../props/DefaultProps";
import Icon from "../icons/Icon";
import Text from "../Text";
import SmallTitle from "../SmallTitle";

const Container: React.FC<DefaultProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col flex-1 min-w-50 max-w-55 sm:max-w-70 2xl:max-w-80 p-4 bg-tertiary text-white rounded-xl shadow-lg/20 ${className}`}
    >
      {children}
    </div>
  );
};

const Header: React.FC<PropertyCardHeaderProps> = (props) => {
  const { imgSrc, imgAlt, price, bedrooms, bathrooms } = props;
  return (
    <article className={`flex flex-col gap-4 w-full`}>
      <div className={`w-full h-34 sm:h-40 2xl:h-55 relative shadow-lg`}>
        <Image
          fill
          src={imgSrc}
          alt={imgAlt}
          preload={true}
          sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={100}
          className="contrast-125 saturate-110 brightness-100 object-cover"
        />
      </div>
      <div className={`flex justify-between items-center`}>
        <span className="font-bold text-xs sm:text-sm 2xl:text-lg">R$: {price}</span>
        <div className={`flex gap-2`}>
          <div className={`flex gap-2 items-center`}>
            <Icon src="/icons/bed-icon.svg" alt="Quartos" />
            <Text type="span">{bedrooms}</Text>
          </div>
          <div className={`flex gap-2 items-center`}>
            <Icon src="/icons/shower-icon.svg" alt="Banheiros" />
            <Text type="span">{bathrooms}</Text>
          </div>
        </div>
      </div>
    </article>
  );
};

const Body: React.FC<DefaultProps> = ({ children }) => {
  return <div className="flex flex-col gap-2 mt-4">{children}</div>;
};

const Title: React.FC<DefaultProps> = ({ children }) => {
  return (
    <SmallTitle className="w-full font-medium line-clamp-2">
      {children}
    </SmallTitle>
  );
};

const Description: React.FC<DefaultProps> = ({ children }) => {
  return (
    <p className="w-full font-light line-clamp-6 text-xs sm:text-sm 2xl:text-lg">
      {children}
    </p>
  );
};

const PropertyCard = {
  Container,
  Header,
  Body,
  Title,
  Description,
};

export default PropertyCard;
