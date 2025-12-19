import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Weight } from "lucide-react";
import { memo } from "react";
import type { Pokemon } from "@/types/pokemon";

interface PokemonMainCardProps {
  pokemon: Pokemon;
  genus?: string;
}

export const PokemonMainCard = memo(
  ({ pokemon, genus }: PokemonMainCardProps) => (
    <Card>
      <CardHeader>
        <CardDescription>#{pokemon.id}</CardDescription>
        <CardTitle className="text-3xl capitalize">{pokemon.name}</CardTitle>
        {genus && <p className="text-sm text-muted-foreground">{genus}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-64 h-64 mx-auto"
        />

        <div className="flex gap-2 justify-center flex-wrap">
          {pokemon.types.map(({ type }) => (
            <Badge
              key={type.name}
              variant="outline"
              className="capitalize text-base px-4 py-1"
            >
              {type.name}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-semibold">{pokemon.height / 10} m</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-semibold">{pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
);

PokemonMainCard.displayName = "PokemonMainCard";
