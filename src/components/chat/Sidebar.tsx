import { useState } from "react";
import {
  MessageSquare,
  MoreHorizontal,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Search as SearchIcon,
  Star,
  Trash2,
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
  const [starredIds, setStarredIds] = useState<string[]>([]);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
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
        animate={{ width: isCollapsed ? "5rem" : "18rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`h-full bg-white dark:bg-zinc-950 flex flex-col relative z-20 ${className}`}
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
                  className="cursor-pointer p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400"
                >
                  <PanelLeftClose size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleSidebar}
                className="cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 mt-1"
              >
                <PanelLeftOpen size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* New Chat Button */}
        <div className="px-4 pb-4">
          {isCollapsed ? (
            <button
              className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 shadow-sm mx-auto transition-all duration-200 active:scale-95"
              onClick={() => console.log("New Chat")}
              title="New Chat"
            >
              <Plus size={22} className="text-pink-500" />
            </button>
          ) : (
            <button
              className="cursor-pointer w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 rounded-2xl shadow-sm transition-all duration-200 text-sm font-semibold active:scale-[0.98] group"
              onClick={() => console.log("New Chat")}
            >
              <div className="flex items-center gap-3">
                <Plus
                  size={18}
                  className="text-pink-500 group-hover:rotate-90 transition-transform duration-300"
                />
                <span>New Chat</span>
              </div>
            </button>
          )}
        </div>

        {/* Search button */}
        <div className="px-4 pb-2">
          {isCollapsed ? (
            <button
              className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-2xl text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-pink-500 transition-all mx-auto"
              title="Search chats"
              onClick={() => alert("Search clicked!")}
            >
              <SearchIcon size={20} />
            </button>
          ) : (
            <button
              onClick={() => alert("Search clicked!")}
              className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 bg-gray-50/50 dark:bg-white/5 border border-transparent hover:border-pink-500/20 hover:bg-white dark:hover:bg-white/10 rounded-xl text-gray-400 transition-all group"
            >
              <SearchIcon
                size={18}
                className="group-hover:text-pink-500 transition-colors"
              />
              <span className="text-sm font-medium">Search chats</span>
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
                {/* Starred Section */}
                {DUMMY_HISTORY.some((h) => starredIds.includes(h.id)) && (
                  <>
                    <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-3 px-3 uppercase tracking-[0.1em] mt-2">
                      Starred
                    </div>
                    <div className="space-y-0.5 mb-4">
                      {DUMMY_HISTORY.filter((h) =>
                        starredIds.includes(h.id),
                      ).map((chat) => (
                        <div
                          key={`starred-${chat.id}`}
                          className="group relative flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 cursor-pointer text-gray-900 dark:text-gray-100 font-medium transition-all duration-200"
                        >
                          <Star
                            size={18}
                            className="shrink-0 text-amber-400 fill-amber-400"
                          />
                          <div className="flex-1 truncate text-sm">
                            {chat.title}
                          </div>
                          <button
                            onClick={(e) => toggleMenu(chat.id, e)}
                            className={`opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-500 transition-opacity ${activeMenuId === chat.id ? "opacity-100 bg-gray-200 dark:bg-zinc-700" : ""}`}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          <AnimatePresence>
                            {activeMenuId === chat.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-2 top-8 z-50 w-36 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 shadow-xl rounded-xl overflow-hidden py-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                                  onClick={() => {
                                    setStarredIds((prev) =>
                                      prev.includes(chat.id)
                                        ? prev.filter((id) => id !== chat.id)
                                        : [...prev, chat.id],
                                    );
                                    setActiveMenuId(null);
                                  }}
                                >
                                  <Star
                                    size={14}
                                    className="fill-amber-400 text-amber-400"
                                  />
                                  Unstar
                                </button>
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2">
                                  <MessageSquare size={14} />
                                  Rename
                                </button>
                                <button className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-3 px-3 uppercase tracking-[0.1em] mt-2">
                  History
                </div>
                <div className="space-y-0.5">
                  {DUMMY_HISTORY.filter((h) => !starredIds.includes(h.id)).map(
                    (chat) => (
                      <div
                        key={chat.id}
                        className="group relative flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
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
                          className={`opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-500 transition-opacity ${activeMenuId === chat.id ? "opacity-100 bg-gray-200 dark:bg-zinc-700" : ""}`}
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        <AnimatePresence>
                          {activeMenuId === chat.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-2 top-8 z-50 w-36 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 shadow-xl rounded-xl overflow-hidden py-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                                onClick={() => {
                                  setStarredIds((prev) =>
                                    prev.includes(chat.id)
                                      ? prev.filter((id) => id !== chat.id)
                                      : [...prev, chat.id],
                                  );
                                  setActiveMenuId(null);
                                }}
                              >
                                <Star
                                  size={14}
                                  className={
                                    starredIds.includes(chat.id)
                                      ? "fill-amber-400 text-amber-400"
                                      : ""
                                  }
                                />
                                {starredIds.includes(chat.id)
                                  ? "Unstar"
                                  : "Star"}
                              </button>
                              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2">
                                <MessageSquare size={14} />
                                Rename
                              </button>
                              <button className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                                <Trash2 size={14} />
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ),
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer: User Profile (View Only) */}
        <div className="p-4 bg-white dark:bg-zinc-950">
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} p-2 rounded-xl transition-all duration-200`}
          >
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-pink-500/80 to-violet-500/80 flex items-center justify-center text-white p-[2px] shrink-0 shadow-sm">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                <User size={18} className="text-gray-300" />
              </div>
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  Demo User
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-500 font-medium truncate uppercase tracking-wider">
                  Free Plan
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
