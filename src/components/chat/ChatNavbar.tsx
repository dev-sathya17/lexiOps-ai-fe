import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Users,
  FolderTree,
  Database,
  BarChart3,
  MessageSquare,
  Menu,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatNavbarProps {
  onToggleSidebar?: () => void;
}

export default function ChatNavbar({ onToggleSidebar }: ChatNavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const profileRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { icon: MessageSquare, label: "Chat", active: true },
    { icon: BarChart3, label: "Dashboard" },
    { icon: Database, label: "Manage files" },
    { icon: Users, label: "Manage Users" },
    { icon: FolderTree, label: "Manage workspace" },
  ];

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  // Sync menu position when popup opens
  useEffect(() => {
    if (isProfileMenuOpen && profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 10,
        left: rect.right - 110,
      });
    }
  }, [isProfileMenuOpen]);

  return (
    <div className="mb-0 sticky top-0 z-10 w-full flex justify-center">
      <nav className="h-12 flex items-center gap-4 px-3 md:px-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none w-fit max-w-full">
        {/* Left: Mobile Sidebar Toggle */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="cursor-pointer md:hidden p-2 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors shrink-0"
          >
            <Menu size={18} />
          </button>
        )}

        {/* Center: Nav Items */}
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex cursor-pointer items-center gap-2 px-2.5 md:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                item.active
                  ? "text-pink-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-500"
              }`}
            >
              <item.icon size={14} />
              <span className="hidden sm:inline lowercase first-letter:uppercase">
                {item.label}
              </span>
              <span className="sm:hidden text-[10px]">
                {item.active ? item.label : ""}
              </span>
            </button>
          ))}
        </div>

        {/* Right: User Controls */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0 ml-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <div
              className="w-8 h-8 rounded-full bg-linear-to-tr from-pink-500/80 to-violet-500/80 p-[1.5px] cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                <User size={14} className="text-gray-300" />
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            className="cursor-pointer p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all"
            title="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Profile Menu Portal */}
      {createPortal(
        <AnimatePresence>
          {isProfileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-[9998] cursor-pointer"
                onClick={() => setIsProfileMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                style={{
                  top: menuPosition.top,
                  left: menuPosition.left,
                  transform: "translateX(-100%)",
                }}
                className="fixed z-[9999] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden min-w-[200px]"
              >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Demo User
                  </p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
                    Free Plan
                  </p>
                </div>
                <div className="p-1">
                  <button
                    className="cursor-pointer w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                    onClick={() => {
                      alert("Settings clicked!");
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
