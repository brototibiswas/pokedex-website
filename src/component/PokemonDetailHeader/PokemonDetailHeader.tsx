import { Pokemon } from "../../models/Pokemon";
import "./PokemonDetailHeader.css";

interface Props {
  name: string;
  color: string;
  imageURL: string;
  types: Pokemon.Types[];
}

const PokemonDetailHeader = ({ name, color, imageURL, types }: Props) => {
  return (
    <div
      className="pokemonDetailHeaderContainer"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="container-flex-col info-container">
        <h1>{name}</h1>
        <div className="container-flex-row">
          {types.map((type) => (
            <span
              className="btn capsule saturate-200"
              key={type.name}
              style={{ backgroundColor: color }}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="pokemonImage">
        <img src={imageURL} />
      </div>
    </div>
  );
};

export default PokemonDetailHeader;
