import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  MessageSquare,
  MoreHorizontal,
  LogOut,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  Trash2,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/logo.png";

interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  className?: string;
}

const DUMMY_HISTORY: ChatHistoryItem[] = [
  { id: "1", title: "Project Brainstorming", date: "Today" },
  { id: "2", title: "React Component Help", date: "Yesterday" },
  { id: "3", title: "Bug Fix Discussion", date: "Previous 7 days" },
  { id: "4", title: "UI/UX Ideas", date: "Previous 30 days" },
];

export default function Sidebar({
  isCollapsed,
  toggleSidebar,
  className = "",
}: SidebarProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        // Also check if click is inside the portal menu (handled by portal implementation typically having a backdrop or ref check)
        // For simplicity here, we'll let the backdrop in the portal handle closing
      }
    };

    // Update menu position on resize or scroll
    const updatePosition = () => {
      if (isProfileMenuOpen && profileRef.current) {
        const rect = profileRef.current.getBoundingClientRect();
        // Position above the profile item
        setMenuPosition({
          top: rect.top - 10, // 10px gap
          left: rect.left,
        });
      }
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isProfileMenuOpen]);

  // Calculate position when opening
  useEffect(() => {
    if (isProfileMenuOpen && profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.top - 10,
        left: rect.left,
      });
    }
  }, [isProfileMenuOpen]);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsProfileMenuOpen(false);
  };

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleSidebarClick = () => {
    if (activeMenuId) setActiveMenuId(null);
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? "4.5rem" : "16rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`h-full bg-[#f9fafb] dark:bg-zinc-900 border-r border-gray-200 dark:border-white/10 flex flex-col relative z-20 ${className}`}
        onClick={handleSidebarClick}
      >
        {/* Top Section */}
        <div
          className={`p-3 flex items-center ${isCollapsed ? "justify-center flex-col gap-4" : "justify-between"} min-h-[60px]`}
        >
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="expanded-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <img src={Logo} alt="Logo" className="w-8 h-8 shrink-0" />
                  <span className="font-bold text-lg bg-linear-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
                    LexiOps
                  </span>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400"
                >
                  <ChevronLeft size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 mt-1"
              >
                <ChevronRight size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* New Chat Button */}
        <div className="px-3 pb-2">
          {isCollapsed ? (
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 shadow-sm mx-auto"
              onClick={() => console.log("New Chat")}
              title="New Chat"
            >
              <Plus size={20} className="text-pink-500" />
            </button>
          ) : (
            <button
              className="w-full flex items-center gap-3 px-3 py-2 bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm transition-colors text-sm font-medium"
              onClick={() => console.log("New Chat")}
            >
              <Plus size={18} className="text-pink-500" />
              <span>New Chat</span>
            </button>
          )}
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto py-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-black/20 overflow-x-hidden">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2 px-2 mt-2">
                  Recent
                </div>
                <div className="space-y-1">
                  {DUMMY_HISTORY.map((chat) => (
                    <div
                      key={chat.id}
                      className="group relative flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      <MessageSquare
                        size={18}
                        className="shrink-0 text-gray-400"
                      />

                      <div className="flex-1 truncate text-sm">
                        {chat.title}
                      </div>

                      <button
                        onClick={(e) => toggleMenu(chat.id, e)}
                        className={`opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-500 transition-opacity ${activeMenuId === chat.id ? "opacity-100 bg-gray-300 dark:bg-zinc-700" : ""}`}
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      <AnimatePresence>
                        {activeMenuId === chat.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-2 top-8 z-50 w-32 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-lg rounded-lg overflow-hidden py-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center gap-2">
                              <span className="w-4">
                                <MessageSquare size={14} />
                              </span>{" "}
                              Rename
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                              <span className="w-4">
                                <Trash2 size={14} />
                              </span>{" "}
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer: User Profile & Logout */}
        <div className="p-3 border-t border-gray-200 dark:border-white/10 bg-[#f9fafb] dark:bg-zinc-900 flex flex-col gap-2">
          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <div
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors`}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-pink-500 to-violet-500 flex items-center justify-center text-white font-bold shrink-0">
                <User size={16} />
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                    Demo User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Free Plan
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <button
            className={`flex items-center ${isCollapsed ? "justify-center" : "justify-start gap-3 px-2"} p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-red-500 dark:hover:text-red-400 transition-colors w-full`}
            title="Log out"
          >
            <LogOut size={18} />
            {!isCollapsed && (
              <span className="text-sm font-medium">Log out</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Profile Menu Portal */}
      {createPortal(
        <AnimatePresence>
          {isProfileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[9998]"
                onClick={() => setIsProfileMenuOpen(false)}
              />
              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                style={{
                  top: menuPosition.top,
                  left: menuPosition.left,
                  transform: "translateY(-100%)", // Shift up so bottom aligns with top calculation
                }}
                className={`fixed z-[9999] mb-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-lg rounded-xl overflow-hidden min-w-[200px] -mt-2`}
              >
                <div className="p-1">
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    onClick={() => {
                      alert("Settings clicked!");
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    onClick={toggleTheme}
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
