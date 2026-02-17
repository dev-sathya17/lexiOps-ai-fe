import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AdminNavbar from "./AdminNavbar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Dummy admin check - replace with actual auth logic
  const isAdmin = true;

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); // Default to closed on mobile
      } else {
        setIsSidebarOpen(true); // Default to open on desktop
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f3f4f6] dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? "fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out"
            : "relative"
        } ${
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <Sidebar
          isCollapsed={!isMobile && !isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Admin Navbar */}
        {isAdmin && <AdminNavbar />}

        {/* Mobile Header */}
        {isMobile && (
          <div className="h-14 border-b border-gray-200 dark:border-white/10 flex items-center px-4 justify-between bg-white dark:bg-zinc-950">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400"
            >
              <Menu size={24} />
            </button>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              New Chat
            </span>
            <div className="w-8" /> {/* Spacer for centering */}
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
