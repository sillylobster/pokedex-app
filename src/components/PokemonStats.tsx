import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { memo } from "react";
import type { Pokemon } from "@/types/pokemon";

interface PokemonStatsProps {
  stats: Pokemon["stats"];
}

export const PokemonStats = memo(({ stats }: PokemonStatsProps) => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle>Base Stats</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {stats.map(({ stat, base_stat }) => (
          <div key={stat.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="capitalize font-medium">
                {stat.name.replace("-", " ")}
              </span>
              <span className="font-bold">{base_stat}</span>
            </div>
            {/* 255 livello massimo possibile */}
            <Progress value={(base_stat / 255) * 100} />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
));

PokemonStats.displayName = "PokemonStats";
