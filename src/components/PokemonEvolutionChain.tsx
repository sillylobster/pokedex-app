import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { memo } from "react";
import type { EvolutionPokemon } from "@/types/pokemon";

interface PokemonEvolutionChainProps {
  evolutions: EvolutionPokemon[];
  currentPokemonId: number;
}

export const PokemonEvolutionChain = memo(
  ({ evolutions, currentPokemonId }: PokemonEvolutionChainProps) => {
    // se non ci sono evoluzioni non mostrare nulla
    if (evolutions.length <= 1) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Evolution Chain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center flex-wrap gap-4">
            {evolutions.map((evo, index) => (
              <div key={evo.id} className="flex items-center gap-4">
                <Link to={`/detail/${evo.id}`}>
                  <div
                    className={`text-center p-4 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-lg ${
                      evo.id === currentPokemonId
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={evo.sprite}
                      alt={evo.name}
                      className="w-24 h-24 mx-auto"
                    />
                    <p className="text-sm font-medium capitalize mt-2">
                      {evo.name}
                    </p>
                  </div>
                </Link>
                {/* mostra la freccia solo se non è l'ultimo elemento */}
                {index < evolutions.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

PokemonEvolutionChain.displayName = "PokemonEvolutionChain";
