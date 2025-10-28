import DefaultProps from "./DefaultProps";

export interface PropertyCardHeaderProps extends DefaultProps {
  imgSrc: string,
  imgAlt: string,
  price: string,
  bedrooms: number,
  bathrooms: number
}