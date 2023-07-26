export enum PokemonColor {
  Red = "red",
  Blue = "blue",
  Yellow = "yellow",
  Green = "green",
  Purple = "purple",
  Pink = "pink",
  Black = "black",
  Gray = "gray",
  White = "white",
  Brown = "brown",
  None = "none",
}

export function getPokemonColor(colorName: string): PokemonColor {
  const values = Object.values(PokemonColor);
  const index = values.indexOf(colorName as PokemonColor);
  const color = values[index] as PokemonColor;
  if (!isPokemonColor(color)) {
    return PokemonColor.None;
  }
  return color;
}

export function getPokemonColorHex(color: PokemonColor): string {
  switch (color) {
    case PokemonColor.Red:
      return "#f7b6c1";
    case PokemonColor.Blue:
      return "#b3e5fc";
    case PokemonColor.Yellow:
      return "#fde0dd";
    case PokemonColor.Green:
      return "#d9f0e3";
    case PokemonColor.Purple:
      return "#e1bee7";
    case PokemonColor.Pink:
      return "#fce4ec";
    case PokemonColor.Black:
      return "#95a5a6";
    case PokemonColor.Gray:
      return "#e0e0e0";
    case PokemonColor.White:
      return "#ffffff"; // Same as the background color
    case PokemonColor.Brown:
      return "#d2b48c";
    case PokemonColor.None:
      return "#000000"; // Set a default color for "None"
  }
}

function isPokemonColor(color: PokemonColor) {
  if (color === undefined) return false;
  return true;
}
