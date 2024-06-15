import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0A0A0A',
    },
    secondary: {
      main: '#2C2A2A',
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Poppins', sans-serif",
      textTransform: "none",
    },
},
});

export default theme;
