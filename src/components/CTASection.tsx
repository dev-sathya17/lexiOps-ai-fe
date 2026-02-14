import { NavLink } from "react-router-dom";

const CTASection = () => {
  return (
    <section
      className="
      text-center py-16 px-6 sm:py-20
      bg-linear-to-t from-gray-100 to-white
      dark:from-zinc-950/40 dark:to-black
      transition-colors duration-300
    "
    >
      <h3
        className="
        text-2xl md:text-3xl font-bold mb-6
        text-gray-900 dark:text-gray-100
      "
      >
        Ready to take LexiOps AI for a spin?
      </h3>
      <NavLink
        to="/sign-up"
        className="
          px-8 py-4 rounded-xl 
          bg-linear-to-r from-pink-500 to-blue-400 
          text-white dark:text-black 
          font-semibold shadow-lg 
          hover:opacity-90 transition
        "
      >
        Start Free Today
      </NavLink>
    </section>
  );
};

export default CTASection;
