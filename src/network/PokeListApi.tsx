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

import PokemonList from "../models/pokemonList";

let baseURL = "https://pokeapi.co/api/v2";
let endpoint = "pokemon";

function getPokeList(): Promise<PokemonList> {
  return fetch(`${baseURL}/${endpoint}`, { method: "GET" })
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

function isPokemonResultList(data: any): data is PokemonList {
  if (!data || !Array.isArray(data.results)) {
    return false;
  }

  return data.results.every((item: { name: any; url: any }) => {
    return typeof item.name == "string" && typeof item.url == "string";
  });
}

export default getPokeList;
