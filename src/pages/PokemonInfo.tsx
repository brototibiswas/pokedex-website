import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./commonPage.css";
import PokemonDetailHeader from "../component/PokemonDetailHeader/PokemonDetailHeader";
import { useEffect, useState } from "react";
import { PokemonColor, getPokemonColorHex } from "../models/ColorEnum";
import { PokemonGeneralApi } from "../network/PokemonGeneralApi";
import { PokemonSpeciesApi } from "../network/PokemonSpeciesApi";

const PokemonInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pokemonDetail, setPokemonDetail] = useState<PokemonGeneralApi.Model>();
  const [speciesData, setSpeciesData] = useState<PokemonSpeciesApi.Model>();

  const { id } = useParams();
  const numericID = Number(id);

  useEffect(() => {
    // If id is not number, return to previous state or homepage
    if (isNaN(numericID)) {
      navigate(state?.from || "/");
    }
  });

  useEffect(() => {
    PokemonGeneralApi.getDataByID(numericID).then((data) => {
      setPokemonDetail(data);
    });
    PokemonSpeciesApi.getSpeciesDataByID(numericID).then((data) => {
      setSpeciesData(data);
    });
  }, [numericID]);

  return (
    <>
      <PokemonDetailHeader
        name={pokemonDetail?.name || ""}
        color={getPokemonColorHex(speciesData?.color || PokemonColor.Gray)}
        imageURL={pokemonDetail?.imageURL || ""}
        types={pokemonDetail?.types || []}
      />
    </>
  );
};

export default PokemonInfo;
