export namespace ApiUtils {
  export async function getJsonDataByURL(url: string): Promise<any> {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(
        `failed to get response. response status ${response.status}`
      );
    }
    return await response.json();
  }

  export function isArray(data: any): boolean {
    return Array.isArray(data);
  }

  export function getArrayFromData(data: any): any[] {
    if (!data || !isArray(data)) {
      return [];
    } else return data;
  }
}
