@extends('layouts.user')

@section('content')

<!-- Stats Bar -->
<div class="stats-bar">
    <div class="stat-card bg-pink">
        <div class="stat-icon"><i class="ph-bold ph-upload-simple"></i></div>
        <div class="stat-info">
            <span class="stat-label">TOTAL UNGGAH</span>
            <span class="stat-value">{{ $totalUploads }}</span>
        </div>
    </div>
    <div class="stat-card bg-orange">
        <div class="stat-icon"><i class="ph-bold ph-circle-notch"></i></div>
        <div class="stat-info">
            <span class="stat-label">SEDANG DIPROSES</span>
            <span class="stat-value">{{ $processing }}</span>
        </div>
    </div>
    <div class="stat-card bg-mint">
        <div class="stat-icon"><i class="ph-bold ph-check-circle"></i></div>
        <div class="stat-info">
            <span class="stat-label">SELESAI</span>
            <span class="stat-value">{{ $completed }}</span>
        </div>
    </div>
    <div class="stat-card bg-purple">
        <div class="stat-icon"><i class="ph-bold ph-clock"></i></div>
        <div class="stat-info">
            <span class="stat-label">UPDATE TERAKHIR</span>
            <span class="stat-value">{{ $lastUpdate }}</span>
        </div>
    </div>
</div>

<!-- Greeting -->
<div class="workspace-greeting">
    <h2>Selamat Datang di Workspace Segmentasi</h2>
    <p>Kelola dan proses arsip koran Anda dengan kecerdasan buatan.</p>
</div>

<!-- Upload Dropzone -->
<form action="{{ route('inputs.store') }}" method="POST" enctype="multipart/form-data" id="uploadForm">
    @csrf
    <div class="dropzone" id="dropzone" onclick="document.getElementById('fileInput').click();">
        <i class="ph-bold ph-cloud-arrow-up dropzone-icon"></i>
        <p class="dropzone-text">Tarik file ke sini atau klik tombol Unggah</p>
        <p class="dropzone-hint">Format: PNG, JPG, JPEG, PDF, atau ZIP (maks 50MB)</p>
        <input type="file" id="fileInput" name="file" accept=".png,.jpg,.jpeg,.pdf,.zip" required hidden>
        <div id="fileSelected" class="dropzone-file-name" style="display:none;"></div>
    </div>
    <div id="uploadActions" style="display:none; margin-top:15px; text-align:center;">
        <button type="submit" class="btn btn-dark">
            <i class="ph-bold ph-upload-simple"></i> Upload & Simpan
        </button>
    </div>
</form>

