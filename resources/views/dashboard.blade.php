@extends('layouts.admin')

@section('header_title')
Sistem Segmentasi<br>Koran
@endsection

@section('content')

<!-- Pastel Metrics Grid -->
<div class="cards-grid">
    
    <!-- Card 1 -->
    <div class="pastel-card bg-pink">
        <div class="card-top">
            <div class="card-icon"><i class="ph-bold ph-upload-simple"></i></div>
            <div class="card-badge"><i class="ph-fill ph-trend-up"></i></div>
        </div>
        <div>
            <h3 class="card-title">TOTAL UNGGAH</h3>
            <div class="card-bottom">{{ $totalInputs }} Data ZIP</div>
        </div>
    </div>

    <!-- Card 2 -->
    <div class="pastel-card bg-orange">
        <div class="card-top">
            <div class="card-icon"><i class="ph-bold ph-circle-notch"></i></div>
            <div class="card-badge"><i class="ph-fill ph-clock"></i></div>
        </div>
        <div>
            <h3 class="card-title">SEDANG DIPROSES</h3>
            <div class="card-bottom">{{ $statusCounts['processing'] ?? 0 }} Data</div>
        </div>
    </div>

    <!-- Card 3 -->
    <div class="pastel-card bg-mint">
        <div class="card-top">
            <div class="card-icon"><i class="ph-bold ph-check-circle"></i></div>
            <div class="card-badge"><i class="ph-fill ph-check"></i></div>
        </div>
        <div>
            <h3 class="card-title">SELESAI</h3>
            <div class="card-bottom">{{ $statusCounts['completed'] ?? 0 }} Data</div>
        </div>
    </div>

    <!-- Card 4 -->
    <div class="pastel-card bg-purple">
        <div class="card-top">
            <div class="card-icon"><i class="ph-bold ph-users"></i></div>
            <div class="card-badge"><i class="ph-fill ph-user-focus"></i></div>
        </div>
        <div>
            <h3 class="card-title">PENGGUNA TERDAFTAR</h3>
            <div class="card-bottom">{{ $totalUsers }} Users</div>
        </div>
    </div>

</div>

<!-- Analytics Charts Panel -->
@if(auth()->user()->id_role == 1)

<!-- Filter Form -->
<div style="display:flex; justify-content:flex-start; margin-top:30px;">
    <form action="{{ route('dashboard') }}" method="GET" style="display:flex; align-items:center; gap:10px;">
        <label for="range" style="font-weight:600; font-size:0.9rem;">Filter Rentang Waktu:</label>
        <select name="range" id="range" class="form-control" onchange="this.form.submit()" style="padding:8px; border-radius:8px; border:1px solid #ccc; font-family:inherit;">
            <option value="7" {{ (isset($days) && $days == 7) ? 'selected' : '' }}>7 Hari Terakhir</option>
            <option value="14" {{ (isset($days) && $days == 14) ? 'selected' : '' }}>14 Hari Terakhir</option>
            <option value="30" {{ (isset($days) && $days == 30) ? 'selected' : '' }}>30 Hari Terakhir</option>
        </select>
    </form>
</div>

<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin-top: 15px;">
    
    <!-- Upload Trend Chart -->
    <div class="content-box">
        <h3 style="margin-bottom: 20px; font-weight:600; font-size:1.1rem;"><i class="ph-bold ph-trend-up"></i> Tren Upload {{ $days ?? 7 }} Hari Terakhir</h3>
        <div style="position: relative; height: 300px; width: 100%;">
            <canvas id="trendChart"></canvas>
        </div>
    </div>

    <!-- Status Ratio Chart -->
    <div class="content-box">
        <h3 style="margin-bottom: 20px; font-weight:600; font-size:1.1rem;"><i class="ph-bold ph-chart-pie"></i> Rasio Status Pemrosesan</h3>
        <div style="position: relative; height: 300px; width: 100%; display: flex; justify-content: center;">
            <canvas id="statusChart"></canvas>
        </div>
    </div>

</div>

<!-- Chart.js CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Trend Chart (Bar/Line)
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: {!! json_encode(array_reverse($trendDates)) !!},
            datasets: [{
                label: 'Jumlah Upload',
                data: {!! json_encode(array_reverse($trendCounts)) !!},
                borderColor: '#1a3a8a',
                backgroundColor: 'rgba(26, 58, 138, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#1a3a8a',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } }
            }
        }
    });

    // Status Ratio Chart (Doughnut)
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'Processing', 'Completed', 'Failed'],
            datasets: [{
                data: [
                    {{ $statusCounts['pending'] }},
                    {{ $statusCounts['processing'] }},
                    {{ $statusCounts['completed'] }},
                    {{ $statusCounts['failed'] }}
                ],
                backgroundColor: [
                    '#FFA000', // Pending (Orange)
                    '#4285F4', // Processing (Blue)
                    '#0F9D58', // Completed (Green)
                    '#DB4437'  // Failed (Red)
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            cutout: '70%'
        }
    });
});
</script>
@else
<!-- Additional Dashboard Content Panel (For User) -->
<div class="content-box">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h2>Aktivitas Terbaru</h2>
        <a href="{{ route('inputs.index') }}" class="btn btn-outline btn-sm">Lihat Semua</a>
    </div>
    <div style="opacity: 0.7; font-size:0.95rem;">
        Sistem AI otomatis sedang menunggu unggahan baru di menu Data Input. Gunakan panel kiri untuk bernavigasi.
    </div>
</div>
@endif

@endsection
