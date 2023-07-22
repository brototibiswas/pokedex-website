// interface Pokemon {
//   id: number;
//   name: string;
//   types: Array<type> = [

//   ]
//     slot: number,
//     type: Array<{
//         name: string
//         url: string
//     }
//   }
// }

import PokemonDetail from "../models/pokemonDetail";
import PokemonList from "../models/pokemonList";

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

export function getPokemon(url: string): Promise<any> {
  console.log(url);
  const promise = fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `failed to get response. response status ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      const pokemon: PokemonDetail = {
        id: data.id || 0,
        name: data.name || "",
        imageURL: data.sprites.other["official-artwork"].front_default || "",
      };
      return pokemon;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return promise;
}

function isPokemonResultList(data: any): data is PokemonList {
  if (!data || !Array.isArray(data.results)) {
    return false;
  }

  return data.results.every((item: { name: any; url: any }) => {
    return typeof item.name == "string" && typeof item.url == "string";
  });
}
