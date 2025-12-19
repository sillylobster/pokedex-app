import { useState, useEffect } from "react";
import type { Pokemon } from "@/types/pokemon";

export function usePokemonList(limit: number = 150) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch Pokémon list");
        return response.json();
      })
      .then((data) => {
        const promises = data.results.map((pokemon: { url: string }) =>
          fetch(pokemon.url).then((res) => {
            if (!res.ok) throw new Error("Failed to fetch Pokémon details");
            return res.json();
          })
        );
        return Promise.all(promises);
      })
      .then((details) => {
        if (isMounted) {
          setPokemonList(details);
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
  }, [limit]);

  return { pokemonList, loading, error };
}
