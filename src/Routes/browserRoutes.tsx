import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../Pages/AuthPage/Components/SignIn";
import AuthPage from "../Pages/AuthPage/AuthPage";
import SignUp from "../Pages/AuthPage/Components/SignUp";
import HomePage from "../Pages/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
        children: [
          {
            index: true,
          },
          {
            path: "signIn",
            element: <SignIn />,
          },
          {
            path: "signUp",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "auth",
  //   element: <AuthPage />,
  //   children: [
  //     {
  //       index: true,
  //     },
  //     {
  //       path: "signIn",
  //       element: <SignIn />,
  //     },
  //     {
  //       path: "signUp",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
]);

export default router;
