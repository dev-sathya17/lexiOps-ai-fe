import { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Navbar from "../../components/Navbar";
import {
  Users,
  Database,
  Files,
  ArrowRight,
  UserCheck,
  ChevronDown,
  LayoutDashboard,
  Calendar,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Workspaces for selection
const ADMIN_WORKSPACES = [
  { id: "1", name: "Engineering Core", role: "Owner" },
  { id: "2", name: "Design Team", role: "Admin" },
  { id: "3", name: "Marketing Labs", role: "Moderator" },
];

// Mock Data for a "Selected Workspace" (Engineering Core)
const SELECTED_WORKSPACE_STATS = [
  {
    label: "Members",
    value: "45",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Storage Used",
    value: "120.5 GB",
    icon: Database,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Files Count",
    value: "1.2k",
    icon: Files,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    label: "Monthly Activity",
    value: "842",
    icon: UserCheck,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

const WORKSPACE_MEMBERS = [
  {
    name: "Sathya Prakash",
    email: "sathya@example.com",
    role: "Owner",
    status: "Active",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Member",
    status: "Inactive",
  },
  {
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Member",
    status: "Active",
  },
];

const RECENT_WORKSPACE_FILES = [
  {
    name: "System_Architecture.pdf",
    size: "4.2 MB",
    uploader: "Jane Smith",
    date: "Today",
  },
  {
    name: "Client_Feedback_Feb.docx",
    size: "850 KB",
    uploader: "Sarah Williams",
    date: "Yesterday",
  },
  {
    name: "Sprint_Backlog.xlsx",
    size: "1.5 MB",
    uploader: "Sathya Prakash",
    date: "Feb 16",
  },
];

export default function WorkspaceDashboard() {
  useDocumentTitle("Team Space");
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    ADMIN_WORKSPACES[0],
  );
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navbar and Workspace Switcher */}
        <div className="space-y-6">
          <Navbar activePath="/workspace/dashboard" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-pink-500 mb-2">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-widest">
                  Workspace Administration
                </span>
              </div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                {selectedWorkspace.name}
              </h1>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Performance metrics and management for this specific hub.
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
                className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all font-bold text-gray-700 dark:text-gray-200"
              >
                <LayoutDashboard size={18} className="text-pink-500" />
                <span>Switch Workspace</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isWorkspaceMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isWorkspaceMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden z-50 p-2"
                  >
                    {ADMIN_WORKSPACES.map((ws) => (
                      <button
                        key={ws.id}
                        onClick={() => {
                          setSelectedWorkspace(ws);
                          setIsWorkspaceMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${selectedWorkspace.id === ws.id ? "bg-pink-500/10 text-pink-500 font-bold" : "hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300"}`}
                      >
                        <span>{ws.name}</span>
                        <span className="text-[10px] uppercase font-black opacity-50">
                          {ws.role}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Workspace Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SELECTED_WORKSPACE_STATS.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={stat.label}
              className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-pink-500/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Members List */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Workspace Members
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Team members assigned to this workspace
                </p>
              </div>
              <button className="text-xs font-black text-pink-500 uppercase tracking-widest hover:underline">
                Manage All
              </button>
            </div>

            <div className="p-4 space-y-2">
              {WORKSPACE_MEMBERS.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-blue-500 font-bold border border-blue-500/5 group-hover:scale-110 transition-transform">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:block">
                      {member.role}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full ${member.status === "Active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-gray-300"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Storage Breakdown View */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm p-8 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
              Storage Health
            </h3>

            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-100 dark:text-white/5"
                  />
                  <motion.circle
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - 440 * 0.65 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="440"
                    className="text-pink-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">
                    65%
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Utilized
                  </span>
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-purple-500" />
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                      Next Cleanup
                    </span>
                  </div>
                  <span className="text-xs font-black text-gray-900 dark:text-white">
                    In 4 Days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Files Table Scoped to Workspace */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 dark:border-white/5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Workspace Files
            </h3>
            <p className="text-xs text-gray-500 font-medium capitalize">
              Latest uploads for {selectedWorkspace.name}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-white/[0.01]">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    File Name
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Uploader
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Size
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Date
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {RECENT_WORKSPACE_FILES.map((file, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50/30 dark:hover:bg-white/[0.01] transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                          <Files size={16} className="text-pink-500" />
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-xs font-bold text-gray-500">
                      {file.uploader}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-xs font-bold text-gray-400">
                      {file.size}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-xs font-bold text-gray-400">
                      {file.date}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <button className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-pink-500 transition-all">
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
