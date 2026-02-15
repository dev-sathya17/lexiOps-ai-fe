import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/hero/LandingPage";
import Pricing from "../pages/hero/Pricing";
import Features from "../pages/hero/Features";
import Docs from "../pages/hero/Docs";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/docs",
    element: <Docs />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;

