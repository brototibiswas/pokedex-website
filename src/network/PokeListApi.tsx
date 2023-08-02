import { getPokemonColor } from "../models/ColorEnum";
import PokemonDetail from "../models/pokemonDetail";
import PokemonList from "../models/pokemonList";
import PokemonType from "../models/pokemonTypes";

let baseURL = "https://pokeapi.co/api/v2";

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

// Get pokemon by URL
export async function getPokemon(url: string): Promise<any> {
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error(
      `failed to get response. response status ${response.status}`
    );
  }

  const data = await response.json();
  const speciesResponse = await fetch(data.species?.url || "", {
    method: "GET",
  });
  const speciesData = await speciesResponse.json();

  const promise = fetch(url, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const pokemon: PokemonDetail = {
        id: data.id || 0,
        name: data.name || "",
        imageURL: data.sprites.other["official-artwork"].front_default || "",
        types: getPokemonTypes(data),
        color: getPokemonColor(speciesData.color?.name || ""),
      };
      return pokemon;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return promise;
}

export function getPokemonByID(id: number): Promise<any> {
  var url: string = `${baseURL}/pokemon/${id}`;
  return getPokemon(url);
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
