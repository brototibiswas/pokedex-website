import { useParams } from "react-router-dom";
import PokemonDetailHeader from "../component/PokemonDetailHeader/PokemonDetailHeader";

const PokemonDetail = () => {
  const { id } = useParams();

  return (
    <>
      <PokemonDetailHeader />
    </>
  );
};

export default PokemonDetail;
