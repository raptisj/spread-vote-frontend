import { extendTheme } from "@chakra-ui/react"

const colors = {
  red: {
    customRed: "#e9494f",
    hover: "#c52335",
  },
  black: {
    soft: "#717277",
    semiSoft: "#27292d",
    dark: "#011627",
  },
  white: "#fff",
  green: {
    500: "#19c39c",
    dark: "#2C7A7B",
    soft: "#319795",
    brand: "#19c39c",
    hover: "#16ab89",
  },
  gray: {
    soft: "#f6f8f9",
    mid: "#e4eaec",
    hover: "#edf2f5",
    midHover: "#d7e6d6",
  },
  // none active
  brand: "#19c39c",
  primary: "#19c39c",
  secondary: "",
  danger: "#e9494f",
  warning: "",
  link: "",
  text: "",
  textLight: "",
  heading: "",
  // brand: {
  // },
  hover: {
    primary: "#16ab89",
    secondary: "",
    danger: "#c52335",
  }
}

export default extendTheme({ colors })

// export default extendTheme({
//   ...theme,
//   // breakpoints: ["500px", "900px"],
//   colors: {
//     ...theme.colors,
//     transparent: "transparent",
//     black: {
//       ...theme,
//       soft: "#717277",
//       semiSoft: "#27292d",
//       dark: "#011627",
//     },
//     white: "#fff",
//     red: {
//       // ...extendTheme.colors.red,
//       customRed: "#e9494f",
//       hover: "#c52335",
//     },
//     green: {
//       // ...extendTheme.colors.green,
//       500: "#19c39c",
//       dark: "#2C7A7B",
//       soft: "#319795",
//       brand: "#19c39c",
//       hover: "#16ab89",
//     },
//     gray: {
//       // ...extendTheme.colors.gray,
//       soft: "#f6f8f9",
//       mid: "#e4eaec",
//       hover: "#edf2f5",
//       midHover: "#d7e6d6",
//     },
//   },
//   borderRadius: {
//     ...theme,
//     soft: "4px",
//     full: "9999px",
//   },
// });
