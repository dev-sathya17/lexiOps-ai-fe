import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  CreditCard,
  FileText,
  HardDrive,
  Users,
  AlertCircle,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  maxDocuments: number;
  maxStorageMB: number;
  maxMembers: number;
  price: number;
  status: "Active" | "Inactive";
}

const INITIAL_PLANS: Plan[] = [
  {
    id: "1",
    name: "Free",
    maxDocuments: 5,
    maxStorageMB: 50,
    maxMembers: 1,
    price: 0,
    status: "Active",
  },
  {
    id: "2",
    name: "Pro",
    maxDocuments: 100,
    maxStorageMB: 2048,
    maxMembers: 5,
    price: 19,
    status: "Active",
  },
  {
    id: "3",
    name: "Enterprise",
    maxDocuments: 5000,
    maxStorageMB: 51200,
    maxMembers: 50,
    price: 99,
    status: "Active",
  },
];

export default function ManagePlans() {
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Plan, "id">>({
    name: "",
    maxDocuments: 0,
    maxStorageMB: 0,
    maxMembers: 0,
    price: 0,
    status: "Active",
  });

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) =>
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [plans, searchQuery]);

  const handleOpenModal = (plan?: Plan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        maxDocuments: plan.maxDocuments,
        maxStorageMB: plan.maxStorageMB,
        maxMembers: plan.maxMembers,
        price: plan.price,
        status: plan.status,
      });
    } else {
      setEditingPlan(null);
      setFormData({
        name: "",
        maxDocuments: 0,
        maxStorageMB: 0,
        maxMembers: 0,
        price: 0,
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlan) {
      setPlans(
        plans.map((p) =>
          p.id === editingPlan.id ? { ...formData, id: p.id } : p,
        ),
      );
    } else {
      const newPlan: Plan = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setPlans([...plans, newPlan]);
    }
    handleCloseModal();
  };

  const confirmDelete = (plan: Plan) => {
    setPlanToDelete(plan);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (planToDelete) {
      setPlans(plans.filter((p) => p.id !== planToDelete.id));
      setIsDeleteModalOpen(false);
      setPlanToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Header & Navbar */}
        <div className="space-y-6 w-full">
          <Navbar activePath="/admin/plans" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
                Manage Plans
              </h1>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                Configure subscription tiers, limits, and pricing for your
                users.
              </p>
            </div>
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => handleOpenModal()}
              className="w-fit px-6 py-3 rounded-2xl shadow-lg shadow-pink-500/20"
            >
              Add New Plan
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search plans by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 font-medium"
            />
          </div>
        </div>

        {/* Plans Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Plan Name
                  </th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Max Documents
                  </th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Max Storage (MB)
                  </th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Max Members
                  </th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Price
                  </th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {filteredPlans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 group-hover:scale-110 transition-transform">
                          <CreditCard className="text-pink-500" size={18} />
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {plan.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <FileText size={14} className="text-gray-400" />
                        {plan.maxDocuments.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <HardDrive size={14} className="text-gray-400" />
                        {plan.maxStorageMB.toLocaleString()} MB
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Users size={14} className="text-gray-400" />
                        {plan.maxMembers}
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        ${plan.price}/mo
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                          plan.status === "Active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-gray-100 dark:bg-white/5 text-gray-500"
                        }`}
                      >
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(plan)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-pink-500 transition-all"
                          title="Edit Plan"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => confirmDelete(plan)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all"
                          title="Delete Plan"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPlans.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-8 py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      No plans found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingPlan ? "Edit Subscription Plan" : "Create New Plan"}
        footer={
          <>
            <Button variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {editingPlan ? "Update Plan" : "Create Plan"}
            </Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Plan Name"
            id="plan_name"
            placeholder="e.g. Pro, Enterprise"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Max Documents"
              id="max_docs"
              type="number"
              placeholder="0"
              value={formData.maxDocuments.toString()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxDocuments: parseInt(e.target.value) || 0,
                })
              }
              required
            />
            <Input
              label="Max Storage (MB)"
              type="number"
              id="max_storage"
              placeholder="0"
              value={formData.maxStorageMB.toString()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxStorageMB: parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Max Members"
              id="max_members"
              type="number"
              placeholder="0"
              value={formData.maxMembers.toString()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxMembers: parseInt(e.target.value) || 0,
                })
              }
              required
            />
            <Input
              label="Price ($/mo)"
              type="number"
              id="price"
              placeholder="0"
              value={formData.price.toString()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "Active" | "Inactive",
                })
              }
              className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500 text-gray-900 dark:text-white transition-all"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Plan"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              className="bg-red-500 hover:bg-red-600 text-white border-none"
              onClick={handleDelete}
            >
              Delete Plan
            </Button>
          </>
        }
      >
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
              Are you sure?
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              This will permanently delete the{" "}
              <strong>{planToDelete?.name}</strong> plan. Users subscribed to
              this plan might be affected.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
