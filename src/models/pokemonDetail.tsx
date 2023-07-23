import PokemonType from "./pokemonTypes";

export default interface PokemonDetail {
  name: string;
  id: number;
  imageURL: string;
  types: PokemonType[];
}
