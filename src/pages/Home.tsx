import { useMemo, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { SearchBar } from "@/components/SearchBar";
import { TypeFilter } from "@/components/TypeFilter";
import { Link } from "react-router";
import { usePokemonList } from "@/hooks/usePokemonList";

function Home() {
  const { pokemonList, loading, error } = usePokemonList(150);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"az" | "za" | "id">("id");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // tipi unici per filtro
  const allTypes = useMemo(() => {
    return Array.from(
      new Set(
        pokemonList.flatMap((pokemon) => pokemon.types.map((t) => t.type.name))
      )
    ).sort();
  }, [pokemonList]);

  // toggle tipo
  const toggleType = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  // gestione ricerca
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // gestione ordinamento
  const handleSortChange = useCallback((sort: "az" | "za" | "id") => {
    setSortBy(sort);
  }, []);

  // filtro + sort combinati
  const filteredPokemon = useMemo(() => {
    return pokemonList
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((pokemon) =>
        selectedTypes.length === 0
          ? true
          : pokemon.types.some((t) => selectedTypes.includes(t.type.name))
      )
      .sort((a, b) => {
        if (sortBy === "az") return a.name.localeCompare(b.name);
        if (sortBy === "za") return b.name.localeCompare(a.name);
        return a.id - b.id;
      });
  }, [pokemonList, searchQuery, selectedTypes, sortBy]);

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Empty className="w-full py-12">
          <EmptyHeader>
            <EmptyTitle>Error Loading Pokémon</EmptyTitle>
            <EmptyDescription>{error}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 mx-auto max-w-md flex flex-col items-center gap-4">
        <h1
          className="font-bold text-4xl md:text-5xl text-center"
          style={{ fontFamily: "'Press Start 2P'" }}
        >
          Pokedex
        </h1>
        <p className="text-xl">Discover your favorite Pokemon</p>

        <SearchBar onSearch={handleSearch} onSortChange={handleSortChange} />

        <TypeFilter
          types={allTypes}
          selectedTypes={selectedTypes}
          onToggle={toggleType}
        />
      </div>

      {loading ? (
        <Empty className="w-full py-12">
          <EmptyHeader>
            <Spinner className="size-8" />
            <EmptyTitle>Loading Pokemon...</EmptyTitle>
            <EmptyDescription>Fetching data from the PokéAPI.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPokemon.map((pokemon) => (
            <Link to={`/detail/${pokemon.id}`} key={pokemon.id}>
              <Card className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <CardDescription>#{pokemon.id}</CardDescription>
                  <CardTitle className="capitalize">{pokemon.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-24 h-24 mx-auto"
                  />

                  <div className="flex gap-2 mt-4 justify-center flex-wrap">
                    {pokemon.types.map(({ type }, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="capitalize"
                      >
                        {type.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
