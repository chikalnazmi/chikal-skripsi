<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Mopular Layout</title>
    <!-- Phosphor Icons for modern thin icons -->
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}?v={{ time() }}">
</head>
<body>

<div class="layout-container">
    
    <!-- Floating Pill Sidebar -->
    <aside class="sidebar">
        <!-- Logo -->
        <div class="sidebar-logo">
            <i class="ph-bold ph-layout"></i>
        </div>

        <!-- Navigation Icons -->
        <ul class="sidebar-nav">
            <li>
                <a href="{{ route('dashboard') }}" class="nav-item {{ request()->routeIs('dashboard') ? 'active' : '' }}" title="Dashboard">
                    <i class="ph-fill ph-house"></i>
                </a>
            </li>
            <li>
                <a href="{{ route('inputs.index') }}" class="nav-item {{ request()->routeIs('inputs.*') ? 'active' : '' }}" title="Data Input">
                    <i class="ph-bold ph-folder-open"></i>
                </a>
            </li>
            @if(auth()->user() && auth()->user()->id_role == 1)
            <li>
                <a href="{{ route('users.index') }}" class="nav-item {{ request()->routeIs('users.*') ? 'active' : '' }}" title="Manage Users">
                    <i class="ph-bold ph-users"></i>
                </a>
            </li>
            @endif
        </ul>

        <!-- Bottom Icon / Settings -->
        <div class="sidebar-bottom">
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button type="submit" class="nav-item" style="border:none; cursor:pointer; background:transparent;" title="Logout">
                    <i class="ph-bold ph-sign-out"></i>
                </button>
            </form>
        </div>
    </aside>

    <!-- Main Dynamic Content -->
    <main class="main-wrapper">
        
        <!-- Header Topbar inside main -->
        <header class="header">
            @hasSection('header_title')
                <h1 class="header-title-large">@yield('header_title')</h1>
            @else
                <h1 class="header-title-large">Welcome back<br>to your workspace.</h1>
            @endif

            <div class="header-actions">
                <i class="ph-bold ph-bell" style="font-size: 24px;"></i>
                <div class="user-profile">
                    <div class="avatar">{{ substr(auth()->user()->nama, 0, 1) }}</div>
                    <span>{{ auth()->user()->nama }}</span>
                </div>
            </div>
        </header>

        <!-- Flash Messages -->
        @if(session('success'))
            <div class="alert alert-success"><i class="ph-bold ph-check-circle"></i> {{ session('success') }}</div>
        @endif
        @if(session('error'))
            <div class="alert alert-danger"><i class="ph-bold ph-warning-circle"></i> {{ session('error') }}</div>
        @endif

        <!-- Inject Page Content -->
        @yield('content')

    </main>

</div>

</body>
</html>
