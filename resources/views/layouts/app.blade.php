<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chikal Skripsi - AI Layout Extractor</title>
    <!-- Modern Minimalist Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
    <header class="site-header">
        <div class="header-container">
            <h1 class="newspaper-title">The Layout Chronicle</h1>
            <p class="newspaper-subtitle">AI-Powered Newspaper Digitization & Cropping Tool</p>
            <div class="header-divider"></div>
            <div class="header-meta">
                <span>Edisi Digital</span>
                <span>Vol. I — {{ date('Y') }}</span>
                <span>Jakarta, Indonesia</span>
            </div>
            <div class="header-divider thick"></div>
        </div>
    </header>

    <main class="main-content">
        @yield('content')
    </main>

    <footer class="site-footer">
        <p>&copy; {{ date('Y') }} Chikal Skripsi. All Rights Reserved.</p>
    </footer>
</body>
</html>
