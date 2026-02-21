import Header from "../../components/Header";
import { features } from "../../data/Features";
import Footer from "../../components/Footer";
import CTASection from "../../components/CTASection";
import { useEffect, useState } from "react";
import { STEPS } from "../../constants/steps";
import Loader from "../../components/ui/Loader";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Features = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 50));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useDocumentTitle("Powerful Features");
  return (
    <>
      {progress === 100 ? (
        <div>
          {/* Header Section */}
          <Header />

          {/* Hero Section */}
          <section className="px-6 sm:px-12 md:px-20 py-20 md:py-42 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-4xl mx-auto">
              Built for accurate AI answers
              <span className="block bg-linear-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent">
                On top of your internal knowledge
              </span>
            </h2>
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              LexiOps AI provides the core building blocks for a secure,
              explainable knowledge copilot — from document ingestion to
              grounded AI responses.
            </p>
          </section>

          {/* Feature Grid */}
          <section className="px-6 sm:px-12 md:px-20 py-16 md:py-24 bg-linear-to-b from-gray-100 to-white dark:from-zinc-950/40 dark:to-black transition-colors duration-300">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 border border-gray-200 dark:border-white/5 bg-white hover:bg-gray-50 dark:bg-white/2 dark:hover:bg-white/5 transition shadow-md text-center"
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

          {/* Workflow Section */}
          <section className="px-6 sm:px-12 md:px-20 py-20 md:py-28 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              From documents to trusted answers 🚀
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-12">
              Every document you upload is securely processed, indexed, and made
              searchable so your team can ask questions and get reliable,
              source-backed answers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              {["Ingested", "Indexed", "Queryable"].map((step, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-75 px-6 py-4 rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/2 shadow-md flex flex-col items-center transition-colors"
                >
                  <span className="text-xl font-semibold mb-2 bg-linear-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent">
                    {step}
                  </span>
                  <span className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
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

export default Features;
