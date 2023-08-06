import { ApiUtils } from "./ApiUtils";

export namespace PokemonGeneralApi {
  const endpoint = "/pokemon";

  export type Model = {
    name: string;
    id: number;
    imageURL: string;
    types: Types[];
    stats: Stat[];
    height: number;
    weight: number;
    baseExperience: number;
  };

  export type Types = {
    name: string;
    url: string;
  };

  export type Stat = {
    name: string;
    baseValue: Number;
  };

  export async function getDataByID(id: number): Promise<Model> {
    const data = await ApiUtils.getRawDataByEndpoint(`${endpoint}/${id}`);
    return parseFromData(data);
  }

  function getPokemonTypes(data: any): Types[] {
    const typeData = ApiUtils.getArrayFromData(data);
    const types: Types[] = [];

    typeData.forEach((element: { type?: { name?: string; url?: string } }) => {
      const pokemonType: Types = {
        name: element.type?.name || "",
        url: element.type?.url || "",
      };
      types.push(pokemonType);
    });

    return types;
  }

  function getPokemonStats(data: any): Stat[] {
    const statData = ApiUtils.getArrayFromData(data);
    const stats: Stat[] = [];

    statData.forEach((element: { name?: string; base_stat?: number }) => {
      const stat: Stat = {
        baseValue: element.base_stat || 0,
        name: element.name || "",
      };
      stats.push(stat);
    });

    return stats;
  }

  export function parseFromData(data: any): Model {
    const pokemonData: Model = {
      id: data?.id || 0,
      name: data?.name || "",
      imageURL: data?.sprites?.other["official-artwork"]?.front_default || "",
      types: getPokemonTypes(data.types),
      stats: getPokemonStats(data.stats),
      height: data?.height || 0,
      weight: data?.weight || 0,
      baseExperience: data?.base_experience || 0,
    };
    return pokemonData;
  }
}
