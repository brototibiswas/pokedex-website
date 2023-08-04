import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./commonPage.css";
import PokemonDetailHeader from "../component/PokemonDetailHeader/PokemonDetailHeader";
import { useEffect, useState } from "react";
import { PokemonColor, getPokemonColorHex } from "../models/ColorEnum";
import PokemonDetail from "../models/pokemonDetail";
import { getPokemonByID } from "../network/PokeListApi";
import { types } from "sass";

const PokemonInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();

  const { id } = useParams();
  const numericID = Number(id);

  useEffect(() => {
    // If id is not number, return to previous state or homepage
    if (isNaN(numericID)) {
      navigate(state?.from || "/");
    }
  });

  useEffect(() => {
    getPokemonByID(numericID).then((data) => {
      setPokemonDetail(data);
    });
  }, [numericID]);

  return (
    <>
      <PokemonDetailHeader
        name={pokemonDetail?.name || ""}
        color={getPokemonColorHex(pokemonDetail?.color || PokemonColor.Gray)}
        imageURL={pokemonDetail?.imageURL || ""}
        types={pokemonDetail?.types || []}
      />
    </>
  );
};

export default PokemonInfo;
