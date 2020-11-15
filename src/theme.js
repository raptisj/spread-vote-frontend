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
      500: "#19c39c",
      dark: "#2C7A7B",
      soft: "#319795",
      brand: "#19c39c",
      hover: "#16ab89",
    },
    gray: {
      ...theme.colors.gray,
      soft: "#f6f8f9",
      mid: "#e4eaec",
      hover: "#edf2f5",
      midHover: "#d7e6d6",
    },
  },
  borderRadius: {
    ...theme,
    soft: "4px",
    full: "9999px",
  },
};
