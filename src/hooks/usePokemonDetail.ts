import { useState, useEffect } from "react";
import type {
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  EvolutionPokemon,
} from "@/types/pokemon";
import { parseEvolutionChain } from "@/utils/parseEvolutionChain";

export function usePokemonDetail(id: string | undefined) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutions, setEvolutions] = useState<EvolutionPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Pokémon");
        return res.json();
      }),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Pokémon species");
        return res.json();
      }),
    ])
      .then(async ([pokemonData, speciesData]) => {
        if (!isMounted) return;

        setPokemon(pokemonData);
        setSpecies(speciesData);

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        if (!evolutionResponse.ok)
          throw new Error("Failed to fetch evolution chain");

        const evolutionData: { chain: EvolutionChain } =
          await evolutionResponse.json();
        const evolutionList = await parseEvolutionChain(evolutionData.chain);

        if (isMounted) {
          setEvolutions(evolutionList);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { pokemon, species, evolutions, loading, error };
}
