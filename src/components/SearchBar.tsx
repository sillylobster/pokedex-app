import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { memo } from "react";

type SearchBarProps = {
  onSearch: (value: string) => void;
  onSortChange: (value: "az" | "za" | "id") => void;
};

function SearchBarComponent({ onSearch, onSortChange }: SearchBarProps) {
  return (
    <div className="flex w-full max-w-md gap-2">
      <Input
        type="search"
        placeholder="Search Pokemon..."
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* pulsante filtro */}
      <Select onValueChange={onSortChange} defaultValue="id">
        <SelectTrigger className="w-35 cursor-pointer">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            <SelectItem value="id" className="cursor-pointer">
              ID
            </SelectItem>
            <SelectItem value="az" className="cursor-pointer">
              Name A–Z
            </SelectItem>
            <SelectItem value="za" className="cursor-pointer">
              Name Z–A
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export const SearchBar = memo(SearchBarComponent);
SearchBar.displayName = "SearchBar";
