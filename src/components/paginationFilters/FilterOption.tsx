import { cn } from "@/lib/utils";
import Text from "../Text";
import Icon from "../icons/Icon";
import { FilterInput } from "./FilterInput";
import { FilterOptionProps } from "./types";

export function FilterOption(props: FilterOptionProps) {
  const { children, className, onClick, open, setOpen } = props;

  return (
    <div>
      <div
        className={cn(
          "group flex items-center justify-between p-2 3xl:p-3 hover:bg-highlight-gray transition-all font-light cursor-pointer z-40",
          open && "bg-primary hover:bg-secondary cursor-default",
          className
        )}
        onClick={onClick}
      >
        <span className="font-light text-xs md:text-sm 2xl:text-md 3xl:text-xl">{children}</span>
        <Icon
          className="size-3 3xl:size-4.5 group-hover:translate-x-2 group-hover:scale-90 group-hover:mr-1 transition-all"
          src="/icons/carousel-rightarrow-icon.svg"
          alt="Seta para direita"
        />
      </div>
      <FilterInput {...props} open={open} setOpen={setOpen} />
    </div>
  );
}
