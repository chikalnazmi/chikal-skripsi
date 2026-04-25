@extends('layouts.admin')

@section('header_title')
Invest in your<br>extraction workflow
@endsection

@section('content')

<!-- Pastel Metrics Grid -->
<div class="cards-grid">
    
    <!-- Card 1 -->
    <div class="pastel-card bg-pink">
        <div class="card-top">
            <div class="card-icon"><i class="ph-bold ph-files"></i></div>
            <div class="card-badge"><i class="ph-fill ph-star" style="color:#FFA000;"></i> 4.8</div>
        </div>
        <div>
            <h3 class="card-title">Total File ZIP Diproses</h3>
            <div class="card-bottom">{{ $totalInputs }} Data Input</div>
        </div>
    </div>

    @if(auth()->user()->id_role == 1)
    <!-- Card 2 (Admin Only) -->
    <div class="pastel-card bg-orange">
        <div class="card-top">
            <div class="card-icon"><i class="ph-bold ph-users-three"></i></div>
            <div class="card-badge"><i class="ph-fill ph-star" style="color:#FFA000;"></i> 4.9</div>
        </div>
        <div>
            <h3 class="card-title">Pengguna Terdaftar: Total Sistem</h3>
            <div class="card-bottom">{{ $totalUsers }} Users</div>
        </div>
    </div>
    @endif

    <!-- Card 3 -->
    <div class="pastel-card bg-purple">
        <div class="card-top">
            <div class="card-icon"><i class="ph-bold ph-check-square-offset"></i></div>
            <div class="card-badge"><i class="ph-fill ph-star" style="color:#FFA000;"></i> 5.0</div>
        </div>
        <div>
            <h3 class="card-title">Hasil Prediksi Selesai</h3>
            <div class="card-bottom">Tracking Status</div>
        </div>
    </div>

    <!-- Card 4 -->
    <div class="pastel-card bg-mint">
        <div class="card-top">
            <div class="card-icon"><i class="ph-bold ph-cube"></i></div>
            <div class="card-badge"><span style="color:red;">✨ Top 10</span></div>
        </div>
        <div>
            <h3 class="card-title">How to Design Layouts in 10 Steps</h3>
            <div class="card-bottom">System Guide</div>
        </div>
    </div>

</div>

<!-- Additional Dashboard Content Panel -->
<div class="content-box">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h2>Aktivitas Terbaru</h2>
        <a href="{{ route('inputs.index') }}" class="btn btn-outline btn-sm">Lihat Semua</a>
    </div>
    <div style="opacity: 0.7; font-size:0.95rem;">
        Sistem AI otomatis sedang menunggu unggahan baru di menu Data Input. Gunakan panel kiri untuk bernavigasi.
    </div>
</div>

@endsection
