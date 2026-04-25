<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Workspace Segmentasi Koran</title>
    <!-- Phosphor Icons -->
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}?v={{ time() }}">
</head>
<body>

<div class="user-layout">

    <!-- Top Bar -->
    <header class="user-topbar">
        <div class="topbar-left">
            <div class="topbar-logo">
                <i class="ph-bold ph-layout"></i>
            </div>
            <h1 class="topbar-title">Workspace Segmentasi Koran</h1>
        </div>
        <div class="topbar-right">
            <button class="topbar-icon-btn" title="Notifikasi">
                <i class="ph-bold ph-bell"></i>
            </button>
            <div class="user-profile">
                <div class="avatar">{{ substr(auth()->user()->nama, 0, 1) }}</div>
                <span>{{ auth()->user()->nama }}</span>
            </div>
            <form action="{{ route('logout') }}" method="POST" style="margin:0;">
                @csrf
                <button type="submit" class="topbar-icon-btn" title="Logout">
                    <i class="ph-bold ph-sign-out"></i>
                </button>
            </form>
        </div>
    </header>

    <!-- Flash Messages -->
    @if(session('success'))
        <div class="alert alert-success" style="margin: 0 0 20px 0;"><i class="ph-bold ph-check-circle"></i> {{ session('success') }}</div>
    @endif
    @if(session('error'))
        <div class="alert alert-danger" style="margin: 0 0 20px 0;"><i class="ph-bold ph-warning-circle"></i> {{ session('error') }}</div>
    @endif

    <!-- Page Content -->
    @yield('content')

</div>

</body>
</html>
