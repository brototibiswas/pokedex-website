import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./commonPage.css";
import PokemonDetailHeader from "../component/PokemonDetailHeader/PokemonDetailHeader";
import { useEffect, useState } from "react";
import { PokemonColor, getPokemonColorHex } from "../models/ColorEnum";
import { getPokemonFullDetailByID } from "../network/PokeListApi";
import { Pokemon } from "../models/Pokemon";

const PokemonInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon.AllDetail>();

  const { id } = useParams();
  const numericID = Number(id);

  useEffect(() => {
    // If id is not number, return to previous state or homepage
    if (isNaN(numericID)) {
      navigate(state?.from || "/");
    }
  });

  useEffect(() => {
    getPokemonFullDetailByID(numericID).then((data) => {
      setPokemonDetail(data);
      console.log("general:", data);
    });
  }, [numericID]);

  return (
    <>
      <PokemonDetailHeader
        name={pokemonDetail?.generalInformation.name || ""}
        color={getPokemonColorHex(
          pokemonDetail?.generalInformation.color || PokemonColor.Gray
        )}
        imageURL={pokemonDetail?.generalInformation.imageURL || ""}
        types={pokemonDetail?.generalInformation.types || []}
      />
    </>
  );
};

export default PokemonInfo;
