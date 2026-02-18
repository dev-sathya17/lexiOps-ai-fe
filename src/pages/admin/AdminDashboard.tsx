import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Users as UsersIcon,
  Database,
  FolderTree,
  Files,
  TrendingUp,
  Activity,
  ArrowRight,
  UserCheck,
  Clock,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Standard UI components if they were available, but using raw JSX for consistency with other admin pages
// We'll reuse the Button and other styles from previous components

// Stats Data
const DASHBOARD_STATS = [
  {
    label: "Total Users",
    value: "1,248",
    change: "+12.5%",
    isPositive: true,
    icon: UsersIcon,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Active Workspaces",
    value: "84",
    change: "+4.2%",
    isPositive: true,
    icon: FolderTree,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Total Files",
    value: "45.2k",
    change: "+18.3%",
    isPositive: true,
    icon: Files,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    label: "Storage Used",
    value: "1.2 TB",
    change: "-2.1%",
    isPositive: false,
    icon: Database,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

// Mock Data for Charts
const USER_GROWTH_DATA = [
  { day: "Mon", users: 40 },
  { day: "Tue", users: 35 },
  { day: "Wed", users: 55 },
  { day: "Thu", users: 75 },
  { day: "Fri", users: 65 },
  { day: "Sat", users: 85 },
  { day: "Sun", users: 95 },
];

const STORAGE_TYPES = [
  { name: "DOC", value: 35, color: "#ec4899" }, // pink-500
  { name: "PDF", value: 25, color: "#8b5cf6" }, // violet-500
  { name: "IMG", value: 20, color: "#3b82f6" }, // blue-500
  { name: "Other", value: 20, color: "#94a3b8" }, // slate-400
];

const RECENT_USERS = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "User",
    status: "Active",
    time: "2m ago",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Moderator",
    status: "Active",
    time: "15m ago",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "Pending",
    time: "1h ago",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Admin",
    status: "Active",
    time: "3h ago",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "User",
    status: "Inactive",
    time: "5h ago",
  },
];

const RECENT_FILES = [
  {
    id: 1,
    name: "Invoice_Q1.pdf",
    size: "2.4 MB",
    type: "PDF",
    uploader: "Alice J.",
    date: "Feb 18",
  },
  {
    id: 2,
    name: "Design_System.fig",
    size: "15.8 MB",
    type: "Other",
    uploader: "Bob S.",
    date: "Feb 18",
  },
  {
    id: 3,
    name: "User_Research.xlsx",
    size: "1.2 MB",
    type: "DOC",
    uploader: "Charlie B.",
    date: "Feb 17",
  },
  {
    id: 4,
    name: "Product_Demo.mp4",
    size: "124 MB",
    type: "Video",
    uploader: "Diana P.",
    date: "Feb 17",
  },
  {
    id: 5,
    name: "Roadmap_2024.pdf",
    size: "4.5 MB",
    type: "PDF",
    uploader: "Ethan H.",
    date: "Feb 16",
  },
];

