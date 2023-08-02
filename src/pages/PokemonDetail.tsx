import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const { id } = useParams();

  return <div>PokemonDetail {id} </div>;
};

export default PokemonDetail;
