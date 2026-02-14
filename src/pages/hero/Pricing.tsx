import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import CTASection from "../../components/CTASection";
import Header from "../../components/Header";
import { plans } from "../../data/plans";
import { useEffect } from "react";

const Pricing = () => {
  useEffect(() => {
    document.title = "LexiOps AI - Pricing";
  }, []);

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-gray-50 to-white text-gray-900 dark:from-black dark:via-zinc-950 dark:to-black dark:text-gray-200 flex flex-col transition-colors duration-300">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section className="px-6 sm:px-12 md:px-20 py-20 md:py-38 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-4xl mx-auto">
          Plans designed for how teams use AI
          <span className="block bg-linear-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent">
            Simple, transparent pricing for every workspace
          </span>
        </h2>
        <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
          LexiOps AI offers flexible plans based on workspace size and document
          usage. Start free, invite your team, and scale as your internal
          knowledge grows.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="px-6 sm:px-12 md:px-20 py-16 md:py-24 bg-linear-to-b from-gray-100 to-white dark:from-zinc-950/40 dark:to-black transition-colors duration-300">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 border border-gray-200 dark:border-white/5 bg-white dark:bg-white/2 hover:bg-gray-50 dark:hover:bg-white/5 transition shadow-md flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold">{plan.name}</h4>
                  {plan.name === "Pro" && (
                    <div>
                      <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-400/20 dark:text-blue-300 rounded-full font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-3xl sm:text-4xl font-bold mb-6">
                  {plan.price}
                  {plan.price !== "Contact Us" && (
                    <span className="text-gray-500 dark:text-gray-400 text-lg">
                      /mo
                    </span>
                  )}
                </p>
                <ul className="mb-6 text-gray-600 dark:text-gray-400 text-sm space-y-2">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-pink-500 shrink-0 mt-1" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <NavLink
                to="/signup"
                className={`mt-4 px-6 py-3 rounded-xl text-center bg-linear-to-r ${plan.gradient} text-black font-semibold shadow-lg hover:opacity-90 transition`}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </NavLink>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
