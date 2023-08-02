import { useLocation, useNavigate, useParams } from "react-router-dom";
import PokemonDetailHeader from "../component/PokemonDetailHeader/PokemonDetailHeader";
import { useEffect } from "react";

const PokemonDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { id } = useParams();
  const numericID = Number(id);

  useEffect(() => {
    // If id is not number, return to previous state or homepage
    if (isNaN(numericID)) {
      navigate(state?.from || "/");
    }
  });

  return (
    <>
      <PokemonDetailHeader id={numericID} />
    </>
  );
};

export default PokemonDetail;
