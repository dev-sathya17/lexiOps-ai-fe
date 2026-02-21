import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Docs from "../pages/hero/Docs";
import Features from "../pages/hero/Features";
import LandingPage from "../pages/hero/LandingPage";
import Pricing from "../pages/hero/Pricing";
import NotFound from "../utils/NotFound";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ChatPage from "../pages/chat/ChatPage";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageFiles from "../pages/admin/ManageFiles";
import ManageWorkspaces from "../pages/admin/ManageWorkspaces";
import AdminDashboard from "../pages/admin/AdminDashboard";
import WorkspaceDashboard from "../pages/admin/WorkspaceDashboard";
import ManagePlans from "../pages/admin/ManagePlans";
import ManageRBAC from "../pages/admin/ManageRBAC";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/features", element: <Features /> },
      { path: "/docs", element: <Docs /> },
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/workspace/dashboard", element: <WorkspaceDashboard /> },
      { path: "/admin/users", element: <ManageUsers /> },
      { path: "/admin/files", element: <ManageFiles /> },
      { path: "/admin/workspaces", element: <ManageWorkspaces /> },
      { path: "/admin/plans", element: <ManagePlans /> },
      { path: "/admin/rbac", element: <ManageRBAC /> },
      { path: "*", element: <NotFound /> },
    ],
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
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

export default router;
