import { createTheme, responsiveFontSizes } from '@mui/material';
import { red } from '@mui/material/colors';

// Create a theme instance.
export const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "Inter",
    fontSize: 14,
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 700
    },
    h3: {
      fontWeight: 700
    },
    h4: {
      fontWeight: 700
    },
    h5: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 700
    },
    
  }
}));

declare module '@mui/material/styles' {
  interface Palette {

  }

  interface PaletteOption {

  }
}
