import Icon from "../icons/Icon";
import Text from "../Text";
import { FilterTagProps, FilterTagType } from "./types";

export function FilterTag({
  children,
  type,
  handleTagEdit,
  handleTagDelete,
}: FilterTagProps) {
  return (
    <div className="group relative flex flex-col justify-end max-w-30 lg:max-w-70 mb-3 cursor-pointer shadow-md">
      <div className="absolute right-0 -top-7 h-20 w-full items-start lg:opacity-30 lg:hover:opacity-100 transition-all">
        <div className="flex gap-2 backdrop-blur-xs p-1 rounded w-fit">
          <button
            className="hover:translate-y-0.5 transition-all"
            onClick={handleTagDelete}
          >
            <Icon
              size="smaller"
              src="/icons/delete-icon.svg"
              alt="Remover filtro"
            />
          </button>
          {handleTagEdit && (
            <button
              className="hover:translate-y-0.5 transition-all"
              onClick={handleTagEdit}
            >
              <Icon
                size="smaller"
                src="/icons/edit-icon.svg"
                alt="Editar filtro"
              />
            </button>
          )}
        </div>
      </div>
      <button>
        <span
          className="bg-highlight/30 border rounded-sm px-2 py-1 max-w-40 truncate block text-start text-xs lg:text-sm 2xl:text-md"
        >
          <span className="font-bold">{FilterTagType[type]}: </span>
          <span className="font-light">{children}</span>
        </span>
      </button>
    </div>
  );
}
