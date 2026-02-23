import Icon from "../icons/Icon";
import Text from "../Text";

interface EmptyPropertiesProps {
  title?: string;
  description?: string;
}

export default function EmptyProperties({
  title = "Nenhum imóvel encontrado",
  description = "Tente ajustar seus filtros para encontrar o que procura.",
}: EmptyPropertiesProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 col-span-full">
      <Icon
        src="/icons/search-icon.svg"
        size="big"
        alt={title}
        className="opacity-50 size-16"
      />
      <div className="flex flex-col items-center gap-1 text-center">
        <Text size="big" className="font-semibold text-white">
          {title}
        </Text>
        <Text size="small" className="text-neutral-400 font-light">
          {description}
        </Text>
      </div>
    </div>
  );
}
