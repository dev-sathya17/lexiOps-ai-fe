import { useState } from "react";
import { Users, Briefcase, FileText, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Users, label: "Manage Users", href: "#" },
    { icon: Briefcase, label: "Manage Workspaces", href: "#" },
    { icon: FileText, label: "Manage Files", href: "#" },
  ];

  return (
    <div className="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 z-30 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Label / Logo Area */}
          <div className="flex items-center">
            <span className="font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-xs uppercase tracking-wider">
              Admin Console
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-zinc-900 shadow-lg">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-pink-600 dark:hover:text-pink-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
