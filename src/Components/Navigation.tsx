import React from "react";
import Logo from "./Logo";
import { Button, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const theme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          background: "#000",
          height: "100px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 10px",
        },
      },
    },
  },
});

const Navigation: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid>
        <Link to="/">
          <Logo />
        </Link>
        <Link to="auth">
          <Button variant="contained">Login</Button>
        </Link>
      </Grid>
    </ThemeProvider>
  );
};

export default Navigation;
