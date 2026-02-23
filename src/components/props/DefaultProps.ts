import { ReactNode } from "react";

export default interface DefaultProps {
  children?: ReactNode,
  className?: string,
  onClick?: () => void,
  props?: any
}