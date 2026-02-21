import { useState, useMemo, useRef, useEffect } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Dialog from "../../components/ui/Dialog";
import {
  Users as UsersIcon,
  UserPlus,
  Search,
  Edit2,
  Trash2,
  TrendingUp,
  UserCheck,
  Clock,
  ArrowUpDown,
  Filter,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Moderator";
  status: "Active" | "Inactive" | "Pending";
  joinedDate: string;
}

const INITIAL_USERS: User[] = [
  {
    id: "1",
    name: "Sathya Prakash",
    email: "sathya@example.com",
    role: "Admin",
    status: "Active",
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    joinedDate: "2024-02-10",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    status: "Inactive",
    joinedDate: "2023-12-05",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Moderator",
    status: "Active",
    joinedDate: "2024-02-28",
  },
  {
    id: "5",
    name: "Alex Brown",
    email: "alex@example.com",
    role: "User",
    status: "Pending",
    joinedDate: "2024-03-01",
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james@example.com",
    role: "User",
    status: "Active",
    joinedDate: "2024-01-20",
  },
  {
    id: "7",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    status: "Active",
    joinedDate: "2024-02-15",
  },
  {
    id: "8",
    name: "Robert Taylor",
    email: "robert@example.com",
    role: "Moderator",
    status: "Inactive",
    joinedDate: "2023-11-30",
  },
  {
    id: "9",
    name: "Linda Moore",
    email: "linda@example.com",
    role: "User",
    status: "Pending",
    joinedDate: "2024-03-05",
  },
  {
    id: "10",
    name: "William Martin",
    email: "william@example.com",
    role: "User",
    status: "Active",
    joinedDate: "2024-01-10",
  },
  {
    id: "11",
    name: "Patricia White",
    email: "patricia@example.com",
    role: "Admin",
    status: "Active",
    joinedDate: "2023-10-25",
  },
  {
    id: "12",
    name: "Richard Thompson",
    email: "richard@example.com",
    role: "User",
    status: "Inactive",
    joinedDate: "2024-02-05",
  },
  {
    id: "13",
    name: "Barbara Garcia",
    email: "barbara@example.com",
    role: "User",
    status: "Active",
    joinedDate: "2024-01-05",
  },
  {
    id: "14",
    name: "Joseph Martinez",
    email: "joseph@example.com",
    role: "Moderator",
    status: "Pending",
    joinedDate: "2024-03-10",
  },
  {
    id: "15",
    name: "Susan Robinson",
    email: "susan@example.com",
    role: "User",
    status: "Active",
    joinedDate: "2024-02-20",
  },
];

