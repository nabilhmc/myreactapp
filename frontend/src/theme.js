import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        // palette values for light mode
        myColor: {
          main: "#F6F9FC"
        },

        bg: {
          main: "#F6F6F6"
        },
     
        ckeckout :{
          main: "#F6F9FC"
        },

        paper : {
          main : "#f5f9fc"
        },

        artcolor: {
          main: "#0F3460"
        },
        icon :{
          main : "#D34136"
        },

        card : {
          main : "#2B3445"
        },

        product: {
          main: "#FFF"
        },



        neutral: {
          main: "#64748B",
        },

        favColor: {
          main: grey[300],
        },
      }
      : {
        // palette values for dark mode
        myColor: {
          main: "#252b32"
        },

        card : {
          main : "#FFF"
        },
      

        bg: {
          main: "#1D2021",
        },

        paper : {
          main : "#1D2021"
        },


        ckeckout :{
          main: "#1D2021"
        },

        icon :{
          main : "#FFF"
        },

        product : {
          main : "#353535"
         },


        artcolor: {
          main: "#FFF"
        },

        neutral: {
          main: "#64748B",
        },

        favColor: {
          main: grey[800],
        },
      }),
  },
});

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};