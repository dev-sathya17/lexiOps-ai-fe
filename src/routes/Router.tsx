import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/hero/LandingPage";
import Pricing from "../pages/hero/Pricing";
import Features from "../pages/hero/Features";
import Docs from "../pages/hero/Docs";

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
]);

export default router;
