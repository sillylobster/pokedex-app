import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { memo } from "react";
import type { Pokemon } from "@/types/pokemon";

interface PokemonAbilitiesProps {
  abilities: Pokemon["abilities"];
}

export const PokemonAbilities = memo(({ abilities }: PokemonAbilitiesProps) => (
  <Card className="flex-1">
    <CardHeader>
      <CardTitle>Abilities</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {abilities.map(({ ability, is_hidden }) => (
          <div
            key={ability.name}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <span className="capitalize font-medium">
              {ability.name.replace("-", " ")}
            </span>
            {is_hidden && (
              <Badge variant="secondary" className="text-xs">
                Hidden
              </Badge>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
));

PokemonAbilities.displayName = "PokemonAbilities";
