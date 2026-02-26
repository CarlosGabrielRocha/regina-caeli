import { Dispatch, SetStateAction } from "react";
import DefaultProps from "../props/DefaultProps";

export type TagType = "city" | "state" | "minPrice" | "maxPrice" | "bedrooms" | "bathrooms" | "createdDate";

export interface FilterButtonProps extends DefaultProps {}

export interface FilterInputProps extends DefaultProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "price";
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface FilterOptionsProps extends DefaultProps {
  open?: boolean;
  activeFilter: TagType | null;
  setActiveFilter: Dispatch<SetStateAction<TagType | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface FilterOptionProps extends FilterInputProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface FilterTagProps extends DefaultProps {
  type: TagType;
  handleTagEdit?: () => void;
  handleTagDelete: () => void;
}

export enum FilterTagType {
  city = "cidade",
  state = "estado",
  minPrice = "min",
  maxPrice = "max",
  bedrooms = "quartos",
  bathrooms = "banheiros",
  createdDate = "criação",
}