import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/hero/LandingPage";
import Pricing from "../pages/hero/Pricing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
]);

export default router;
