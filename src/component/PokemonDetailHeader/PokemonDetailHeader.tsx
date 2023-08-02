import "./PokemonDetailHeader.css";

interface Props {
  name: string;
  color: string;
  imageURL: string;
}

const PokemonDetailHeader = ({ name, color, imageURL }: Props) => {
  return (
    <div className="pokemonDetailHeaderContainer">
      <div
        className="topBar"
        style={{
          backgroundColor: color,
        }}
      >
        <h1>{name}</h1>
        <div className="pokemonImage">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailHeader;
