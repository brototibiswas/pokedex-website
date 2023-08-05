import "./Card.css";
import { useEffect, useState } from "react";
import { getGeneralInformationByURL } from "../../network/PokeListApi";
import { PokemonColor, getPokemonColorHex } from "../../models/ColorEnum";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../models/Pokemon";

interface Props {
  url: string;
}

const Card = ({ url }: Props) => {
  const [pokemonDetail, setPokemonDetail] =
    useState<Pokemon.GeneralInformation>();
  const [types, setTypes] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    getGeneralInformationByURL(url).then((data) => {
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
    </div>
  );
};

export default Card;
