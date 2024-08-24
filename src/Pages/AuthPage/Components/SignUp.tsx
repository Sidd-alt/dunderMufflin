import { Button, Paper, TextField, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  createUserDocumentFromAuth,
  signUpUsingEmailAndPassword,
} from "../../../Utils/utils";
import { theme } from "./SignIn";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import Loader from "../../../Components/Loader";

const validationSchema = yup.object({
  userName: yup
    .string()
    .required("Username is required")
    .max(16, "Username must not be more than 16 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters")
    .max(18, "Max password length is 18"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm password must match")
    .required("Confirm password is required"),
});

function SignUp() {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setShowLoader(true);
      handleSubmit();
    },
  });

  const handleSubmit = async () => {
    try {
      const userCreds = {
        email: formik.values.email,
        password: formik.values.password,
      };
      const { user } = await signUpUsingEmailAndPassword(userCreds);
      createUserDocumentFromAuth(user, formik.values.userName);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper sx={{ p: 2 }} elevation={10}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              name="userName"
              onChange={formik.handleChange}
              variant="outlined"
              label="Username"
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />
            <TextField
              type="email"
              name="email"
              onChange={formik.handleChange}
              variant="outlined"
              label="Email-id"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              variant="outlined"
              type="password"
              name="password"
              label="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <TextField
              variant="outlined"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />

            <Button type="submit" fullWidth variant="contained">
              <Typography>Sign Up</Typography>
            </Button>
          </form>
        </Paper>
        <Loader open={showLoader} />
      </ThemeProvider>
    </>
  );
}

export default SignUp;
