import { getPokemonColor } from "../models/ColorEnum";
import PokemonBasicDetail from "../models/pokemonBasicDetail";
import PokemonList from "../models/pokemonList";
import { ApiUtils } from "./ApiUtils";
import { Pokemon } from "../models/Pokemon";

let baseURL = "https://pokeapi.co/api/v2";

// ======== Get pokemon List
export async function getPokemonList(): Promise<PokemonList[]> {
  let url = `${baseURL}/pokemon`;
  const data = await ApiUtils.getJsonDataByURL(url);
  const pokemonRawList = ApiUtils.getArrayFromData(data.results);
  const pokemonParsedList: PokemonList[] = [];

  type model = {
    name: string;
    url: string;
  };

  pokemonRawList.forEach((element: model) => {
    const list = {
      name: element.name || "",
      url: element.url || "",
    };
    pokemonParsedList.push(list);
  });

  return pokemonParsedList;
}

// ======== Get pokemon by URL for Home Screen
export async function getGeneralInformationByURL(
  url: string
): Promise<Pokemon.GeneralInformation> {
  const pokemonData = await ApiUtils.getJsonDataByURL(url);
  const speciesData = await ApiUtils.getJsonDataByURL(pokemonData.species.url);
  return getPokemonBasicDetailFromData(pokemonData, speciesData);
}

// Get Pokemon Details by ID
export async function getPokemonFullDetailByID(
  id: number
): Promise<Pokemon.AllDetail> {
  var url: string = `${baseURL}/pokemon/${id}`;
  const pokemonData = await ApiUtils.getJsonDataByURL(url);
  const speciesData = await ApiUtils.getJsonDataByURL(pokemonData.species.url);
  const basicDetail = getPokemonBasicDetailFromData(pokemonData, speciesData);
  const statDetails = getPokemonStatsFromStatData(pokemonData.stats);

  return {
    generalInformation: basicDetail,
    stat: statDetails || [],
  };
}

// =================================================================

function getPokemonTypes(data: any): Pokemon.Types[] {
  if (!ApiUtils.isArray(data.types)) {
    return [];
  }

  const types: Pokemon.Types[] = [];

  data.types.forEach((element: { type?: { name?: string; url?: string } }) => {
    const pokemonType: Pokemon.Types = {
      name: element.type?.name || "",
      url: element.type?.url || "",
    };
    types.push(pokemonType);
  });

  return types;
}

function getPokemonStatsFromStatData(data: any): Pokemon.Stat[] {
  if (!data || !ApiUtils.isArray(data)) {
    return [];
  }

  type model = {
    base_stat?: Number;
    stat: {
      name?: string;
    };
  };

  let stats: Pokemon.Stat[] = [];

  data.forEach((element: model) => {
    const stat: Pokemon.Stat = {
      baseValue: element.base_stat || 0,
      name: element.stat.name || "",
    };
    stats.push(stat);
  });

  return stats;
}

function getPokemonBasicDetailFromData(
  pokemonData: any,
  speciesData: any
): Pokemon.GeneralInformation {
  const data: Pokemon.GeneralInformation = {
    id: pokemonData.id || 0,
    name: pokemonData.name || "",
    imageURL: pokemonData.sprites.other["official-artwork"].front_default || "",
    types: getPokemonTypes(pokemonData),
    color: getPokemonColor(speciesData.color?.name || ""),
    height: pokemonData?.height || 0,
    weight: pokemonData?.weight || 0,
    baseExperience: pokemonData?.base_experience || 0,
  };
  return data;
}
