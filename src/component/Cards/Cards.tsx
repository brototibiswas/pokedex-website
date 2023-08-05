import Card from "../Card/Card";
import { getPokemonList } from "../../network/PokeListApi";
import "./Cards.css";
import { useEffect, useState } from "react";

const Cards = () => {
  const [pokemonURLList, setpokemonURLList] = useState<string[]>();

  useEffect(() => {
    getPokemonList().then((data) => {
      setpokemonURLList(
        data.map((pokemon) => {
          return pokemon.url;
        })
      );
    });
  });

  return (
    <div className="cards-container">
      {pokemonURLList?.map((pokemon) => {
        return <Card key={pokemon} url={pokemon} />;
      })}
    </div>
  );
};

export default Cards;
