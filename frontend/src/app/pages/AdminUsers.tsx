import { useState, useMemo, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, AlertTriangle, Shield, User, Eye, EyeOff, X, Mail, CheckCircle2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import api from "../../lib/api";

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export function AdminUsers() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    id_role: "2", // Default to User
    status: "aktif"
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch {
      toast.error("Gagal memuat data pengguna");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = (user: UserItem, action: 'detail' | 'edit' | 'delete') => {
    setSelectedUser(user);
    if (action === 'detail') setIsDetailModalOpen(true);
    if (action === 'edit') {
      setFormData({
        name: user.name,
        username: "", // Usually we don't fetch username for editing in this list
        email: user.email,
        password: "",
        id_role: user.role === 'Admin' ? "1" : "2",
        status: user.status.toLowerCase()
      });
      setIsEditModalOpen(true);
    }
    if (action === 'delete') setIsDeleteModalOpen(true);
  };

  const handleAddUser = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.username) {
      toast.error("Semua field wajib diisi");
      return;
    }
    try {
      const res = await api.post('/users', {
        nama: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        id_role: formData.id_role
      });
      setUsers([res.data, ...users]);
      setIsAddModalOpen(false);
      toast.success(`Pengguna ${res.data.name} berhasil ditambahkan`);
      setFormData({ name: "", username: "", email: "", password: "", id_role: "2", status: "aktif" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal menambah pengguna");
    }
  };

  const handleEditUser = async () => {
    if (selectedUser) {
      try {
        const res = await api.put(`/users/${selectedUser.id}`, {
          nama: formData.name,
          email: formData.email,
          id_role: formData.id_role,
          status: formData.status,
          password: formData.password || undefined
        });
        setUsers(users.map(u => u.id === selectedUser.id ? res.data : u));
        setIsEditModalOpen(false);
        toast.success(`Data ${res.data.name} berhasil diperbarui`);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Gagal memperbarui pengguna");
      }
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await api.delete(`/users/${selectedUser.id}`);
        setUsers(users.filter(u => u.id !== selectedUser.id));
        setIsDeleteModalOpen(false);
        toast.success(`Pengguna ${selectedUser.name} berhasil dihapus`);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Gagal menghapus pengguna");
      }
    }
  };

  const filteredUsers = useMemo(() => {
    const safeUsers = Array.isArray(users) ? users : [];
    return safeUsers.filter(u => {
      const matchSearch = (u.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || (u.email || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchFilter = filterRole === "Semua" ? true : u.role === filterRole;
      return matchSearch && matchFilter;
    });
  }, [users, searchQuery, filterRole]);

  return (
    <div className="min-h-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#23384f] mb-1">Manajemen Pengguna</h1>
          <p className="text-[#23384f]/60 text-sm">Kelola akses dan peran pengguna dalam sistem.</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#23384f] hover:bg-[#1a2a3b] text-white px-5 py-2.5 rounded-xl font-medium shadow-[0_4px_14px_rgba(35,56,79,0.3)] transition-transform hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Tambah Pengguna Baru
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#fcfaf6] p-4 rounded-t-3xl border border-b-0 border-[#f1efe9] mt-2">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full pl-10 pr-4 py-2 bg-[#fcfaf6] border border-[#f1efe9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#23384f]/20 transition-all text-[#23384f]"
          />
        </div>
        
        <select 
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="bg-[#fcfaf6] border border-[#f1efe9] text-[#23384f]/80 px-4 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#23384f]/20 transition-colors w-full sm:w-auto appearance-none cursor-pointer"
        >
          <option value="Semua">Semua Peran</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      <div className="bg-[#fcfaf6] rounded-b-3xl border border-[#f1efe9] shadow-[0_4px_20px_rgba(35,56,79,0.02)] overflow-hidden -mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfaf6]">
                <th className="px-6 py-4 text-xs font-semibold text-[#23384f]/60 uppercase tracking-wider border-b border-[#f1efe9] w-full">Pengguna</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#23384f]/60 uppercase tracking-wider border-b border-[#f1efe9] whitespace-nowrap">Peran</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#23384f]/60 uppercase tracking-wider border-b border-[#f1efe9] whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#23384f]/60 uppercase tracking-wider border-b border-[#f1efe9] text-left whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1efe9]">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-[#23384f]/60">Memuat data pengguna...</td></tr>
              ) : filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#f1efe9]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-[#23384f] leading-tight">{user.name}</p>
                    <p className="text-xs text-[#23384f]/60 mt-1">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm text-[#23384f]/80">
                      {user.role === "Admin" ? <Shield size={14} className="text-[#23384f]" /> : <User size={14} className="text-[#23384f]/40" />}
                      <span className="font-medium">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${
                      user.status.toLowerCase() === "aktif" ? "bg-green-100 text-green-700" : "bg-[#f1efe9] text-[#23384f]/60"
                    }`}>
                      {user.status.toLowerCase() === "aktif" && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-start gap-2">
                      <button className="p-2 text-[#23384f]/40 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Detail" onClick={() => handleAction(user, 'detail')}><Eye size={16} /></button>
                      <button className="p-2 text-[#23384f]/40 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit" onClick={() => handleAction(user, 'edit')}><Edit size={16} /></button>
                      <button className="p-2 text-[#23384f]/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus" onClick={() => handleAction(user, 'delete')}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-[#23384f]/60">Tidak ada pengguna yang ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#23384f]/20 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-[#fcfaf6] rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-[0_20px_60px_rgba(35,56,79,0.1)] border border-[#f1efe9] text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-5"><AlertTriangle size={32} strokeWidth={2} /></div>
              <h3 className="text-xl font-bold text-[#23384f] mb-2">Yakin mau menghapus?</h3>
              <p className="text-[#23384f]/60 text-sm mb-8">Tindakan ini akan menghapus akses untuk <strong>{selectedUser?.name}</strong> secara permanen.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 px-4 border-2 border-[#f1efe9] text-[#23384f]/80 rounded-xl font-semibold hover:border-[#23384f]/20 transition-colors">Batal</button>
                <button onClick={handleDeleteUser} className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">Ya, Hapus</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#23384f]/20 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-[#fcfaf6] rounded-3xl p-8 max-w-md w-full relative z-10 shadow-[0_20px_60px_rgba(35,56,79,0.1)] border border-[#f1efe9]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f1efe9] text-[#23384f] flex items-center justify-center"><Plus size={20} /></div>
                  <h3 className="text-xl font-bold text-[#23384f]">Tambah Pengguna</h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="text-[#23384f]/40 hover:text-[#23384f] p-2 rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-5">
                <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Nama Lengkap</label>
                  <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} /><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Masukkan nama..." className="w-full pl-11 pr-4 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm focus:ring-2 focus:ring-[#23384f]/20 text-[#23384f]" /></div></div>
                <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Username</label>
                  <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} /><input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} placeholder="Username..." className="w-full pl-11 pr-4 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm focus:ring-2 focus:ring-[#23384f]/20 text-[#23384f]" /></div></div>
                <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Email</label>
                  <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} /><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email@contoh.com" className="w-full pl-11 pr-4 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm focus:ring-2 focus:ring-[#23384f]/20 text-[#23384f]" /></div></div>
                <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Password</label>
                  <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} /><input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Minimal 6 karakter" className="w-full pl-11 pr-11 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm focus:ring-2 focus:ring-[#23384f]/20 text-[#23384f]" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#23384f]/40 p-1">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Peran</label><select value={formData.id_role} onChange={(e) => setFormData({...formData, id_role: e.target.value})} className="w-full px-4 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm appearance-none text-[#23384f]"><option value="1">Admin</option><option value="2">User</option></select></div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 px-4 border-2 border-[#f1efe9] text-[#23384f]/80 rounded-xl font-semibold transition-colors">Batal</button>
                <button onClick={handleAddUser} className="flex-1 py-3 px-4 bg-[#23384f] text-white rounded-xl font-semibold hover:bg-[#1a2a3b] transition-colors">Simpan</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#23384f]/20 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-[#fcfaf6] rounded-3xl p-8 max-w-md w-full relative z-10 shadow-[0_20px_60px_rgba(35,56,79,0.1)] border border-[#f1efe9]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f1efe9] text-[#23384f] flex items-center justify-center"><Edit size={20} /></div>
                  <h3 className="text-xl font-bold text-[#23384f]">Edit Pengguna</h3>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="text-[#23384f]/40 p-2 rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-5">
                <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Nama Lengkap</label><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} /><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm text-[#23384f]" /></div></div>
                <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Email</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} /><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm text-[#23384f]" /></div></div>
                <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Password (Kosongkan jika tidak ganti)</label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} /><input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm text-[#23384f]" /></div></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Peran</label><select value={formData.id_role} onChange={(e) => setFormData({...formData, id_role: e.target.value})} className="w-full px-4 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm appearance-none text-[#23384f]"><option value="1">Admin</option><option value="2">User</option></select></div>
                  <div><label className="text-sm font-semibold text-[#23384f] block mb-2">Status</label><select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 bg-[#fcfaf6] border border-[#f1efe9] rounded-2xl text-sm appearance-none text-[#23384f]"><option value="aktif">Aktif</option><option value="nonaktif">Nonaktif</option></select></div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 px-4 border-2 border-[#f1efe9] text-[#23384f]/80 rounded-xl font-semibold transition-colors">Batal</button>
                <button onClick={handleEditUser} className="flex-1 py-3 px-4 bg-[#23384f] text-white rounded-xl font-semibold hover:bg-[#1a2a3b] transition-colors">Simpan</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#23384f]/20 backdrop-blur-sm" onClick={() => setIsDetailModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-[#fcfaf6] rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-[0_20px_60px_rgba(35,56,79,0.1)] border border-[#f1efe9] text-center">
              <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-6 right-6 text-[#23384f]/40 hover:text-[#23384f] p-2 rounded-xl transition-colors"><X size={18} /></button>
              <div className="mt-4 mb-6">
                <h3 className="text-2xl font-bold text-[#23384f]">{selectedUser?.name}</h3>
                <p className="text-[#23384f]/60 text-sm mt-1">{selectedUser?.email}</p>
              </div>
              <div className="bg-[#fcfaf6] rounded-2xl p-4 mb-8 flex flex-col gap-3 text-left">
                <div className="flex items-center justify-between"><span className="text-[#23384f]/60 text-sm font-medium">Peran Akses</span><span className="text-[#23384f] text-sm font-bold flex items-center gap-1.5">{selectedUser?.role === "Admin" ? <Shield size={14} /> : <User size={14} />}{selectedUser?.role}</span></div>
                <div className="h-[1px] bg-[#f1efe9] w-full"></div>
                <div className="flex items-center justify-between"><span className="text-[#23384f]/60 text-sm font-medium">Status Akun</span><span className={`px-2.5 py-0.5 rounded-md text-xs font-bold flex items-center gap-1.5 ${selectedUser?.status.toLowerCase() === "aktif" ? "bg-green-100 text-green-700" : "bg-[#f1efe9] text-[#23384f]/60"}`}>{selectedUser?.status.toLowerCase() === "aktif" && <CheckCircle2 size={12} />}{selectedUser?.status}</span></div>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} className="w-full py-3 px-4 border-2 border-[#f1efe9] text-[#23384f]/80 rounded-xl font-semibold transition-colors">Tutup Profil</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
