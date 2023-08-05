import { PokemonColor } from "./ColorEnum";

export namespace Pokemon {
  export interface SpeciesDetail {}

  export interface Stat {
    name: string;
    baseValue: Number;
  }

  export interface Types {
    name: string;
    url: string;
  }

  export interface GeneralInformation {
    name: string;
    id: number;
    imageURL: string;
    types: Types[];
    color: PokemonColor;
    height: number;
    weight: number;
    baseExperience: number;
  }

  export interface AllDetail {
    generalInformation: GeneralInformation;
    stat: Stat[];
  }
}
