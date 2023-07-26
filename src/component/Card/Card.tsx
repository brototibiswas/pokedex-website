import "./Card.css";
import { useEffect, useState } from "react";
import { getPokemon } from "../../network/PokeListApi";
import PokemonDetail from "../../models/pokemonDetail";
import { getPokemonColorHex } from "../../models/ColorEnum";

interface Props {
  url: string;
}

const Card = ({ url }: Props) => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();
  const [types, setTypes] = useState<string>();

  useEffect(() => {
    getPokemon(url).then((data) => {
      setPokemonDetail(data);
    });
  }, [url]);

  useEffect(() => {
    const pokemonTypes = pokemonDetail?.types || [];
    let typeName = "";
    pokemonDetail?.types.forEach((entry, index) => {
      typeName += entry.name;
      if (index != pokemonTypes.length - 1) {
        typeName += ", ";
      }
    });
    setTypes(typeName);
  }, [pokemonDetail]);

  return (
    <div
      className="card"
      style={{
        backgroundColor: getPokemonColorHex(pokemonDetail?.color),
      }}
    >
      <img src={pokemonDetail?.imageURL} />
      <p className="cardHeader" key={pokemonDetail?.id}>
        {pokemonDetail?.name}
      </p>
      <p className="cardCategory">{types}</p>
      <p className="cardCategory">{pokemonDetail?.color}</p>
    </div>
  );
};

export default Card;
