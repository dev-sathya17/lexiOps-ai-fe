import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/Router";

function App() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }

  return <RouterProvider router={router} />;
}

export default App;
