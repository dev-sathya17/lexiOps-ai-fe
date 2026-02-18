import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../Navbar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="flex h-screen overflow-hidden bg-[#F5F6F8] dark:bg-black text-gray-900 dark:text-gray-100 font-sans p-3 gap-3">
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

      {/* Sidebar Container */}
      <div
        className={`${
          isMobile
            ? "fixed inset-y-3 left-3 z-40 transform transition-transform duration-300 ease-in-out"
            : "relative"
        } ${
          isMobile && !isSidebarOpen
            ? "-translate-x-[calc(100%+24px)]"
            : "translate-x-0"
        } h-full overflow-hidden rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white dark:border-white/5`}
      >
        <Sidebar
          isCollapsed={!isMobile && !isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Main Content Area Container */}
      <main className="flex flex-col h-full flex-1 gap-4 overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} activePath="/chat" />
        <main className="flex flex-col relative h-full overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-950 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white dark:border-white/5">
          {children}
        </main>
      </main>
    </div>
  );
}
