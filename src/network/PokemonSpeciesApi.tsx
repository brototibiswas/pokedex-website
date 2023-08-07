import { PokemonColor, getPokemonColor } from "../models/ColorEnum";
import { ApiUtils } from "./ApiUtils";

export namespace PokemonSpeciesApi {
  const endpoint = "/pokemon-species";

  export type Model = {
    color: PokemonColor;
    description: string;
  };

  export async function getSpeciesDataByID(id: number): Promise<any> {
    const data = await ApiUtils.getRawDataByEndpoint(`${endpoint}/${id}`);
    return parseDataFrom(data);
  }

  function getDescriptionFromFlavorText(data: any): string {
    const textArr = ApiUtils.getArrayFromData(data);
    for (const entry of textArr) {
      if (entry?.language?.name === "en") {
        let retrievedText = ApiUtils.formatToPlainText(
          entry?.flavor_text,
          "No description found"
        );
        return retrievedText;
        break;
      }
    }
    return "No description found";
  }

  export function parseDataFrom(data: any): Model {
    return {
      color: getPokemonColor(data?.color?.name || ""),
      description: getDescriptionFromFlavorText(data?.flavor_text_entries),
    };
  }
}
