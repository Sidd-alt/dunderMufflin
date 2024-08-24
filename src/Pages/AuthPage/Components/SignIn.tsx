import { Button, Typography, TextField, Paper } from "@mui/material";
import {
  createUserDocumentFromAuth,
  signInGooglePopUp,
  signInUsingEmailAndPassword,
} from "../../../Utils/utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import Loader from "../../../Components/Loader";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          width: "350px",
          height: "fit-content",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          margin: "5px 0px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "2px 0px",
          textTransform: "none",
        },
      },
    },
  },
});

export interface SignInCredsState {
  email: string;
  password: string;
}

function SignIn() {
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleSignInWithGoogle = async () => {
    const { user } = await signInGooglePopUp();
    createUserDocumentFromAuth(user);
  };

  const handleSubmit = async () => {
    try {
      const { email, password } = formik.values;
      const { user } = await signInUsingEmailAndPassword(email, password);
      createUserDocumentFromAuth(user);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSubmit();
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ p: 3 }} elevation={5}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            label="Email-id"
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            type="password"
            name="password"
            label="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" fullWidth variant="contained">
            <Typography>Sign In </Typography>
          </Button>
          <Button
            onClick={handleSignInWithGoogle}
            fullWidth
            variant="contained"
            type="button"
          >
            <Typography>Sign In With Google</Typography>
          </Button>
        </form>
      </Paper>
      <Loader open={showLoader} />
    </ThemeProvider>
  );
}

export default SignIn;
