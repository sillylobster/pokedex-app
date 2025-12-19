import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, Target, Heart } from "lucide-react";
import { memo } from "react";
import type { Pokemon, PokemonSpecies } from "@/types/pokemon";

interface PokemonTrainingInfoProps {
  baseExperience: Pokemon["base_experience"];
  growthRate: PokemonSpecies["growth_rate"];
  captureRate: PokemonSpecies["capture_rate"];
  baseHappiness: PokemonSpecies["base_happiness"];
}

export const PokemonTrainingInfo = memo(
  ({
    baseExperience,
    growthRate,
    captureRate,
    baseHappiness,
  }: PokemonTrainingInfoProps) => (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Training Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Trophy className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Base Exp</p>
              <p className="text-xl font-bold">{baseExperience}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Growth</p>
              <p className="text-sm font-semibold capitalize">
                {growthRate.name.replace("-", " ")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Capture</p>
              <p className="text-xl font-bold">{captureRate}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Happiness</p>
              <p className="text-xl font-bold">{baseHappiness}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
);

PokemonTrainingInfo.displayName = "PokemonTrainingInfo";
