import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTASection from "../../components/CTASection";
import { features } from "../../data/Features";
import { useEffect, useState } from "react";
import Loader from "../../components/ui/Loader";
import { STEPS } from "../../constants/steps";

const LandingPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 10));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "LexiOps AI - Home";
  }, []);

  return (
    <>
      {progress === 100 ? (
        <div className="min-h-screen w-full flex flex-col bg-linear-to-b from-white via-gray-50 to-white text-gray-800 dark:from-black dark:via-zinc-950 dark:to-black dark:text-gray-200 transition-colors duration-300">
          {/* Header */}
          <Header />

          {/* Hero Section */}
          <section className="flex flex-col items-center text-center px-6 py-16 sm:py-20 md:py-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold max-w-3xl leading-tight">
              AI-powered answers. Built on your knowledge.
              <span className="block bg-linear-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent">
                Instant answers from your internal knowledge
              </span>
            </h2>
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-xl text-base sm:text-lg">
              LexiOps AI is a secure knowledge copilot for querying internal
              documents with AI. Upload files, ask questions, and get accurate,
              source-backed answers.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <NavLink
                to="/sign-up"
                className="px-6 py-3 rounded-xl bg-linear-to-r from-pink-500 to-blue-400 text-black font-semibold shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={18} />
              </NavLink>
              <NavLink
                to="/docs"
                className="px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:border-pink-400 transition"
              >
                Learn More
              </NavLink>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 sm:px-12 md:px-20 py-16 md:py-24 bg-linear-to-b from-gray-100 to-white dark:from-zinc-950/40 dark:to-black transition-colors duration-300">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Why LexiOps AI?
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.id}
                  className="rounded-2xl p-6 border border-gray-200 dark:border-white/5 bg-white dark:bg-white/2 hover:bg-gray-50 dark:hover:bg-white/5 transition shadow-md text-center"
                >
                  <div className="flex justify-center mb-4">{f.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{f.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <CTASection />

          {/* Footer */}
          <Footer />
        </div>
      ) : (
        <Loader progress={progress} steps={STEPS.HERO} />
      )}
    </>
  );
};

export default LandingPage;
