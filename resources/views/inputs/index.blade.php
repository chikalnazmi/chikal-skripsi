@extends('layouts.admin')

@section('header_title', 'Data Input')

@section('content')

<div class="cards-grid" style="grid-template-columns: 1fr; margin-bottom: 20px;">
    <div class="pastel-card bg-orange" style="min-height: auto; padding: 25px;">
        <h3 class="card-title" style="margin-bottom: 5px;"><i class="ph-bold ph-upload-simple"></i> Upload File Baru</h3>
        <p class="card-bottom" style="margin-bottom: 20px;">Unggah file koran (PNG, JPG, JPEG, PDF, atau ZIP) untuk diproses oleh sistem AI.</p>
        
        <form action="{{ route('inputs.store') }}" method="POST" enctype="multipart/form-data" style="display:flex; gap:15px; align-items:center;">
            @csrf
            <div style="flex:1; background:var(--white); padding: 10px; border-radius:15px;">
                <input type="file" name="file" accept=".png,.jpg,.jpeg,.pdf,.zip" required class="form-control" style="border:none; background:transparent;">
            </div>
            <button type="submit" class="btn btn-dark" style="padding: 18px 30px;">
                Upload <i class="ph-bold ph-arrow-right"></i>
            </button>
        </form>
    </div>
</div>

<div class="content-box">
    <h2 style="margin-bottom: 15px;">Riwayat Data</h2>
    
    <div style="margin-bottom: 20px;">
        <!-- Filter Form -->
        <form action="{{ route('inputs.index') }}" method="GET" style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content:flex-start;">
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Cari file / uploader..." class="form-control" style="width:200px; padding:8px; border-radius:8px; border:1px solid #ccc;">
            
            <select name="status" class="form-control" style="width:150px; padding:8px; border-radius:8px; border:1px solid #ccc;">
                <option value="">Semua Status</option>
                <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pending</option>
                <option value="processing" {{ request('status') == 'processing' ? 'selected' : '' }}>Processing</option>
                <option value="completed" {{ request('status') == 'completed' ? 'selected' : '' }}>Completed</option>
                <option value="failed" {{ request('status') == 'failed' ? 'selected' : '' }}>Failed</option>
            </select>
            <input type="date" name="date" value="{{ request('date') }}" class="form-control" style="width:150px; padding:8px; border-radius:8px; border:1px solid #ccc;">
            
            <button type="submit" class="btn btn-dark btn-sm" style="padding:8px 15px;"><i class="ph-bold ph-funnel"></i> Filter</button>
            <a href="{{ route('inputs.index') }}" class="btn btn-outline btn-sm" style="padding:8px 15px;"><i class="ph-bold ph-arrows-clockwise"></i> Reset</a>
        </form>
    </div>
    <div style="overflow-x: auto;">
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    @if(auth()->user()->id_role == 1)
                    <th>User</th>
                    @endif
                    <th>Nama File</th>
                    <th>Status</th>
                    <th>Waktu Upload</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                @forelse($inputs as $index => $input)
                <tr>
                    <td style="font-weight:600;">{{ $index + 1 }}</td>
                    @if(auth()->user()->id_role == 1)
                    <td style="font-weight:600; display:flex; align-items:center; gap:10px;">
                        @php $uName = $input->user->nama ?? 'Unknown'; @endphp
                        <div class="avatar" style="width:30px; height:30px; font-size:12px; background: {{ ($input->user->id_role ?? 2) == 1 ? 'var(--card-pink)' : 'var(--card-mint)' }};">
                            {{ substr($uName, 0, 1) }}
                        </div>
                        {{ $uName }}
                    </td>
                    @endif
                    <td style="font-weight:500;">{{ $input->nama_file }}</td>
                    <td>
                        @if($input->status == 'completed')
                            <span style="background:var(--card-mint); color:#0d4a23; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight:600;">
                                <i class="ph-bold ph-check"></i> Completed
                            </span>
                        @elseif($input->status == 'processing')
                            <span style="background:#d4e0ff; color:#1a3a8a; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight:600;">
                                <i class="ph-bold ph-circle-notch"></i> Processing...
                            </span>
                        @elseif($input->status == 'failed')
                            <span style="background:#ffd4d4; color:#8a1a1a; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight:600;">
                                <i class="ph-bold ph-warning"></i> Failed
                            </span>
                        @else
                            <span style="background:var(--card-orange); color:#8a5e18; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight:600;">
                                <i class="ph-bold ph-clock"></i> Pending
                            </span>
                        @endif
                    </td>
                    <td style="color:#666;">{{ $input->created_at->format('d M Y, H:i') }}</td>
                    <td>
                        <div style="display:flex; gap:10px; flex-wrap:wrap;">
                            {{-- Process Button (for pending/failed) --}}
                            @if(in_array($input->status, ['pending', 'failed']))
                                <form action="{{ route('inputs.process', $input->id) }}" method="POST" onsubmit="this.querySelector('button').disabled=true; this.querySelector('button').innerHTML='<i class=\'ph-bold ph-circle-notch\'></i> Memproses...';">
                                    @csrf
                                    <button type="submit" class="btn btn-dark btn-sm" style="border:none; padding: 8px 16px;">
                                        <i class="ph-bold ph-play"></i> Proses
                                    </button>
                                </form>
                            @endif

                            {{-- Preview & Download (for completed) --}}
                            @if($input->status == 'completed' && $input->hasils->count() > 0)
                                @php $hasil = $input->hasils->first(); @endphp
                                
                                {{-- Preview Button --}}
                                @if($hasil->sample_prediksi)
                                    <button type="button" class="btn btn-outline btn-sm" onclick="togglePreview({{ $input->id }})" title="Lihat Preview" style="padding: 8px 16px;">
                                        <i class="ph-bold ph-eye"></i> Preview
                                    </button>
                                @endif

                                {{-- Download ZIP --}}
                                <a href="{{ asset('storage/' . $hasil->file_path) }}" class="btn btn-outline btn-sm" download title="Download Hasil ZIP" style="padding: 8px 16px;">
                                    <i class="ph-bold ph-download-simple"></i> Unduh ZIP
                                </a>
                            @endif

                            {{-- Delete --}}
                            <form action="{{ route('inputs.destroy', $input->id) }}" method="POST" onsubmit="return confirm('Yakin ingin menghapus data ini secara permanen?');">
                                @csrf @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" style="border:none; padding: 8px 16px;">
                                    <i class="ph-bold ph-trash"></i> Hapus
                                </button>
                            </form>
                        </div>

                        {{-- Preview Image (hidden by default) --}}
                        @if($input->status == 'completed' && $input->hasils->count() > 0 && $input->hasils->first()->sample_prediksi)
                            <div id="preview-{{ $input->id }}" style="display:none; margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 15px;">
                                <p style="font-weight: 600; margin-bottom: 10px; color: #333;">
                                    <i class="ph-bold ph-image"></i> Hasil Terbaik (Preview)
                                </p>
                                <img 
                                    src="{{ asset('storage/' . $input->hasils->first()->sample_prediksi) }}" 
                                    alt="Preview Segmentasi" 
                                    style="max-width: 100%; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
                                >
                            </div>
                        @endif
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 40px;">
                        <i class="ph-bold ph-file-dashed" style="font-size: 32px; margin-bottom: 10px;"></i><br>
                        Belum ada data file yang diunggah.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
    
    <!-- Pagination Links -->
    <div style="margin-top: 20px;">
        {{ $inputs->links() }}
    </div>
</div>

<script>
function togglePreview(inputId) {
    const el = document.getElementById('preview-' + inputId);
    if (el) {
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
}
</script>

@endsection
