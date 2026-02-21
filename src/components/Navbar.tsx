import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Users,
  FolderTree,
  Database,
  BarChart3,
  LayoutDashboard,
  MessageSquare,
  Menu,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
  CreditCard,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  onToggleSidebar?: () => void;
  activePath?: string;
}

// type NavItem {
//   icon: IconType;
//   label: string;
//   path: string;
//   active: boolean;
// }

export default function Navbar({ onToggleSidebar, activePath }: NavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isManagementMenuOpen, setIsManagementMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [managementPosition, setManagementPosition] = useState({
    top: 0,
    left: 0,
  });
  const profileRef = useRef<HTMLDivElement>(null);
  const managementRef = useRef<HTMLDivElement>(null);

  const mainNavItems = [
    {
      icon: MessageSquare,
      label: "Chat",
      path: "/chat",
      active: activePath === "/chat",
    },
    {
      icon: BarChart3,
      label: "Dashboard",
      path: "/admin/dashboard",
      active: activePath === "/admin/dashboard",
    },
    {
      icon: LayoutDashboard,
      label: "Workspace",
      path: "/workspace/dashboard",
      active: activePath === "/workspace/dashboard",
    },
  ];
  const managementItems = [
    {
      icon: Database,
      label: "Manage files",
      path: "/admin/files",
      active: activePath === "/admin/files",
    },
    {
      icon: Users,
      label: "Manage Users",
      path: "/admin/users",
      active: activePath === "/admin/users",
    },
    {
      icon: FolderTree,
      label: "Manage workspace",
      path: "/admin/workspaces",
      active: activePath === "/admin/workspaces",
    },
    {
      icon: CreditCard,
      label: "Manage plans",
      path: "/admin/plans",
      active: activePath === "/admin/plans",
    },
  ];

  const isManagementActive = managementItems.some((item) => item.active);

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
        top: rect.bottom + 12,
        left: rect.right - 120,
      });
    }
  }, [isProfileMenuOpen]);

  useEffect(() => {
    if (isManagementMenuOpen && managementRef.current) {
      const rect = managementRef.current.getBoundingClientRect();
      setManagementPosition({
        top: rect.bottom + 12,
        left: rect.left,
      });
    }
  }, [isManagementMenuOpen]);

  return (
    <div className="mb-0 sticky top-0 z-10 w-full flex justify-center py-4">
      <nav className="h-16 flex items-center gap-6 px-6 md:px-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_8px_32px_-4px_rgba(0,0,0,0.06)] dark:shadow-none w-fit max-w-full">
        {/* Left: Mobile Sidebar Toggle */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="cursor-pointer md:hidden p-2.5 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors shrink-0"
          >
            <Menu size={22} />
          </button>
        )}

        {/* Center: Nav Items */}
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar py-1">
          {mainNavItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.label}
              className={`flex cursor-pointer items-center gap-3 px-4 md:px-5 py-2 rounded-2xl text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                item.active
                  ? "text-pink-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-500"
              }`}
            >
              <item.icon size={18} />
              <span className="hidden sm:inline lowercase first-letter:uppercase">
                {item.label}
              </span>
              <span className="sm:hidden text-xs">
                {item.active ? item.label : ""}
              </span>
            </NavLink>
          ))}

          {/* Management Dropdown Trigger */}
          <div className="relative" ref={managementRef}>
            <button
              onClick={() => setIsManagementMenuOpen(!isManagementMenuOpen)}
              className={`flex cursor-pointer items-center gap-3 px-4 md:px-5 py-2 rounded-2xl text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                isManagementActive || isManagementMenuOpen
                  ? "text-pink-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-500"
              }`}
            >
              <ShieldCheck size={18} />
              <span className="hidden sm:inline lowercase first-letter:uppercase">
                Management
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isManagementMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Right: User Controls */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0 ml-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <div
              className="w-10 h-10 rounded-full bg-linear-to-tr from-pink-500/80 to-violet-500/80 p-[2px] cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                <User size={18} className="text-gray-300" />
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            className="cursor-pointer p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all"
            title="Log out"
          >
            <LogOut size={22} />
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

      {/* Management Menu Portal */}
      {createPortal(
        <AnimatePresence>
          {isManagementMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-[9998] cursor-pointer"
                onClick={() => setIsManagementMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                style={{
                  top: managementPosition.top,
                  left: managementPosition.left,
                }}
                className="fixed z-[9999] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden min-w-[220px] p-2"
              >
                <div className="px-3 py-2 border-b border-gray-100 dark:border-white/5 mb-1">
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
                    Administration
                  </p>
                </div>
                <div className="space-y-1">
                  {managementItems.map((item) => (
                    <NavLink
                      to={item.path}
                      key={item.label}
                      onClick={() => setIsManagementMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                        item.active
                          ? "bg-pink-500/10 text-pink-500"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <item.icon size={16} />
                      <span className="lowercase first-letter:uppercase">
                        {item.label}
                      </span>
                    </NavLink>
                  ))}
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
