import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#039be5",
    },
    secondary: {
      main: "#414141",
    },
  },
});

declare module "@mui/material/styles" {
  interface Theme {
    pallette: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    pallette?: {
      primary?: {
        main?: string;
      };
      secondary?: {
        main?: string;
      };
    };
  }
}
