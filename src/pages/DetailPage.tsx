import { useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { DetailBackButton } from "@/components/DetailBackButton";
import { PokemonMainCard } from "@/components/PokemonMainCard";
import { PokemonDescription } from "@/components/PokemonDescription";
import { PokemonAbilities } from "@/components/PokemonAbilities";
import { PokemonTrainingInfo } from "@/components/PokemonTrainingInfo";
import { PokemonEvolutionChain } from "@/components/PokemonEvolutionChain";
import { PokemonStats } from "@/components/PokemonStats";
import { PokemonSprites } from "@/components/PokemonSprites";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, species, evolutions, loading, error } = usePokemonDetail(id);

  // torna alla home
  const handleBack = useCallback(() => navigate("/"), [navigate]);

  // descrizione in inglese
  const description = useMemo(
    () =>
      species?.flavor_text_entries
        .find((entry) => entry.language.name === "en")
        ?.flavor_text.replace(/\f/g, " "),
    [species]
  );

  // genere in inglese
  const genus = useMemo(
    () => species?.genera.find((g) => g.language.name === "en")?.genus,
    [species]
  );

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <Empty className="w-full py-12">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner className="size-8" />
            </EmptyMedia>
            <EmptyTitle>Loading Pokemon Details...</EmptyTitle>
            <EmptyDescription>
              Fetching detailed information about this Pokemon.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  if (error || !pokemon || !species) {
    return (
      <div className="container mx-auto p-8">
        <DetailBackButton onBack={handleBack} />
        <Empty className="w-full py-12">
          <EmptyHeader>
            <EmptyTitle>Pokemon Not Found</EmptyTitle>
            <EmptyDescription>
              {error || "Unable to load Pokémon details"}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <DetailBackButton onBack={handleBack} />

      <div className="grid gap-6 md:grid-cols-2">
        <PokemonMainCard pokemon={pokemon} genus={genus} />

        <div className="space-y-6 h-full flex flex-col">
          <PokemonDescription description={description} />
          <PokemonAbilities abilities={pokemon.abilities} />
          <PokemonTrainingInfo
            baseExperience={pokemon.base_experience}
            growthRate={species.growth_rate}
            captureRate={species.capture_rate}
            baseHappiness={species.base_happiness}
          />
        </div>
      </div>

      <PokemonEvolutionChain
        evolutions={evolutions}
        currentPokemonId={pokemon.id}
      />
      <PokemonStats stats={pokemon.stats} />
      <PokemonSprites sprites={pokemon.sprites} />
    </div>
  );
}

export default DetailPage;
