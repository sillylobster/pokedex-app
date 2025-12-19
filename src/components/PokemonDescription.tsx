import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { memo } from "react";

interface PokemonDescriptionProps {
  description?: string;
}

export const PokemonDescription = memo(
  ({ description }: PokemonDescriptionProps) => (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
);

PokemonDescription.displayName = "PokemonDescription";
