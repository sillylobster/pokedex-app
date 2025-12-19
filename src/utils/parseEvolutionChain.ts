// prende una catena di evoluzione di un pokemon e restituisce un array di oggetti EvolutionPokemon

import type { EvolutionChain, EvolutionPokemon } from "@/types/pokemon";

export const parseEvolutionChain = async (
  chain: EvolutionChain
): Promise<EvolutionPokemon[]> => {
  const evolutions: EvolutionPokemon[] = [];

  // funzione ricorsiva per attraversare la catena di evoluzione
  const evolutionStep = async (link: EvolutionChain) => {
    // estrai l'id
    const urlParts = link.species.url.split("/");
    const speciesId = urlParts[urlParts.length - 2];

    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${speciesId}`
    );

    if (!pokemonResponse.ok) {
      throw new Error("Failed to fetch evolution data");
    }
    const pokemonData = await pokemonResponse.json();

    // aggiunge pokemon array evoluzioni
    evolutions.push({
      id: parseInt(speciesId),
      name: link.species.name,
      sprite: pokemonData.sprites.other["official-artwork"].front_default,
    });

    for (const evolution of link.evolves_to) {
      await evolutionStep(evolution);
    }
  };

  await evolutionStep(chain);
  return evolutions;
};
