import "./Card.css";
import { useEffect, useState } from "react";
import { PokemonColor, getPokemonColorHex } from "../../models/ColorEnum";
import { useNavigate } from "react-router-dom";
import { PokemonGeneralApi } from "../../network/PokemonGeneralApi";
import { PokemonSpeciesApi } from "../../network/PokemonSpeciesApi";

interface Props {
  id: number;
}

const Card = ({ id }: Props) => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonGeneralApi.Model>();
  const [types, setTypes] = useState<string>();
  const [speciesData, setSpeciesData] = useState<PokemonSpeciesApi.Model>();
  const navigate = useNavigate();

  useEffect(() => {
    PokemonGeneralApi.getDataByID(id).then((data) => {
      setPokemonDetail(data);
    });
  }, [id]);

  useEffect(() => {
    PokemonSpeciesApi.getSpeciesDataByID(id).then((data) => {
      setSpeciesData(data);
    });
  }, [id]);

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
          speciesData?.color || PokemonColor.Gray
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
