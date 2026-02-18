import { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";
import {
  Search,
  Users,
  MoreVertical,
  Trash2,
  ArrowUpDown,
  Filter,
  X,
  Building2,
  Calendar,
} from "lucide-react";

interface WorkspaceData {
  id: string;
  name: string;
  members: number;
  storageUsed: string; // e.g. "45.2 GB"
  storageUsedBytes: number; // for sorting
  storageLimit: number; // in GB
  status: "Active" | "Inactive";
  lastActivity: string;
}

const INITIAL_WORKSPACES: WorkspaceData[] = [
  {
    id: "1",
    name: "Design Team",
    members: 12,
    storageUsed: "45.2 GB",
    storageUsedBytes: 45200000000,
    storageLimit: 100,
    status: "Active",
    lastActivity: "2024-03-15",
  },
  {
    id: "2",
    name: "Engineering Core",
    members: 45,
    storageUsed: "120.5 GB",
    storageUsedBytes: 120500000000,
    storageLimit: 500,
    status: "Active",
    lastActivity: "2024-03-14",
  },
  {
    id: "3",
    name: "Marketing Labs",
    members: 8,
    storageUsed: "12.8 GB",
    storageUsedBytes: 12800000000,
    storageLimit: 50,
    status: "Active",
    lastActivity: "2024-03-12",
  },
  {
    id: "4",
    name: "Sales Force",
    members: 24,
    storageUsed: "5.4 GB",
    storageUsedBytes: 5400000000,
    storageLimit: 100,
    status: "Active",
    lastActivity: "2024-03-10",
  },
  {
    id: "5",
    name: "Customer Success",
    members: 15,
    storageUsed: "2.1 GB",
    storageUsedBytes: 2100000000,
    storageLimit: 50,
    status: "Inactive",
    lastActivity: "2024-02-28",
  },
  {
    id: "6",
    name: "Product Strategy",
    members: 6,
    storageUsed: "18.9 GB",
    storageUsedBytes: 18900000000,
    storageLimit: 100,
    status: "Active",
    lastActivity: "2024-03-13",
  },
  {
    id: "7",
    name: "Human Resources",
    members: 4,
    storageUsed: "1.2 GB",
    storageUsedBytes: 1200000000,
    storageLimit: 20,
    status: "Active",
    lastActivity: "2024-03-01",
  },
  {
    id: "8",
    name: "Legal & Compliance",
    members: 3,
    storageUsed: "0.8 GB",
    storageUsedBytes: 800000000,
    storageLimit: 20,
    status: "Active",
    lastActivity: "2024-03-05",
  },
];

export default function ManageWorkspaces() {
  const [workspaces] = useState<WorkspaceData[]>(INITIAL_WORKSPACES);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("name-asc");
  const [statusFilter, setStatusFilter] = useState("All");

  const filterRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false);
      }
    }
    if (isFiltersOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFiltersOpen]);

  const filteredAndSortedWorkspaces = useMemo(() => {
    let result = [...workspaces];

    // Search
    if (searchQuery) {
      result = result.filter((ws) =>
        ws.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Status Filter
    if (statusFilter !== "All") {
      result = result.filter((ws) => ws.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "members-desc":
          return b.members - a.members;
        case "members-asc":
          return a.members - b.members;
        case "storage-desc":
          return b.storageUsedBytes - a.storageUsedBytes;
        case "storage-asc":
          return a.storageUsedBytes - b.storageUsedBytes;
        case "activity-desc":
          return (
            new Date(b.lastActivity).getTime() -
            new Date(a.lastActivity).getTime()
          );
        default:
          return 0;
      }
    });

    return result;
  }, [workspaces, searchQuery, sortOption, statusFilter]);

  const totalPages = Math.ceil(
    filteredAndSortedWorkspaces.length / ITEMS_PER_PAGE,
  );
  const paginatedWorkspaces = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedWorkspaces.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedWorkspaces, currentPage]);

  const totalStorageUsed = useMemo(() => {
    return workspaces.reduce((acc, ws) => acc + ws.storageUsedBytes, 0);
  }, [workspaces]);

  const totalStorageLimit = 1000 * 1000 * 1000 * 1000; // 1TB for org

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12">
        {/* Header & Navbar */}
        <div className="space-y-6 w-full">
          <Navbar activePath="/admin/workspaces" />
          <div className="pt-8 text-center max-w-2xl">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
              Manage Workspaces
            </h1>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Manage your teams, monitor storage usage, and oversee workspace
              activity across your organization.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
          {/* Main Content (Left) */}
          <div className="flex-1 space-y-8">
            {/* Search Bar */}
            <div className="relative w-full">
              <div className="relative">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search workspaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 font-medium"
                />
              </div>
            </div>

            {/* Workspaces Table Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
              {/* Table Toolbar */}
              <div className="px-8 py-6 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Workspaces
                </h2>
                <div className="flex items-center gap-3 relative">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Filter}
                      onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                      className={`text-xs font-bold uppercase tracking-wider h-10 px-4 ${isFiltersOpen ? "text-pink-500" : ""}`}
                    >
                      Filters
                    </Button>

                    {/* Advanced Filters Dropdown */}
                    {isFiltersOpen && (
                      <div
                        ref={filterRef}
                        className="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl z-50 p-6 space-y-5 animate-in fade-in zoom-in duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Filters
                          </p>
                          <button
                            onClick={() => setIsFiltersOpen(false)}
                            className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">
                              Status
                            </p>
                            <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                              className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-pink-500 text-gray-900 dark:text-white"
                            >
                              <option value="All">All Status</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50 dark:border-white/5">
                          <button
                            onClick={() => {
                              setStatusFilter("All");
                            }}
                            className="w-full py-2 text-xs font-bold text-gray-400 hover:text-pink-500 transition-colors uppercase tracking-widest"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="h-6 w-[1px] bg-gray-200 dark:bg-white/10 mx-1" />
                  <p className="text-sm font-medium text-gray-500">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {filteredAndSortedWorkspaces.length}
                    </span>{" "}
                    Total
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                      <th
                        className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 cursor-pointer hover:text-pink-500 transition-colors"
                        onClick={() =>
                          setSortOption(
                            sortOption === "name-asc"
                              ? "name-desc"
                              : "name-asc",
                          )
                        }
                      >
                        <div className="flex items-center gap-2">
                          Workspace <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th
                        className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 cursor-pointer hover:text-pink-500 transition-colors"
                        onClick={() =>
                          setSortOption(
                            sortOption === "members-desc"
                              ? "members-asc"
                              : "members-desc",
                          )
                        }
                      >
                        <div className="flex items-center gap-2">
                          Members <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th
                        className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 cursor-pointer hover:text-pink-500 transition-colors"
                        onClick={() =>
                          setSortOption(
                            sortOption === "storage-desc"
                              ? "storage-asc"
                              : "storage-desc",
                          )
                        }
                      >
                        <div className="flex items-center gap-2">
                          Storage <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Status
                      </th>
                      <th
                        className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 cursor-pointer hover:text-pink-500 transition-colors"
                        onClick={() => setSortOption("activity-desc")}
                      >
                        <div className="flex items-center gap-2">
                          Last Activity <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                    {paginatedWorkspaces.map((ws) => (
                      <tr
                        key={ws.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group"
                      >
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform">
                              <Building2 className="text-pink-500" size={18} />
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {ws.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {ws.members}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="flex flex-col gap-1.5 w-32">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                              <span className="text-gray-400">
                                {ws.storageUsed}
                              </span>
                              <span className="text-gray-500">
                                {Math.round(
                                  (ws.storageUsedBytes /
                                    (ws.storageLimit * 1000000000)) *
                                    100,
                                )}
                                %
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-linear-to-r from-pink-500 to-violet-500 transition-all duration-1000"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (ws.storageUsedBytes /
                                      (ws.storageLimit * 1000000000)) *
                                      100,
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                              ws.status === "Active"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-gray-100 dark:bg-white/5 text-gray-500"
                            }`}
                          >
                            {ws.status}
                          </span>
                        </td>
                        <td className="px-12 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <Calendar size={14} className="text-gray-400" />
                            {ws.lastActivity}
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-pink-500 transition-all">
                              <Trash2 size={18} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-8 py-6 bg-gray-50/30 dark:bg-white/[0.01] border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Page{" "}
                  <span className="text-gray-900 dark:text-white">
                    {currentPage}
                  </span>{" "}
                  of {totalPages || 1}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-6 rounded-xl font-bold bg-white dark:bg-transparent"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="px-6 rounded-xl font-bold"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Stats (Right) */}
          <div className="w-full lg:w-85 shrink-0 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
                Organization Usage
              </h3>

              {/* Gauge Chart (Symmetrical like ManageFiles) */}
              <div className="relative flex justify-center py-4">
                <svg width="200" height="120" viewBox="0 0 200 120">
                  <path
                    d="M 20,110 A 80,80 0 0 1 180,110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="16"
                    strokeLinecap="round"
                    className="text-gray-100 dark:text-white/5"
                  />
                  <path
                    d="M 20,110 A 80,80 0 0 1 180,110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray="251.32"
                    strokeDashoffset={
                      251.32 * (1 - totalStorageUsed / totalStorageLimit)
                    }
                    className="text-pink-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-4 flex flex-col items-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white uppercase">
                    {Math.round(totalStorageUsed / 1000000000)} GB
                  </p>
                  <div className="mt-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    of 1 TB
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="mt-12 space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Users className="text-blue-500" size={16} />
                    </div>
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                      Total Members
                    </span>
                  </div>
                  <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {workspaces.reduce((acc, ws) => acc + ws.members, 0)}
                  </span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Building2 className="text-purple-500" size={16} />
                    </div>
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                      Active Teams
                    </span>
                  </div>
                  <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {workspaces.filter((ws) => ws.status === "Active").length}
                  </span>
                </div>
              </div>
            </div>

            {/* Premium CTA */}
            <div className="bg-linear-to-br from-violet-600 to-pink-500 rounded-3xl p-6 text-white shadow-xl shadow-violet-500/20 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-lg font-bold mb-2">Workspace Analytics</h4>
              <p className="text-violet-100 text-xs mb-6 leading-relaxed">
                Get deeper insights into team productivity and storage trends
                with advanced analytics.
              </p>
              <button className="w-full py-3 bg-white text-violet-600 font-bold rounded-xl text-sm hover:bg-violet-50 transition-colors shadow-lg">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
