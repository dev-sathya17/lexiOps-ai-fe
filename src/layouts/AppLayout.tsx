import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div
      className="min-h-screen bg-linear-to-b from-white via-gray-50 to-white
                    dark:from-black dark:via-zinc-950 dark:to-black
                    text-gray-900 dark:text-gray-200
                    transition-colors duration-300"
    >
      <Outlet />
    </div>
  );
};

export default AppLayout;
