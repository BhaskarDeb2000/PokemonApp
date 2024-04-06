import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const data = await fetch(url);
        const responseJson = await data.json();
        setPokemonList(responseJson.results);
        setNextUrl(responseJson.next);
        setPrevUrl(responseJson.previous);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData("https://pokeapi.co/api/v2/pokemon");
  }, []);

  const fetchData = async (url: string) => {
    try {
      const data = await fetch(url);
      const responseJson = await data.json();
      setPokemonList(responseJson.results);
      setNextUrl(responseJson.next);
      setPrevUrl(responseJson.previous);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNext = () => {
    if (nextUrl) {
      fetchData(nextUrl);
    }
  };

  const handlePrev = () => {
    if (prevUrl) {
      fetchData(prevUrl);
    }
  };

  return (
    <div className="App">
      <h1 style={{ color: "white" }}>Pokemon Cards</h1>
      <div className="navigation">
        <button onClick={handlePrev} disabled={!prevUrl}>
          Previous
        </button>
        <button onClick={handleNext} disabled={!nextUrl}>
          Next
        </button>
      </div>
      <div className="pokemon-container">
        {pokemonList.map((pokemon: any, index: number) => (
          <PokemonCard key={index} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
}

interface PokemonProps {
  name: string;
}

function PokemonCard({ name }: PokemonProps) {
  const [pokemonData, setPokemonData] = useState<any>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const responseJson = await data.json();
        setPokemonData(responseJson);
      } catch (error) {
        console.error(`Error fetching ${name} data:`, error);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (!pokemonData) {
    return <div className="pokemon-card">Loading...</div>;
  }

  return (
    <div className="pokemon-card">
      <img
        src={pokemonData.sprites.front_default}
        alt={name}
        className="pokemon-image"
      />
      <div className="pokemon-details">
        <div className="pokemon-name">{name}</div>
        <div className="pokemon-type">
          Type:{" "}
          {pokemonData.types.map((type: any) => type.type.name).join(", ")}
        </div>
        <div className="pokemon-abilities">
          Abilities:{" "}
          {pokemonData.abilities
            .map((ability: any) => ability.ability.name)
            .join(", ")}
        </div>
        <div className="pokemon-stats">
          <strong>Stats:</strong>
          {pokemonData.stats.map((stat: any) => (
            <div key={stat.stat.name} className="stat-item">
              {stat.stat.name}: {stat.base_stat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
