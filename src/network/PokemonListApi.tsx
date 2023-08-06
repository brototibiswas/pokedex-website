import { ApiUtils } from "./ApiUtils";

export namespace PokemonListApi {
  const endpoint = "/pokemon";

  export type Results = {
    name: string;
    url: string;
  };

  export async function getData(): Promise<Results[]> {
    const data = await ApiUtils.getRawDataByEndpoint(endpoint);
    return parseFromData(data.results);
  }

  export function parseFromData(data: any): Results[] {
    const resultArr = ApiUtils.getArrayFromData(data);
    const resultList: Results[] = [];

    resultArr.forEach((element: Results) => {
      const list = {
        name: element.name || "",
        url: element.url || "",
      };
      resultList.push(list);
    });
    console.log(resultList);
    return resultList;
  }
}
