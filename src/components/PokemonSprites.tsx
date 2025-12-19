import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { memo } from "react";
import type { Pokemon } from "@/types/pokemon";

interface PokemonSpritesProps {
  sprites: Pokemon["sprites"];
}

export const PokemonSprites = memo(({ sprites }: PokemonSpritesProps) => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle>Sprites</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <img
            src={sprites.front_default}
            alt="Front"
            className="w-24 h-24 mx-auto"
          />
          <p className="text-sm text-muted-foreground mt-2">Front</p>
        </div>
        <div className="text-center">
          <img
            src={sprites.back_default}
            alt="Back"
            className="w-24 h-24 mx-auto"
          />
          <p className="text-sm text-muted-foreground mt-2">Back</p>
        </div>
        <div className="text-center">
          <img
            src={sprites.front_shiny}
            alt="Shiny Front"
            className="w-24 h-24 mx-auto"
          />
          <p className="text-sm text-muted-foreground mt-2">Shiny</p>
        </div>
        <div className="text-center">
          <img
            src={sprites.back_shiny}
            alt="Shiny Back"
            className="w-24 h-24 mx-auto"
          />
          <p className="text-sm text-muted-foreground mt-2">Shiny Back</p>
        </div>
      </div>
    </CardContent>
  </Card>
));

PokemonSprites.displayName = "PokemonSprites";