export default function AdminDashboard() {
  const [activeChartTab, setActiveChartTab] = useState("week");

  // Chart Calculations
  const maxGrowth = Math.max(...USER_GROWTH_DATA.map((d) => d.users));
  const chartHeight = 150;
  const chartWidth = 400;
  const padding = 20;

  const points = USER_GROWTH_DATA.map((d, i) => {
    const x =
      padding +
      (i * (chartWidth - 2 * padding)) / (USER_GROWTH_DATA.length - 1);
    const y =
      chartHeight -
      padding -
      (d.users / maxGrowth) * (chartHeight - 2 * padding);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navbar and Header */}
        <div className="space-y-6">
          <Navbar activePath="/admin/dashboard" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                A birds-eye view of your entire platform performance.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-white/5 flex items-center gap-2">
                <Clock size={16} className="text-pink-500" />
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Real-time Updates On
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DASHBOARD_STATS.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={stat.label}
              className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-linear-to-tr from-transparent to-pink-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

              <div className="flex items-start justify-between relative z-10">
                <div
                  className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}
                >
                  <stat.icon size={28} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.isPositive ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"}`}
                >
                  <TrendingUp
                    size={14}
                    className={stat.isPositive ? "" : "rotate-180"}
                  />
                  {stat.change}
                </div>
              </div>

              <div className="mt-6 relative z-10">
                <p className="text-sm font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest leading-none mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Growth Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  User Growth
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Monitoring new sign-ups over time
                </p>
              </div>
              <div className="flex bg-gray-50 dark:bg-white/5 p-1 rounded-xl">
                {["week", "month"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveChartTab(tab)}
                    className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeChartTab === tab ? "bg-white dark:bg-zinc-800 text-pink-500 shadow-sm" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-[250px] relative flex items-center justify-center overflow-hidden">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-full max-h-[300px]"
              >
                {/* Grid Lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1={padding}
                    y1={padding + (i * (chartHeight - 2 * padding)) / 3}
                    x2={chartWidth - padding}
                    y2={padding + (i * (chartHeight - 2 * padding)) / 3}
                    className="stroke-gray-100 dark:stroke-white/5"
                    strokeWidth="1"
                  />
                ))}

                {/* Area under line */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  d={`M ${padding},${chartHeight - padding} L ${points} L ${chartWidth - padding},${chartHeight - padding} Z`}
                  className="fill-pink-500"
                />

                {/* Main Line */}
                <motion.polyline
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />

                {/* Glow Effect */}
                <motion.polyline
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="blur-lg"
                  points={points}
                />

                {/* Points */}
                {USER_GROWTH_DATA.map((d, i) => {
                  const x =
                    padding +
                    (i * (chartWidth - 2 * padding)) /
                      (USER_GROWTH_DATA.length - 1);
                  const y =
                    chartHeight -
                    padding -
                    (d.users / maxGrowth) * (chartHeight - 2 * padding);
                  return (
                    <motion.circle
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      cx={x}
                      cy={y}
                      r="5"
                      className="fill-white dark:fill-zinc-900 stroke-pink-500"
                      strokeWidth="3"
                    />
                  );
                })}

                {/* X Axis Labels */}
                {USER_GROWTH_DATA.map((d, i) => (
                  <text
                    key={i}
                    x={
                      padding +
                      (i * (chartWidth - 2 * padding)) /
                        (USER_GROWTH_DATA.length - 1)
                    }
                    y={chartHeight - 2}
                    className="text-[10px] fill-gray-400 font-bold uppercase tracking-tighter"
                    textAnchor="middle"
                  >
                    {d.day}
                  </text>
                ))}

                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="mt-8 flex items-center justify-between p-4 bg-gray-50/50 dark:bg-white/[0.02] rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                  Growth Forecast
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                +24% anticipated next week
              </p>
            </div>
          </div>

          {/* Storage Distribution Chart (Donut) */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm p-8 flex flex-col items-center">
            <div className="w-full mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Storage Breakdown
              </h3>
              <p className="text-xs text-gray-500 font-medium capitalize">
                Usage by document classification
              </p>
            </div>

            <div className="relative w-48 h-48 mb-8 group">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full rotate-[-90deg]"
              >
                {
                  STORAGE_TYPES.reduce(
                    (acc, slice, idx) => {
                      const circumference = 2 * Math.PI * 40;
                      const offset = acc.totalOffset;
                      const sliceValue = (slice.value / 100) * circumference;

                      acc.elements.push(
                        <motion.circle
                          key={slice.name}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{
                            strokeDashoffset: circumference - sliceValue,
                          }}
                          transition={{
                            duration: 1.5,
                            delay: idx * 0.2,
                            ease: "easeOut",
                          }}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke={slice.color}
                          strokeWidth="12"
                          strokeDasharray={circumference}
                          strokeDashoffset={circumference}
                          style={{
                            strokeDashoffset: circumference - sliceValue,
                            transformOrigin: "center",
                            transform: `rotate(${(offset / circumference) * 360}deg)`,
                          }}
                          className="hover:stroke-current transition-all"
                        />,
                      );

                      acc.totalOffset += sliceValue;
                      return acc;
                    },
                    { elements: [] as any[], totalOffset: 0 },
                  ).elements
                }
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-gray-900 dark:text-white">
                  82%
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Full Capacity
                </span>
              </div>
            </div>

            <div className="w-full space-y-3">
              {STORAGE_TYPES.map((type) => (
                <div
                  key={type.name}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-default group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {type.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-400">
                      {type.value}%
                    </span>
                    <div className="w-16 h-1 w-1 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-current transition-all duration-1000"
                        style={{ width: `${type.value}%`, color: type.color }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Summary Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-50 dark:border-white/5 flex items-center justify-between bg-white dark:bg-zinc-900/50 sticky top-0 z-10">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Users
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  New members who recently joined
                </p>
              </div>
              <Link
                to="/admin/users"
                className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-pink-500 transition-all hover:scale-110 active:scale-95"
              >
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="p-4 space-y-2">
              {RECENT_USERS.map((user) => (
                <div
                  key={user.id}
                  className="group p-4 rounded-2xl flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-pink-500/10 to-violet-500/10 flex items-center justify-center text-pink-500 font-bold border border-pink-500/5 group-hover:scale-110 transition-transform">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider ${
                        user.status === "Active"
                          ? "bg-green-500/10 text-green-500"
                          : user.status === "Pending"
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-gray-500/10 text-gray-500"
                      }`}
                    >
                      {user.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      {user.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="m-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:text-pink-500 transition-colors">
              View All 1,248 Users
            </button>
          </div>

          {/* Recent Files */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-50 dark:border-white/5 flex items-center justify-between bg-white dark:bg-zinc-900/50 sticky top-0 z-10">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Latest Files
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Recently uploaded organizational assets
                </p>
              </div>
              <Link
                to="/admin/files"
                className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-pink-500 transition-all hover:scale-110 active:scale-95"
              >
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="p-4 space-y-2">
              {RECENT_FILES.map((file) => (
                <div
                  key={file.id}
                  className="group p-4 rounded-2xl flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                      {file.type === "PDF" ? (
                        <Files className="text-red-500" size={20} />
                      ) : file.type === "DOC" ? (
                        <Files className="text-blue-500" size={20} />
                      ) : (
                        <Files className="text-amber-500" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        <span>{file.size}</span>
                        <span className="w-1 h-1 bg-gray-300 dark:bg-white/10 rounded-full" />
                        <span>Uploaded by {file.uploader}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      {file.date}
                    </span>
                    <button className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-pink-500 transition-colors">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="m-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:text-pink-500 transition-colors">
              Explore File Directory
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-linear-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-white opacity-[0.03] -skew-x-12 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black mb-4">Platform Insights</h2>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                User activity has reached an all-time high this quarter. We
                recommend scaling the vector database to support the increased
                chat throughput and document embeddings expected in March.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl flex items-center gap-3 border border-indigo-400/20">
                  <Activity size={18} className="text-indigo-200" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Uptime 99.98%
                  </span>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl flex items-center gap-3 border border-indigo-400/20">
                  <UserCheck size={18} className="text-indigo-200" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Capacity +128%
                  </span>
                </div>
              </div>
            </div>
            <button className="whitespace-nowrap px-8 py-4 bg-white text-indigo-700 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/40 active:scale-95">
              Generate Full Audit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