<!-- File Table -->
<div class="content-box" style="margin-top: 30px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h2 style="margin:0;">Riwayat File</h2>
        <span style="color:var(--text-secondary); font-size:0.9rem;">{{ $inputs->count() }} file</span>
    </div>
    <div style="overflow-x: auto;">
        <table class="table">
            <thead>
                <tr>
                    <th>Nama File</th>
                    <th>Waktu</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                @forelse($inputs as $input)
                <tr>
                    <td style="font-weight:500;">
                        <i class="ph-bold ph-file" style="margin-right:6px; opacity:0.5;"></i>
                        {{ $input->nama_file }}
                    </td>
                    <td style="color:#666;">{{ $input->created_at->format('H:i') }} WIB</td>
                    <td>
                        @if($input->status == 'completed')
                            <span class="status-badge status-completed">
                                <i class="ph-bold ph-check"></i> SELESAI
                            </span>
                        @elseif($input->status == 'processing')
                            <span class="status-badge status-processing">
                                <i class="ph-bold ph-circle-notch"></i> PROSES
                            </span>
                        @elseif($input->status == 'failed')
                            <span class="status-badge status-failed">
                                <i class="ph-bold ph-warning"></i> GAGAL
                            </span>
                        @else
                            <span class="status-badge status-pending">
                                <i class="ph-bold ph-clock"></i> BELUM DIPROSES
                            </span>
                        @endif
                    </td>
                    <td>
                        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
                            {{-- Preview Button opens modal --}}
                            @if(in_array($input->status, ['pending', 'failed']))
                                <form action="{{ route('inputs.process', $input->id) }}" method="POST" onsubmit="this.querySelector('button').disabled=true; this.querySelector('button').innerHTML='<i class=\'ph-bold ph-circle-notch\'></i> Loading...';">
                                    @csrf
                                    <button type="submit" class="btn btn-dark btn-sm">
                                        <i class="ph-bold ph-play"></i> Proses AI
                                    </button>
                                </form>
                            @endif

                            {{-- Preview & Download --}}
                            @if($input->status == 'completed' && $input->hasils->count() > 0)
                                @php $hasil = $input->hasils->first(); @endphp

                                @if($hasil->sample_prediksi)
                                    <button type="button" class="btn btn-outline btn-sm" onclick="openPreviewModal('{{ asset('storage/' . $hasil->sample_prediksi) }}', '{{ $input->nama_file }}')" title="Preview">
                                        <i class="ph-bold ph-eye"></i> Preview
                                    </button>
                                @endif

                                <a href="{{ asset('storage/' . $hasil->file_path) }}" class="btn btn-dark btn-sm" download style="background:var(--card-mint); color:#0d4a23;">
                                    <i class="ph-bold ph-download-simple"></i> Unduh Hasil
                                </a>
                            @endif

                            {{-- Delete --}}
                            <form action="{{ route('inputs.destroy', $input->id) }}" method="POST" onsubmit="return confirm('Yakin ingin menghapus data ini?');">
                                @csrf @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" style="border:none;">
                                    <i class="ph-bold ph-trash"></i>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="4" style="text-align: center; color: var(--text-secondary); padding: 50px 20px;">
                        <i class="ph-bold ph-file-dashed" style="font-size: 40px; margin-bottom: 10px; display:block; opacity:0.4;"></i>
                        Belum ada file yang diunggah. Mulai dengan mengunggah file koran di atas.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<!-- Preview Modal -->
<div id="previewModal" class="preview-modal-overlay" style="display:none;" onclick="closePreviewModal(event)">
    <div class="preview-modal-content">
        <div class="preview-modal-header">
            <h3 id="previewModalTitle"><i class="ph-bold ph-image"></i> Hasil Prediksi</h3>
            <button class="preview-modal-close" onclick="closePreviewModal(event, true)">
                <i class="ph-bold ph-x"></i>
            </button>
        </div>
        <div class="preview-modal-body">
            <img id="previewModalImg" src="" alt="Preview Segmentasi">
        </div>
    </div>
</div>

<script>
// Dropzone file selection display
const fileInput = document.getElementById('fileInput');
const dropzone = document.getElementById('dropzone');
const fileSelected = document.getElementById('fileSelected');
const uploadActions = document.getElementById('uploadActions');

fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        fileSelected.textContent = '📄 ' + this.files[0].name;
        fileSelected.style.display = 'block';
        uploadActions.style.display = 'block';
    }
});

// Drag & drop
dropzone.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('dropzone-hover');
});
dropzone.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.classList.remove('dropzone-hover');
});
dropzone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('dropzone-hover');
    if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileSelected.textContent = '📄 ' + e.dataTransfer.files[0].name;
        fileSelected.style.display = 'block';
        uploadActions.style.display = 'block';
    }
});

// Preview Modal
function openPreviewModal(imgSrc, fileName) {
    const modal = document.getElementById('previewModal');
    const img = document.getElementById('previewModalImg');
    const title = document.getElementById('previewModalTitle');
    img.src = imgSrc;
    title.innerHTML = '<i class="ph-bold ph-image"></i> ' + fileName;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePreviewModal(event, force) {
    if (force || event.target.id === 'previewModal') {
        const modal = document.getElementById('previewModal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePreviewModal(e, true);
});
</script>

@endsection

