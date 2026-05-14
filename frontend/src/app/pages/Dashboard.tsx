import { useState, useRef, useEffect } from "react";
import { UploadCloud, File, Play, Eye, Download, Trash2, Clock, CheckCircle2, RefreshCw, Search, X, AlertTriangle, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { StatCard } from "../components/StatCard";
import { toast } from "sonner";
import api from "../../lib/api";
import { useAuth } from "../context/AuthContext";

interface FileItem {
  id: number;
  nama_file: string;
  created_at: string;
  status: "pending" | "processing" | "completed" | "failed";
  file_path: string;
  hasils?: { file_path: string; sample_prediksi: string }[];
}

// Map status Laravel → label Indonesia
const statusLabel: Record<string, string> = {
  pending: "Menunggu",
  processing: "Diproses",
  completed: "Selesai",
  failed: "Gagal",
};

export function Dashboard() {
  const { user } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch data dari Laravel API
  const fetchFiles = async () => {
    try {
      const res = await api.get('/inputs');
      setFiles(res.data.data ?? res.data);
    } catch {
      toast.error("Gagal memuat data file");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  const getStatusBadge = (status: string) => {
    const label = statusLabel[status] || status;
    switch (status) {
      case "completed": return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit"><CheckCircle2 size={12} /> {label}</span>;
      case "processing": return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit"><RefreshCw size={12} className="animate-spin" /> {label}</span>;
      case "pending": return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit"><Clock size={12} /> {label}</span>;
      case "failed": return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit">Gagal</span>;
      default: return <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold w-fit">{label}</span>;
    }
  };

  const handleDeleteClick = (file: FileItem) => { setSelectedFile(file); setIsDeleteModalOpen(true); };
  const handlePreviewClick = (file: FileItem) => { setSelectedFile(file); setIsPreviewModalOpen(true); };

  const confirmDelete = async () => {
    if (!selectedFile) return;
    try {
      await api.delete(`/inputs/${selectedFile.id}`);
      setFiles(files.filter(f => f.id !== selectedFile.id));
      toast.success(`File ${selectedFile.nama_file} berhasil dihapus`);
    } catch {
      toast.error("Gagal menghapus file");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleProcessClick = async (file: FileItem) => {
    if (file.status === "completed") { toast.info("File ini sudah selesai diproses."); return; }
    if (file.status === "processing") { toast.info("File ini sedang diproses."); return; }
    try {
      toast.info(`Memulai proses AI untuk ${file.nama_file}...`);
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: "processing" } : f));
      await api.post(`/inputs/${file.id}/process`);
      toast.success(`Proses AI selesai untuk ${file.nama_file}!`);
      fetchFiles(); // refresh data
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Gagal memproses file";
      toast.error(msg);
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: "failed" } : f));
    }
  };

  const handleDownloadClick = (file: FileItem) => {
    if (file.status !== "completed" || !file.hasils?.length) {
      toast.error("File belum selesai diproses.");
      return;
    }
    const hasilPath = file.hasils[0].file_path;
    window.open(`/storage/${hasilPath}`, '_blank');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    let uploadedFiles: File[] = [];
    if ('dataTransfer' in e) {
      e.preventDefault(); setIsDragging(false);
      if (e.dataTransfer.files) uploadedFiles = Array.from(e.dataTransfer.files);
    } else {
      if (e.target.files) uploadedFiles = Array.from(e.target.files);
    }
    if (uploadedFiles.length === 0) return;

    setIsUploading(true);
    for (const file of uploadedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await api.post('/inputs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success(`${file.name} berhasil diunggah`);
      } catch (err: any) {
        toast.error(`Gagal unggah ${file.name}: ${err?.response?.data?.message || 'Error'}`);
      }
    }
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    fetchFiles();
  };

  const safeFiles = Array.isArray(files) ? files : [];

  const filteredFiles = safeFiles.filter(f => {
    const matchesSearch = f.nama_file.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus ? f.status === filterStatus : true;
    const matchesDate = f.created_at ? f.created_at.includes(filterDate) : true;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalUpload = safeFiles.length;
  const totalProcessing = safeFiles.filter(f => f.status === "processing").length;
  const totalCompleted = safeFiles.filter(f => f.status === "completed").length;

  return (
    <div className="min-h-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div>
        <h1 className="text-2xl font-bold text-[#23384f] mb-1">Workspace</h1>
        <p className="text-[#23384f]/60 text-sm">Unggah dan pantau dokumen surat kabar Anda.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Unggah" value={totalUpload.toString()} icon={File} colorScheme="blue" />
        <StatCard title="Sedang Diproses" value={totalProcessing.toString()} icon={RefreshCw} colorScheme="orange" />
        <StatCard title="Selesai" value={totalCompleted.toString()} icon={CheckCircle2} colorScheme="green" />
        <StatCard title="Update Terakhir" value="Hari ini" icon={Clock} colorScheme="purple" />
      </div>

      {/* Upload Zone */}
      <div
        className={`w-full rounded-[2rem] border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center p-12 cursor-pointer relative ${
          isDragging ? "border-[#23384f] bg-[#fcfaf6] scale-[1.01]" : "border-[#23384f]/20 hover:border-[#23384f]/50 hover:bg-[#fcfaf6] bg-[#fcfaf6]/50"
        } ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileUpload}
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" ref={fileInputRef} className="hidden" multiple accept=".pdf,.png,.jpg,.jpeg,.zip" onChange={handleFileUpload} />
        <div className="w-20 h-20 rounded-full bg-[#f1efe9] flex items-center justify-center mb-6 text-[#23384f] shadow-inner">
          <UploadCloud size={40} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-[#23384f] mb-2">{isUploading ? 'Mengunggah...' : 'Tarik dan Lepas dokumen ke sini'}</h3>
        <p className="text-[#23384f]/60 text-sm mb-6 text-center max-w-md">
          Mendukung format PDF, PNG, JPG, atau file ZIP (Batch). AI akan otomatis mendeteksi tata letak surat kabar.
        </p>
        <button type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          className="px-6 py-2.5 bg-[#23384f] text-white rounded-full font-medium hover:bg-[#1a2a3b] transition-colors shadow-md">
          Pilih File Manual
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-[#fcfaf6] rounded-3xl border border-[#f1efe9] shadow-[0_4px_20px_rgba(35,56,79,0.02)] overflow-hidden">
        <div className="p-6 border-b border-[#f1efe9] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-[#23384f] shrink-0">Riwayat File</h3>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 bg-[#fcfaf6] border border-[#f1efe9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#23384f]/20 text-[#23384f]/80 h-[38px]" />
            <div className="relative w-full sm:w-auto">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 pr-8 bg-[#fcfaf6] border border-[#f1efe9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#23384f]/20 text-[#23384f]/80 h-[38px] appearance-none">
                <option value="">Semua Status</option>
                <option value="completed">Selesai</option>
                <option value="processing">Diproses</option>
                <option value="pending">Menunggu</option>
                <option value="failed">Gagal</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-[#23384f]/40 pointer-events-none" size={14} />
            </div>
            <div className="relative w-full sm:w-auto sm:max-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={16} />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari file..."
                className="w-full pl-9 pr-4 py-2 bg-[#fcfaf6] border border-[#f1efe9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#23384f]/20 text-[#23384f]/80 h-[38px]" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfaf6]">
                <th className="px-6 py-4 text-xs font-semibold text-[#23384f]/60 uppercase tracking-wider border-b border-[#f1efe9]">Nama File</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#23384f]/60 uppercase tracking-wider border-b border-[#f1efe9]">Waktu Unggah</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#23384f]/60 uppercase tracking-wider border-b border-[#f1efe9]">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#23384f]/60 uppercase tracking-wider border-b border-[#f1efe9]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1efe9]">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-[#23384f]/60">Memuat data...</td></tr>
              ) : filteredFiles.length > 0 ? filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-[#f1efe9]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f1efe9] flex items-center justify-center text-[#23384f]/60"><File size={18} /></div>
                      <div>
                        <p className="text-sm font-semibold text-[#23384f]">{file.nama_file}</p>
                        <p className="text-xs text-[#23384f]/60 mt-0.5">{file.created_at?.split('T')[0]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#23384f]/80">{file.created_at?.split('T')[0]}</td>
                  <td className="px-6 py-4">{getStatusBadge(file.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-start gap-2">
                      <button onClick={() => handleProcessClick(file)}
                        className={`p-2 rounded-lg transition-colors ${file.status === 'pending' || file.status === 'failed' ? 'text-[#23384f]/40 hover:text-[#23384f] hover:bg-[#f1efe9]' : 'text-[#f1efe9] cursor-not-allowed'}`}
                        title="Mulai Proses"><Play size={16} /></button>
                      <button onClick={() => file.status === 'completed' ? handlePreviewClick(file) : toast.error("File belum selesai diproses.")}
                        className={`p-2 rounded-lg transition-colors ${file.status === 'completed' ? 'text-[#23384f]/40 hover:text-blue-600 hover:bg-blue-50' : 'text-[#f1efe9] cursor-not-allowed'}`}
                        title="Lihat Hasil"><Eye size={16} /></button>
                      <button onClick={() => handleDownloadClick(file)}
                        className={`p-2 rounded-lg transition-colors ${file.status === 'completed' ? 'text-[#23384f]/40 hover:text-green-600 hover:bg-green-50' : 'text-[#f1efe9] cursor-not-allowed'}`}
                        title="Unduh"><Download size={16} /></button>
                      <button className="p-2 text-[#23384f]/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus" onClick={() => handleDeleteClick(file)}>
                        <Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-[#23384f]/60">Tidak ada file yang ditemukan.</td></tr>
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
              <h3 className="text-xl font-bold text-[#23384f] mb-2">Hapus File?</h3>
              <p className="text-[#23384f]/60 text-sm mb-8 leading-relaxed">Yakin ingin menghapus <strong>{selectedFile?.nama_file}</strong>? Tindakan ini tidak dapat dikembalikan.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 px-4 border-2 border-[#f1efe9] text-[#23384f]/80 rounded-xl font-semibold hover:border-[#23384f]/20 transition-colors">Batal</button>
                <button onClick={confirmDelete} className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">Hapus</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewModalOpen && selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#23384f]/60 backdrop-blur-sm" onClick={() => setIsPreviewModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-[#fcfaf6] rounded-[2rem] max-w-4xl w-full max-h-[90vh] relative z-10 shadow-[0_20px_60px_rgba(35,56,79,0.2)] flex flex-col overflow-hidden">
              <div className="p-6 border-b border-[#f1efe9] flex items-center justify-between bg-[#fcfaf6] shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fcfaf6] text-[#23384f] flex items-center justify-center border border-[#f1efe9]"><File size={18} /></div>
                  <div>
                    <h3 className="font-bold text-[#23384f] text-lg leading-tight">{selectedFile?.nama_file}</h3>
                    <p className="text-[#23384f]/60 text-xs mt-0.5">Hasil segmentasi AI</p>
                  </div>
                </div>
                <button onClick={() => setIsPreviewModalOpen(false)} className="p-2.5 bg-[#fcfaf6] border border-[#f1efe9] text-[#23384f]/40 hover:text-[#23384f] rounded-xl transition-all"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 bg-[#f1efe9] flex items-center justify-center min-h-[400px]">
                {selectedFile.hasils?.[0]?.sample_prediksi ? (
                  <img src={`/storage/${selectedFile.hasils[0].sample_prediksi}`} alt="Hasil Segmentasi" className="max-h-[60vh] object-contain block rounded shadow-lg" />
                ) : (
                  <p className="text-[#23384f]/60">Preview tidak tersedia</p>
                )}
              </div>
              <div className="p-5 border-t border-[#f1efe9] flex justify-end gap-3 bg-[#fcfaf6] shrink-0">
                <button onClick={() => handleDownloadClick(selectedFile)} className="px-5 py-2.5 bg-[#23384f] text-white rounded-xl font-medium hover:bg-[#1a2a3b] shadow-[0_4px_14px_rgba(35,56,79,0.3)] transition-colors flex items-center gap-2">
                  <Download size={16} /> Unduh Hasil
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
