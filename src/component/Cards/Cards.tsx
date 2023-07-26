import Card from "../Card/Card";
import { getPokeList } from "../../network/PokeListApi";
import "./Cards.css";
import { useEffect, useState } from "react";

const Cards = () => {
  const [pokemonURLList, setpokemonURLList] = useState<string[]>();
  const [isError, setIsError] = useState<Boolean>();

  useEffect(() => {
    getPokeList()
      .then((data) => {
        setpokemonURLList(
          data.results.map((pokemon) => {
            return pokemon.url;
          })
        );
      })
      .catch((error) => {
        setIsError(true);
      });
    return () => {};
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