export default function ManageUsers() {
  useDocumentTitle("Manage Users");
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("name-asc");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

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

  const ITEMS_PER_PAGE = 10;

  // Stats Data
  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: UsersIcon,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Active Now",
      value: users.filter((u) => u.status === "Active").length,
      icon: UserCheck,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "New This Month",
      value: 2,
      icon: TrendingUp,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      label: "Pending Invites",
      value: users.filter((u) => u.status === "Pending").length,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  // Search, Filter and Sort Logic
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // 1. Search
    if (searchQuery) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 2. Filter by Role
    if (roleFilter !== "All") {
      result = result.filter((user) => user.role === roleFilter);
    }

    // 3. Filter by Status
    if (statusFilter !== "All") {
      result = result.filter((user) => user.status === statusFilter);
    }

    // 4. Sort
    result.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "date-desc":
          return (
            new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
          );
        case "date-asc":
          return (
            new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime()
          );
        default:
          return 0;
      }
    });

    return result;
  }, [users, searchQuery, roleFilter, statusFilter, sortOption]);

  // Pagination Logic
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedUsers.length / ITEMS_PER_PAGE),
  );
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedUsers, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (field: keyof User) => {
    // Legacy support for header clicks
    if (field === "name") {
      setSortOption(sortOption === "name-asc" ? "name-desc" : "name-asc");
    } else if (field === "joinedDate") {
      setSortOption(sortOption === "date-desc" ? "date-asc" : "date-desc");
    }
  };

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Header & Navbar Integration */}
          <div className="space-y-6">
            <Navbar activePath="/admin/users" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Manage Users
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Oversee your team members and their account permissions.
                </p>
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                variant="primary"
                className="px-6 font-bold h-11"
                icon={UserPlus}
              >
                Create User
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm transition-all hover:shadow-md group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm mb-12">
            {/* Table Controls */}
            <div className="p-6 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative max-w-md w-full">
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={Search}
                  className="bg-gray-50 dark:bg-white/5"
                />
              </div>
              <div className="flex items-center gap-3 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Filter}
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="text-xs font-bold uppercase tracking-wider"
                >
                  Filters
                </Button>
                {/* Filters Dropdown */}
                {isFiltersOpen && (
                  <div
                    ref={filterRef}
                    className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10 shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-3 bg-gray-50/50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Advanced Controls
                      </p>
                    </div>

                    <div className="p-2 space-y-4">
                      {/* Sort Section */}
                      {/* <div>
                        <p className="px-3 py-1.5 text-[10px] font-bold text-pink-500 uppercase tracking-wider">
                          Sorting
                        </p>
                        {[
                          { label: "Sort A-Z", value: "name-asc" },
                          { label: "Sort Z-A", value: "name-desc" },
                          { label: "Joined Date (Newest)", value: "date-desc" },
                          { label: "Joined Date (Oldest)", value: "date-asc" },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${sortOption === opt.value ? "bg-pink-500/10 text-pink-500 font-bold" : "hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"}`}
                            onClick={() => {
                              setSortOption(opt.value);
                              setIsFiltersOpen(false);
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div> */}

                      {/* Status Filter */}
                      <div>
                        <p className="px-3 py-1.5 text-[10px] font-bold text-pink-500 uppercase tracking-wider">
                          Status
                        </p>
                        <div className="grid grid-cols-2 gap-1 px-1">
                          {["All", "Active", "Inactive", "Pending"].map(
                            (status) => (
                              <button
                                key={status}
                                className={`px-3 py-1.5 text-xs rounded-md border transition-all ${statusFilter === status ? "bg-pink-500 border-pink-500 text-white font-bold" : "border-gray-100 dark:border-white/10 hover:border-pink-500/50 text-gray-600 dark:text-gray-400"}`}
                                onClick={() => {
                                  setStatusFilter(status);
                                  setCurrentPage(1);
                                }}
                              >
                                {status}
                              </button>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Role Filter */}
                      <div>
                        <p className="px-3 py-1.5 text-[10px] font-bold text-pink-500 uppercase tracking-wider">
                          Role
                        </p>
                        <div className="grid grid-cols-2 gap-1 px-1">
                          {["All", "Admin", "User", "Moderator"].map((role) => (
                            <button
                              key={role}
                              className={`px-3 py-1.5 text-xs rounded-md border transition-all ${roleFilter === role ? "bg-pink-500 border-pink-500 text-white font-bold" : "border-gray-100 dark:border-white/10 hover:border-pink-500/50 text-gray-600 dark:text-gray-400"}`}
                              onClick={() => {
                                setRoleFilter(role);
                                setCurrentPage(1);
                              }}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="h-4 w-[1px] bg-gray-200 dark:bg-white/10" />
                <p className="text-sm text-gray-500 px-2 whitespace-nowrap">
                  Showing{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {filteredAndSortedUsers.length}
                  </span>{" "}
                  users
                </p>
              </div>
            </div>

            {/* Main Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                    <th
                      className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 cursor-pointer hover:text-pink-500 transition-colors"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-2">
                        User Info <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Role
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th
                      className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 cursor-pointer hover:text-pink-500 transition-colors"
                      onClick={() => handleSort("joinedDate")}
                    >
                      <div className="flex items-center gap-2">
                        Joined Date <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group"
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-pink-500/20 to-violet-500/20 flex items-center justify-center text-pink-500 font-bold border border-pink-500/10">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                          ${
                            user.role === "Admin"
                              ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20"
                              : user.role === "Moderator"
                                ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                                : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : user.status === "Pending" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "bg-red-500"}`}
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-500 font-medium tracking-tight">
                        {user.joinedDate}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-3 transition-opacity">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="cursor-pointer p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all shadow-xs"
                            title="Edit User"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setUserToDelete(user)}
                            className="cursor-pointer p-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all shadow-xs"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 bg-gray-50/30 dark:bg-white/[0.01] border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-4"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-4"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={isCreateModalOpen || !!editingUser}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingUser(null);
        }}
        title={editingUser ? "Edit User Account" : "Add New Team Member"}
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingUser(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" className="px-8 font-bold">
              {editingUser ? "Save Changes" : "Create User"}
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <Input
            id="name"
            label="Full Name"
            placeholder="e.g. John Doe"
            defaultValue={editingUser?.name}
            icon={UsersIcon}
            required
          />
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            defaultValue={editingUser?.email}
            icon={Search}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Role
              </label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all">
                <option>User</option>
                <option>Moderator</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all">
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDelete}
        title="Delete User Account"
        description={`Are you sure you want to delete ${userToDelete?.name}'s account? This action cannot be undone and will permanently remove all associated data.`}
        confirmLabel="Destroy Forever"
        variant="danger"
      />
    </div>
  );
}
