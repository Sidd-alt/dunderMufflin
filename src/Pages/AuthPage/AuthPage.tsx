import { Button, ButtonGroup, Grid } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("signIn");
  }, []);

  const currentLocation = location.pathname.split("/");
  const currentPath = currentLocation[currentLocation.length - 1];

  return (
    <>
      <Grid
        container
        // height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={3}
        paddingTop={"20px"}
      >
        <Grid
          width={"300px"}
          // height="30%"
          item
          display={"flex"}
          justifyContent={"center"}
          alignItems={"end"}
        >
          <ButtonGroup variant="outlined">
            <Link to={"signIn"}>
              <Button
                variant={currentPath === "signIn" ? "contained" : "outlined"}
              >
                Sign In
              </Button>
            </Link>
            <Link to={"signUp"}>
              <Button
                variant={currentPath === "signUp" ? "contained" : "outlined"}
              >
                Sign Up
              </Button>
            </Link>
          </ButtonGroup>
        </Grid>
        <Grid
          item
          display={"flex"}
          justifyContent={"center"}
          // height="70%"
          width={"100%"}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default AuthPage;
