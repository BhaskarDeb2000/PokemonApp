import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState([]) as any;
  const [name, setName] = useState([]) as any;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("https://pokeapi.co/api/v2/pokemon");
        const responseJson = await data.json();
        console.log(responseJson);
        setCount(responseJson);
        setName(responseJson.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <p>Total Pokemon {count.count}</p>
      {name.map(function (pokemon: any, i: number) {
        console.log("test");
        return <p>{pokemon.name}</p>;
      })}
    </div>
  );
}

export default App;
