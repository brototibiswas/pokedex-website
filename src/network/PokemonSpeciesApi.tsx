import { PokemonColor, getPokemonColor } from "../models/ColorEnum";
import { ApiUtils } from "./ApiUtils";

export namespace PokemonSpeciesApi {
  const endpoint = "/pokemon-species";

  export type Model = {
    color: PokemonColor;
  };

  export async function getSpeciesDataByID(id: number): Promise<any> {
    const data = await ApiUtils.getRawDataByEndpoint(`${endpoint}/${id}`);
    return parseDataFrom(data);
  }

  export function parseDataFrom(data: any): Model {
    return {
      color: getPokemonColor(data?.color?.name || ""),
    };
  }
}
