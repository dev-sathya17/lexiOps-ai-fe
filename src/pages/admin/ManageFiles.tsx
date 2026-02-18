import { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";
import {
  Search,
  FileText,
  FileCode,
  Table as TableIcon,
  File as FileIcon,
  MoreVertical,
  Download,
  Trash2,
  ArrowUpDown,
  Filter,
  Image as ImageIcon,
  Video,
  Music,
  Layout,
  X,
} from "lucide-react";

interface FileData {
  id: string;
  name: string;
  type: "PDF" | "DOC" | "Spreadsheet" | "Text" | "Image" | "Video" | "Audio";
  size: string; // e.g. "2.4 MB"
  sizeBytes: number; // for sorting
  status: "Stored" | "Processing" | "Failed";
  modifiedDate: string;
}

const INITIAL_FILES: FileData[] = [
  {
    id: "1",
    name: "Project_Proposal.pdf",
    type: "PDF",
    size: "2.4 MB",
    sizeBytes: 2400000,
    status: "Stored",
    modifiedDate: "2024-03-10",
  },
  {
    id: "2",
    name: "Annual_Report_2023.pdf",
    type: "PDF",
    size: "5.1 MB",
    sizeBytes: 5100000,
    status: "Stored",
    modifiedDate: "2024-02-15",
  },
  {
    id: "3",
    name: "Meeting_Notes.docx",
    type: "DOC",
    size: "450 KB",
    sizeBytes: 450000,
    status: "Stored",
    modifiedDate: "2024-03-12",
  },
  {
    id: "4",
    name: "Financial_Q1.xlsx",
    type: "Spreadsheet",
    size: "1.2 MB",
    sizeBytes: 1200000,
    status: "Stored",
    modifiedDate: "2024-03-08",
  },
  {
    id: "5",
    name: "Script_Content.txt",
    type: "Text",
    size: "12 KB",
    sizeBytes: 12000,
    status: "Stored",
    modifiedDate: "2024-03-01",
  },
  {
    id: "6",
    name: "User_Feedback.pdf",
    type: "PDF",
    size: "1.8 MB",
    sizeBytes: 1800000,
    status: "Processing",
    modifiedDate: "2024-03-14",
  },
  {
    id: "7",
    name: "Competitor_Analysis.docx",
    type: "DOC",
    size: "890 KB",
    sizeBytes: 890000,
    status: "Stored",
    modifiedDate: "2024-02-28",
  },
  {
    id: "8",
    name: "Inventory_List.xlsx",
    type: "Spreadsheet",
    size: "2.1 MB",
    sizeBytes: 2100000,
    status: "Failed",
    modifiedDate: "2024-01-20",
  },
  {
    id: "9",
    name: "Profile_Picture.png",
    type: "Image",
    size: "1.2 MB",
    sizeBytes: 1200000,
    status: "Stored",
    modifiedDate: "2024-03-15",
  },
  {
    id: "10",
    name: "Intro_Video.mp4",
    type: "Video",
    size: "75.4 MB",
    sizeBytes: 75400000,
    status: "Stored",
    modifiedDate: "2024-03-05",
  },
  {
    id: "11",
    name: "Theme_Music.mp3",
    type: "Audio",
    size: "4.2 MB",
    sizeBytes: 4200000,
    status: "Stored",
    modifiedDate: "2024-03-13",
  },
  {
    id: "12",
    name: "Product_Specs.docx",
    type: "DOC",
    size: "2.3 MB",
    sizeBytes: 2300000,
    status: "Stored",
    modifiedDate: "2024-03-02",
  },
];

const STORAGE_BREAKDOWN = [
  {
    name: "Images",
    icon: ImageIcon,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    value: "1.04 MB",
  },
  {
    name: "Videos",
    icon: Video,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    value: "71.5 GB",
  },
  {
    name: "Audio",
    icon: Music,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    value: "455.8 MB",
  },
  {
    name: "Documents",
    icon: FileText,
    color: "text-green-500",
    bg: "bg-green-500/10",
    value: "357.2 MB",
  },
  {
    name: "Other",
    icon: Layout,
    color: "text-gray-500",
    bg: "bg-gray-500/10",
    value: "1.27 GB",
  },
];

export default function ManageFiles() {
  const [files] = useState<FileData[]>(INITIAL_FILES);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("name-asc");

  // Refined Filters
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");

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

  const filteredAndSortedFiles = useMemo(() => {
    let result = [...files];

    // Search
    if (searchQuery) {
      result = result.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Date Range Filter
    if (dateFrom) {
      result = result.filter((file) => file.modifiedDate >= dateFrom);
    }
    if (dateTo) {
      result = result.filter((file) => file.modifiedDate <= dateTo);
    }

    // Type Filter
    if (typeFilter !== "All") {
      result = result.filter((file) => file.type === typeFilter);
    }

    // Status Filter
    if (statusFilter !== "All") {
      result = result.filter((file) => file.status === statusFilter);
    }

    // Size Filter (Simplified logic for demonstration)
    if (sizeFilter !== "All") {
      if (sizeFilter === "Small")
        result = result.filter((f) => f.sizeBytes < 1000000); // < 1MB
      if (sizeFilter === "Medium")
        result = result.filter(
          (f) => f.sizeBytes >= 1000000 && f.sizeBytes < 10000000,
        ); // 1MB - 10MB
      if (sizeFilter === "Large")
        result = result.filter((f) => f.sizeBytes >= 10000000); // > 10MB
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "date-desc":
          return (
            new Date(b.modifiedDate).getTime() -
            new Date(a.modifiedDate).getTime()
          );
        case "date-asc":
          return (
            new Date(a.modifiedDate).getTime() -
            new Date(b.modifiedDate).getTime()
          );
        case "size-desc":
          return b.sizeBytes - a.sizeBytes;
        case "size-asc":
          return a.sizeBytes - b.sizeBytes;
        default:
          return 0;
      }
    });

    return result;
  }, [
    files,
    searchQuery,
    sortOption,
    dateFrom,
    dateTo,
    typeFilter,
    statusFilter,
    sizeFilter,
  ]);

  const totalPages = Math.ceil(filteredAndSortedFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedFiles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedFiles, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="text-red-500" size={18} />;
      case "DOC":
        return <FileCode className="text-blue-500" size={18} />;
      case "Spreadsheet":
        return <TableIcon className="text-green-500" size={18} />;
      case "Image":
        return <ImageIcon className="text-blue-400" size={18} />;
      case "Video":
        return <Video className="text-purple-400" size={18} />;
      case "Audio":
        return <Music className="text-orange-400" size={18} />;
      default:
        return <FileIcon className="text-amber-500" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 flex flex-col items-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-12">
        {/* Header & Navbar (Globally Centered) */}
        <div className="space-y-10 w-full flex flex-col items-center">
          <Navbar activePath="/admin/files" />
          <div className="pt-8 text-center max-w-2xl">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
              Manage Files
            </h1>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Organize, search, and manage your uploaded documents in one
              central place.
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
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 font-medium"
                />
              </div>
            </div>

            {/* Files Table Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
              {/* Table Toolbar */}
              <div className="px-8 py-6 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Files
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
                        className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl z-50 p-6 space-y-5 animate-in fade-in zoom-in duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Advanced Filters
                          </p>
                          <button
                            onClick={() => setIsFiltersOpen(false)}
                            className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {/* Date Range */}
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">
                            Date Range
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="date"
                              value={dateFrom}
                              onChange={(e) => setDateFrom(e.target.value)}
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-pink-500"
                              placeholder="From"
                            />
                            <input
                              type="date"
                              value={dateTo}
                              onChange={(e) => setDateTo(e.target.value)}
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-pink-500"
                              placeholder="To"
                            />
                          </div>
                        </div>

                        {/* Type & Status */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">
                              Type
                            </p>
                            <select
                              value={typeFilter}
                              onChange={(e) => setTypeFilter(e.target.value)}
                              className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-pink-500"
                            >
                              <option value="All">All Types</option>
                              <option value="PDF">PDF</option>
                              <option value="DOC">DOC</option>
                              <option value="Spreadsheet">Spreadsheet</option>
                              <option value="Image">Image</option>
                              <option value="Video">Video</option>
                              <option value="Audio">Audio</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">
                              Status
                            </p>
                            <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                              className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-pink-500"
                            >
                              <option value="All">All Status</option>
                              <option value="Stored">Stored</option>
                              <option value="Processing">Processing</option>
                              <option value="Failed">Failed</option>
                            </select>
                          </div>
                        </div>

                        {/* Size Filter */}
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">
                            Size
                          </p>
                          <select
                            value={sizeFilter}
                            onChange={(e) => setSizeFilter(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-pink-500"
                          >
                            <option value="All">Any Size</option>
                            <option value="Small">Small (&lt; 1MB)</option>
                            <option value="Medium">Medium (1MB - 10MB)</option>
                            <option value="Large">Large (&gt; 10MB)</option>
                          </select>
                        </div>

                        <div className="pt-4 border-t border-gray-50 dark:border-white/5">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setDateFrom("");
                              setDateTo("");
                              setTypeFilter("All");
                              setStatusFilter("All");
                              setSizeFilter("All");
                            }}
                            className="w-full py-2 text-xs font-bold text-gray-400 hover:text-pink-500 transition-colors uppercase tracking-widest"
                          >
                            Reset All Filters
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="h-6 w-[1px] bg-gray-200 dark:bg-white/10 mx-1" />
                  <p className="text-sm font-medium text-gray-500">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {filteredAndSortedFiles.length}
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
                          Name <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Type
                      </th>
                      <th
                        className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 cursor-pointer hover:text-pink-500 transition-colors"
                        onClick={() =>
                          setSortOption(
                            sortOption === "size-desc"
                              ? "size-asc"
                              : "size-desc",
                          )
                        }
                      >
                        <div className="flex items-center gap-2">
                          Size <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Status
                      </th>
                      <th
                        className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 cursor-pointer hover:text-pink-500 transition-colors"
                        onClick={() =>
                          setSortOption(
                            sortOption === "date-desc"
                              ? "date-asc"
                              : "date-desc",
                          )
                        }
                      >
                        <div className="flex items-center gap-2">
                          Modified <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                    {paginatedFiles.map((file) => (
                      <tr
                        key={file.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group"
                      >
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform">
                              {getTypeIcon(file.type)}
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                            {file.type}
                          </span>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-400">
                          {file.size}
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                file.status === "Stored"
                                  ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                                  : file.status === "Processing"
                                    ? "bg-blue-500 animate-pulse"
                                    : "bg-red-500"
                              }`}
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {file.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">
                          {file.modifiedDate}
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-pink-500 transition-all">
                              <Download size={18} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all">
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
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="px-6 rounded-xl font-bold"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Space Usage (Right) */}
          <div className="w-full lg:w-85 shrink-0 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Space
                </h3>
              </div>

              {/* Gauge Chart (Semi-circular) */}
              <div className="relative flex justify-center py-4">
                <svg width="200" height="120" viewBox="0 0 200 120">
                  {/* Background Track */}
                  <path
                    d="M 20,110 A 80,80 0 0 1 180,110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="16"
                    strokeLinecap="round"
                    className="text-gray-100 dark:text-white/5"
                  />
                  {/* Progress Path */}
                  <path
                    d="M 20,110 A 80,80 0 0 1 180,110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray="251.32"
                    strokeDashoffset={251.32 * (1 - 74.7 / 120)}
                    className="text-gray-900 dark:text-white transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-x-0 bottom-4 flex flex-col items-center">
                  <p className="text-2xl uppercase font-bold text-gray-900 dark:text-white">
                    74.7 gb
                  </p>
                  <div className="mt-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    of 120 gb
                  </div>
                </div>
              </div>

              {/* Storage Breakdown List */}
              <div className="mt-12 space-y-6">
                {STORAGE_BREAKDOWN.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-110`}
                      >
                        <item.icon className={item.color} size={18} />
                      </div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-400">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade CTA */}
            <div className="bg-linear-to-br from-pink-500 to-violet-600 rounded-3xl p-6 text-white shadow-xl shadow-pink-500/20 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-lg font-bold mb-2 relative z-10">
                Get more storage
              </h4>
              <p className="text-pink-100 text-xs mb-6 leading-relaxed relative z-10">
                Upgrade to Pro and get up to 1TB of storage for your team.
              </p>
              <button className="w-full py-3 bg-white text-pink-600 font-bold rounded-xl text-sm hover:bg-pink-50 transition-colors relative z-10 shadow-lg">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
