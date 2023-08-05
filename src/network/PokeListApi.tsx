import { getPokemonColor } from "../models/ColorEnum";
import PokemonDetail from "../models/PokemonDetail";
import PokemonBasicDetail from "../models/pokemonBasicDetail";
import PokemonList from "../models/pokemonList";
import PokemonType from "../models/pokemonTypes";

let baseURL = "https://pokeapi.co/api/v2";

// Get pokemon List
export function getPokeList(): Promise<PokemonList> {
  return fetch(`${baseURL}/pokemon`, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `failed to get response. response status ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      if (!isPokemonResultList(data)) {
        throw new Error("parsing error!");
      }
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

// Get pokemon by URL for Home Screen
export async function getPokemonBasicDetail(
  url: string
): Promise<PokemonBasicDetail> {
  const pokemonData = await getJsonDataByURL(url);
  const speciesData = await getJsonDataByURL(pokemonData.species.url);
  return getPokemonBasicDetailFromData(pokemonData, speciesData);
}

// Get Pokemon Details by ID
export async function getPokemonFullDetailByID(
  id: number
): Promise<PokemonDetail> {
  var url: string = `${baseURL}/pokemon/${id}`;
  const pokemonData = await getJsonDataByURL(url);
  const speciesData = await getJsonDataByURL(pokemonData.species.url);
  const basicDetail = getPokemonBasicDetailFromData(pokemonData, speciesData);

  return {
    generalInformation: basicDetail,
  };
}

// =================================================================

async function getJsonDataByURL(url: string): Promise<any> {
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error(
      `failed to get response. response status ${response.status}`
    );
  }
  return await response.json();
}

function isPokemonResultList(data: any): data is PokemonList {
  if (!data || !Array.isArray(data.results)) {
    return false;
  }

  return data.results.every((item: { name: any; url: any }) => {
    return typeof item.name == "string" && typeof item.url == "string";
  });
}

function getPokemonTypes(data: any): PokemonType[] {
  if (!Array.isArray(data.types)) {
    return [];
  }

  const types: PokemonType[] = [];

  data.types.forEach((element: { type?: { name?: string; url?: string } }) => {
    console.log(element.type);
    const pokemonType: PokemonType = {
      name: element.type?.name || "",
      url: element.type?.url || "",
    };
    types.push(pokemonType);
  });

  return types;
}

function getPokemonBasicDetailFromData(
  pokemonData: any,
  speciesData: any
): PokemonBasicDetail {
  const pokemon: PokemonBasicDetail = {
    id: pokemonData.id || 0,
    name: pokemonData.name || "",
    imageURL: pokemonData.sprites.other["official-artwork"].front_default || "",
    types: getPokemonTypes(pokemonData),
    color: getPokemonColor(speciesData.color?.name || ""),
  };
  return pokemon;
}
