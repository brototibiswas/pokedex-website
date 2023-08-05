import "./Card.css";
import { useEffect, useState } from "react";
import { getPokemonBasicDetail } from "../../network/PokeListApi";
import PokemonBasicDetail from "../../models/pokemonBasicDetail";
import { PokemonColor, getPokemonColorHex } from "../../models/ColorEnum";
import { useNavigate } from "react-router-dom";

interface Props {
  url: string;
}

const Card = ({ url }: Props) => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonBasicDetail>();
  const [types, setTypes] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    getPokemonBasicDetail(url).then((data) => {
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
        backgroundColor: getPokemonColorHex(
          pokemonDetail?.color || PokemonColor.Gray
        ),
      }}
      onClick={() => {
        navigate(`/pokemon/${pokemonDetail?.id}`);
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
