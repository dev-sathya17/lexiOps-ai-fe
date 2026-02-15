import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6
                 bg-linear-to-b from-white via-gray-50 to-white
                 dark:from-black dark:via-zinc-950 dark:to-black
                 text-gray-900 dark:text-gray-200
                 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Error Code */}
      <h1
        className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-4
                   bg-clip-text text-transparent
                   bg-linear-to-r from-pink-500 to-blue-400
                   animate-pulse-slow"
      >
        404
      </h1>

      {/* Error Message */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-600 dark:text-gray-400 text-center max-w-xl mb-8">
        The page you are looking for does not exist or has been moved. But don’t
        worry — you can get back on track quickly.
      </p>

      {/* CTA Button */}
      <NavLink
        to="/"
        className="px-8 py-4 rounded-xl
                   bg-linear-to-r from-pink-500 to-blue-400
                   text-black font-semibold
                   shadow-lg hover:opacity-90 transition"
      >
        Go to Home
      </NavLink>

      {/* Decorative Elements */}
      <div
        className="absolute top-10 left-10 w-24 h-24 rounded-full
                      bg-pink-500/10 dark:bg-pink-500/5
                      blur-xl animate-pulse-slower"
      />

      <div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full
                      bg-blue-400/10 dark:bg-blue-400/5
                      blur-xl animate-pulse-slower"
      />
    </div>
  );
};

export default NotFound;
