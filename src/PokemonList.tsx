import React from "react";

export default function PokemonList({ pokemon }: any) {
  return (
    <div>
      {pokemon.map((p: any) => (
        <div key={p}>{p}</div>
      ))}
    </div>
  );
}
