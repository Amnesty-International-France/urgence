import { colors } from "../../../front/src/themes/colors";

export const positionChoices = [
  { id: "top", name: "Top" },
  { id: "bottom", name: "Bottom" }
];

export const colorChoices = Object.keys(colors).map(colorName => ({
  id: colorName,
  name: colors[colorName]
}));
