import { Grid, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import React from "react";

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

const Logo: React.FC = () => {
  return (
    <Grid display={"flex"} justifyContent={"center"} flexDirection={"column"}>
      <Typography color={"#fff"} textTransform={"uppercase"} variant="h4">
        Dunder Mifflin
      </Typography>
    </Grid>
  );
};

export default Logo;
