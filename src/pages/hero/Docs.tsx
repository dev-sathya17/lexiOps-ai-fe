import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  faqCategory,
  docCategories as initialCategories,
} from "../../data/docs";
import Loader from "../../components/ui/Loader";
import { STEPS } from "../../constants/steps";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const docCategories = [...initialCategories, faqCategory];

const Docs = () => {
  const [search, setSearch] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [selectedCategory, setSelectedCategory] = useState<string>(
    docCategories[0].name,
  );

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 50));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useDocumentTitle("Documentation");

  return (
    <>
      {progress === 100 ? (
        <div>
          <Header />

          {/* Hero Section */}
          <section className="px-4 sm:px-12 md:px-20 py-16 sm:py-20 md:py-32 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-blue-400">
              LexiOps AI Documentation
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              Everything you need to get started, set up your workspace, upload
              documents, and query your internal knowledge securely with AI.
            </p>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search docs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-6 w-full sm:w-1/2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 dark:text-gray-200 transition"
            />
          </section>

          {/* Docs Content with Sidebar */}
          <section className="flex flex-col lg:flex-row px-4 sm:px-16 md:px-20 py-8 gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              {/* Desktop Sidebar */}
              <div className="hidden lg:block bg-gray-100 dark:bg-white/2 border border-gray-200 dark:border-white/5 rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <ul className="space-y-2">
                  {docCategories.map((cat) => (
                    <li
                      key={cat.name}
                      className={`cursor-pointer px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-white/5 transition ${
                        selectedCategory === cat.name
                          ? "bg-pink-500/20 dark:bg-pink-500/30 font-semibold"
                          : ""
                      }`}
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Dropdown */}
              <div className="lg:hidden relative mb-4">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-900/80 border border-gray-200 dark:border-white/10 rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                >
                  <span>{selectedCategory}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul className="absolute mt-2 w-full bg-gray-100 dark:bg-zinc-900/90 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg z-20">
                    {docCategories.map((cat) => (
                      <li
                        key={cat.name}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800/70 transition"
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setDropdownOpen(false);
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>

            {/* Docs List */}
            <div className="flex-1 space-y-6">
              {docCategories
                .filter((cat) => cat.name === selectedCategory)
                .map((category) =>
                  category.items
                    .filter(
                      (item) =>
                        item.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.content
                          .toLowerCase()
                          .includes(search.toLowerCase()),
                    )
                    .map((item) => (
                      <div
                        key={item.title}
                        className="bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-white/5
                     transition cursor-pointer"
                      >
                        <div
                          className="flex justify-between items-center"
                          onClick={() => toggleSection(item.title)}
                        >
                          <h3 className="font-semibold">{item.title}</h3>
                          <span className="text-gray-500 dark:text-gray-400">
                            {expandedSections[item.title] ? "-" : "+"}
                          </span>
                        </div>
                        {expandedSections[item.title] && (
                          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                            {item.content}
                          </p>
                        )}
                      </div>
                    )),
                )}
            </div>
          </section>

          <Footer />
        </div>
      ) : (
        <Loader progress={progress} steps={STEPS.HERO} />
      )}
    </>
  );
};

export default Docs;
