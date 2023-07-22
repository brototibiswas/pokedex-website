import "./Card.css";
import jigglypuff from "../../assets/Jigglypuff.png";
import { useEffect, useState } from "react";
import { getPokemon } from "../../network/PokeListApi";
import PokemonDetail from "../../models/pokemonDetail";

interface Props {
  url: string;
}

const Card = ({ url }: Props) => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();

  useEffect(() => {
    getPokemon(url).then((data) => {
      console.log(data);
      setPokemonDetail(data);
    });
  }, [url]);

  return (
    <div className="card">
      <img src={pokemonDetail?.imageURL} />
      <p className="cardHeader" key={pokemonDetail?.id}>
        {pokemonDetail?.name}
      </p>
      <p className="cardCategory">
        <span>Fairy, Normal</span>
      </p>
    </div>
  );
};

export default Card;
