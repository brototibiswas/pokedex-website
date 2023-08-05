import { PokemonColor } from "./ColorEnum";
import PokemonType from "./pokemonTypes";

export default interface PokemonBasicDetail {
  name: string;
  id: number;
  imageURL: string;
  types: PokemonType[];
  color: PokemonColor;
}
