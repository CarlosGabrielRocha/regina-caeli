import DefaultProps from "./props/DefaultProps";

export interface TitleProps extends DefaultProps {
  type?: "h1" | "h2" | "h3";
}

const SmallTitle: React.FC<TitleProps> = ({
  children,
  type,
  className = "",
}) => {
  const styles = "text-xs sm:text-sm md:text-md 2xl:text-lg";
  const Tag = type || "h1";
  return <Tag className={`${styles} ${className}`}>{children}</Tag>;
};

export default SmallTitle;
