import { PokemonGeneralApi } from "../../network/PokemonGeneralApi";
import "./PokemonDetailHeader.css";

interface Props {
  name: string;
  color: string;
  imageURL: string;
  types: PokemonGeneralApi.Types[];
}

const PokemonDetailHeader = ({ name, color, imageURL, types }: Props) => {
  return (
    <section
      className="pokemonDetails-header-main-container"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="pokemonDetailHeaderContainer">
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
    </section>
  );
};

export default PokemonDetailHeader;
