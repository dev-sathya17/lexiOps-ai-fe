import {
  Users,
  FolderTree,
  Database,
  BarChart3,
  MessageSquare,
  Menu,
} from "lucide-react";

interface ChatNavbarProps {
  onToggleSidebar?: () => void;
}

export default function ChatNavbar({ onToggleSidebar }: ChatNavbarProps) {
  const navItems = [
    { icon: MessageSquare, label: "Chat", active: true },
    { icon: BarChart3, label: "Dashboard" },
    { icon: Database, label: "Manage files" },
    { icon: Users, label: "Manage Users" },
    { icon: FolderTree, label: "Manage workspace" },
  ];

  return (
    <div className="mb-0 sticky top-0 z-10">
      <nav className="h-12 flex items-center justify-center gap-2 px-3 md:px-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none w-auto max-w-full">
        {/* Mobile Sidebar Toggle */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <Menu size={18} />
          </button>
        )}

        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex cursor-pointer items-center gap-2 px-2.5 md:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
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
      </nav>
    </div>
  );
}
