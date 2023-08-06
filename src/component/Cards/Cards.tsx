import Card from "../Card/Card";
import "./Cards.css";
import { useEffect, useState } from "react";
import { PokemonListApi } from "../../network/PokemonListApi";

const Cards = () => {
  const [pokemonIDList, setPokemonIDList] = useState<number[]>();

  useEffect(() => {
    PokemonListApi.getData().then((data) => {
      setPokemonIDList(
        data.map((pokemon) => {
          let url = pokemon.url.split("/");
          return Number(url[url.length - 2]);
        })
      );
    });
  }, []);

  return (
    <div className="cards-container">
      {pokemonIDList?.map((pokemon) => {
        return <Card key={pokemon} id={pokemon} />;
      })}
    </div>
  );
};

export default Cards;
