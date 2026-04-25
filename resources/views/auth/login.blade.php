<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Mopular Access</title>
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
    <div class="login-wrapper">
        <div class="login-card">
            
            <div style="margin-bottom: 20px;">
                <i class="ph-fill ph-drop" style="font-size: 48px; color: var(--text-primary);"></i>
            </div>
            
            <h1 class="login-title">Sign In</h1>
            <p class="login-subtitle">Akses portal ekstraksi layout dan manajemen PDF.</p>

            @if ($errors->any())
                <div class="alert alert-danger" style="text-align: left; background: var(--card-pink);">
                    <i class="ph-bold ph-warning"></i> {{ $errors->first() }}
                </div>
            @endif

            <form action="{{ route('login.post') }}" method="POST" style="text-align: left;">
                @csrf
                <div class="form-group">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" id="username" name="username" class="form-control" placeholder="Masukkan username" required autofocus value="{{ old('username') }}">
                </div>
                
                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" class="form-control" placeholder="Masukkan password" required>
                </div>
                
                <button type="submit" class="btn btn-dark" style="width: 100%; margin-top: 20px; font-size:1.1rem; padding: 14px;">
                    Login Workspace <i class="ph-bold ph-arrow-right"></i>
                </button>
            </form>
            
        </div>
    </div>
</body>
</html>
