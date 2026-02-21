import { useState, useMemo } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { Search, Plus, Trash2, Edit2, Shield, Key, Check } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
}

interface Action {
  id: string;
  name: string;
  description: string;
}

interface Permission {
  roleId: string;
  actionId: string;
}

const INITIAL_ROLES: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access with all permissions.",
  },
  {
    id: "2",
    name: "Editor",
    description:
      "Can manage content and files but cannot change system settings.",
  },
  {
    id: "3",
    name: "Viewer",
    description: "Read-only access to most parts of the system.",
  },
];

const INITIAL_ACTIONS: Action[] = [
  {
    id: "a1",
    name: "view_dashboard",
    description: "Access the main admin dashboard.",
  },
  {
    id: "a2",
    name: "manage_users",
    description: "Create, edit, and delete user accounts.",
  },
  { id: "a3", name: "manage_files", description: "Upload and delete files." },
  {
    id: "a4",
    name: "manage_plans",
    description: "Modify subscription plans and pricing.",
  },
];

const INITIAL_PERMISSIONS: Permission[] = [
  { roleId: "1", actionId: "a1" },
  { roleId: "1", actionId: "a2" },
  { roleId: "1", actionId: "a3" },
  { roleId: "1", actionId: "a4" },
  { roleId: "2", actionId: "a1" },
  { roleId: "2", actionId: "a3" },
  { roleId: "3", actionId: "a1" },
];

export default function ManageRBAC() {
  useDocumentTitle("Access Control");
  const [activeTab, setActiveTab] = useState<
    "roles" | "actions" | "permissions"
  >("roles");
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [actions, setActions] = useState<Action[]>(INITIAL_ACTIONS);
  const [permissions, setPermissions] =
    useState<Permission[]>(INITIAL_PERMISSIONS);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{
    type: "role" | "action";
    data: any;
  } | null>(null);

  // Tab-specific filtered data
  const filteredRoles = useMemo(
    () =>
      roles.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [roles, searchQuery],
  );

  const filteredActions = useMemo(
    () =>
      actions.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [actions, searchQuery],
  );

  const handleOpenModal = (type: "role" | "action", item?: any) => {
    setEditingItem({ type, data: item || { name: "", description: "" } });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = editingItem?.data;
    if (editingItem?.type === "role") {
      if (data.id) {
        setRoles(roles.map((r) => (r.id === data.id ? data : r)));
      } else {
        setRoles([
          ...roles,
          { ...data, id: Math.random().toString(36).substr(2, 9) },
        ]);
      }
    } else if (editingItem?.type === "action") {
      if (data.id) {
        setActions(actions.map((a) => (a.id === data.id ? data : a)));
      } else {
        setActions([
          ...actions,
          { ...data, id: "a" + Math.random().toString(36).substr(2, 9) },
        ]);
      }
    }
    setIsModalOpen(false);
  };

  const togglePermission = (roleId: string, actionId: string) => {
    const exists = permissions.find(
      (p) => p.roleId === roleId && p.actionId === actionId,
    );
    if (exists) {
      setPermissions(
        permissions.filter(
          (p) => !(p.roleId === roleId && p.actionId === actionId),
        ),
      );
    } else {
      setPermissions([...permissions, { roleId, actionId }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        <Navbar activePath="/admin/rbac" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
              RBAC Management
            </h1>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Control access by defining roles, actions, and assigning
              permissions.
            </p>
          </div>
          <div className="flex bg-white dark:bg-zinc-900 p-1.5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
            {(["roles", "actions", "permissions"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery("");
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Action Button */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 font-medium"
            />
          </div>
          {activeTab !== "permissions" && (
            <Button
              variant="primary"
              icon={Plus}
              onClick={() =>
                handleOpenModal(activeTab === "roles" ? "role" : "action")
              }
              className="px-6 py-4 rounded-2xl"
            >
              Add {activeTab === "roles" ? "Role" : "Action"}
            </Button>
          )}
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
          {activeTab === "roles" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Role Name
                    </th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Description
                    </th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredRoles.map((role) => (
                    <tr
                      key={role.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group"
                    >
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500">
                            <Shield size={18} />
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white uppercase">
                            {role.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {role.description}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal("role", role)}
                            className="p-2 text-gray-400 hover:text-pink-500"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setRoles(roles.filter((r) => r.id !== role.id))
                            }
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "actions" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Action Name
                    </th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Description
                    </th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredActions.map((action) => (
                    <tr
                      key={action.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group"
                    >
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Key size={18} />
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {action.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {action.description}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal("action", action)}
                            className="p-2 text-gray-400 hover:text-pink-500"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setActions(
                                actions.filter((a) => a.id !== action.id),
                              )
                            }
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "permissions" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left table-fixed">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                    <th className="w-1/4 px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 bg-white dark:bg-zinc-900 sticky left-0 z-10">
                      Actions / Roles
                    </th>
                    {roles.map((role) => (
                      <th
                        key={role.id}
                        className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center"
                      >
                        {role.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {actions.map((action) => (
                    <tr
                      key={action.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors"
                    >
                      <td className="px-8 py-5 bg-white dark:bg-zinc-900 sticky left-0 z-10">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {action.name}
                          </span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-tight line-clamp-1">
                            {action.description}
                          </span>
                        </div>
                      </td>
                      {roles.map((role) => (
                        <td key={role.id} className="px-8 py-5 text-center">
                          <button
                            onClick={() => togglePermission(role.id, action.id)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all ${
                              permissions.find(
                                (p) =>
                                  p.roleId === role.id &&
                                  p.actionId === action.id,
                              )
                                ? "bg-green-500/20 text-green-500 shadow-sm"
                                : "bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-zinc-700 hover:text-gray-400"
                            }`}
                          >
                            <Check size={16} />
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${editingItem?.data?.id ? "Edit" : "Add"} ${editingItem?.type === "role" ? "Role" : "Action"}`}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="item_name"
            label="Name"
            value={editingItem?.data?.name || ""}
            onChange={(e) =>
              setEditingItem({
                ...editingItem!,
                data: { ...editingItem!.data, name: e.target.value },
              })
            }
            placeholder={`e.g. ${editingItem?.type === "role" ? "Super Admin" : "delete_records"}`}
            required
          />
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
              Description
            </label>
            <textarea
              className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500 text-gray-900 dark:text-white transition-all min-h-[100px]"
              value={editingItem?.data?.description || ""}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem!,
                  data: { ...editingItem!.data, description: e.target.value },
                })
              }
              placeholder="What does this role/action do?"
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
