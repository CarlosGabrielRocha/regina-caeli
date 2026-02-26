import Text from "./Text";
import Image from "next/image";

interface InfoCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  variant?: "default" | "highlight";
}

export default function InfoCard({
  iconSrc,
  iconAlt,
  title,
  description,
  variant = "default",
}: InfoCardProps) {
  const bgClass =
    variant === "highlight"
      ? "bg-highlight"
      : "bg-gradient-to-b from-primary to-secondary";

  return (
    <div
      className={`flex flex-col items-center justify-between gap-5 max-w-70 px-3 py-4 md:py-7 border rounded-md shadow-lg h-55 md:h-70 2xl:h-80 ${bgClass}`}
    >
      <div className="relative size-20 2xl:size-25">
        <Image
          src={iconSrc}
          alt={iconAlt}
          fill
          sizes="(max-width: 768px) 3.75rem, (max-width: 1536px) 5rem, 6.25rem"
        />
      </div>
      <div className="space-y-3 text-center">
        <Text type="h1" className="font-bold" size="big">
          {title}
        </Text>
        <Text size="small" className="text-center font-normal">
          {description}
        </Text>
      </div>
    </div>
  );
}
