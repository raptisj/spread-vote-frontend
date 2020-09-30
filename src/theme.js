import { theme } from "@chakra-ui/core";

export default {
  ...theme,
  breakpoints: ["500px", "900px"],
  colors: {
    ...theme.colors,
    transparent: "transparent",
    black: {
      ...theme,
      soft: "#717277",
      semiSoft: "#27292d",
      dark: "#011627",
    },
    white: "#fff",
    red: {
      ...theme.colors.red,
      customRed: "#e9494f",
      hover: "#c52335",
    },
    green: {
      ...theme.colors.green,
      dark: "#2C7A7B",
      soft: "#319795",
      brand: "#19c39c",
      hover: "#16ab89",
    },
    gray: {
      ...theme.colors.gray,
      soft: "#f6f8f9",
      hover: "#edf2f5",
    },
  },
  borderRadius: {
    soft: "4px",
    full: "9999px",
  },
};
