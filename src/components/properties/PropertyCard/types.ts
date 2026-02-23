import DefaultProps from "../../props/DefaultProps";
import { FormattedProperty } from "../../../services/propertyService/types";

export interface PropertyCardProps extends DefaultProps {
  property?: FormattedProperty;
}

export interface PropertyCardHeaderProps extends DefaultProps {
  imgSrc: string;
  imgAlt: string;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
}
