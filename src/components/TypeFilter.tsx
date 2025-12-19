import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { memo } from "react";

type TypeFilterProps = {
  types: string[];
  selectedTypes: string[];
  onToggle: (type: string) => void;
};

function TypeFilterComponent({
  types,
  selectedTypes,
  onToggle,
}: TypeFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {types.map((type) => {
        const active = selectedTypes.includes(type);

        return (
          <Badge
            key={type}
            onClick={() => onToggle(type)}
            className={clsx(
              "cursor-pointer capitalize hover:bg-primary hover:text-primary-foreground",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {type}
          </Badge>
        );
      })}
    </div>
  );
}

export const TypeFilter = memo(TypeFilterComponent);
TypeFilter.displayName = "TypeFilter";
