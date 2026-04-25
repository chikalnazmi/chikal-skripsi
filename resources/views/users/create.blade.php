@extends('layouts.admin')

@section('header_title', 'Create User')

@section('content')
<div class="content-box" style="max-width: 650px;">
    <h2 style="margin-bottom: 25px;"><i class="ph-bold ph-user-plus"></i> Pendaftaran User Baru</h2>
    
    <form action="{{ route('users.store') }}" method="POST">
        @csrf
        
        <div class="form-group">
            <label class="form-label">Nama Lengkap</label>
            <input type="text" name="nama" class="form-control" placeholder="John Doe" value="{{ old('nama') }}" required>
            @error('nama') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>

        <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" name="username" class="form-control" placeholder="johndoe123" value="{{ old('username') }}" required>
            @error('username') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>
        
        <div class="form-group">
            <label class="form-label">Alamat Email</label>
            <input type="email" name="email" class="form-control" placeholder="john@example.com" value="{{ old('email') }}" required>
            @error('email') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>

        <div class="form-group">
            <label class="form-label">Password Setup</label>
            <input type="password" name="password" class="form-control" placeholder="Minimal 6 karakter" required>
            @error('password') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>

        <div class="form-group">
            <label class="form-label">Pilih Role Akses</label>
            <select name="id_role" class="form-control" style="appearance: none;" required>
                <option value="">-- Tetapkan Role Sistem --</option>
                @foreach($roles as $role)
                    <option value="{{ $role->id }}" {{ old('id_role') == $role->id ? 'selected' : '' }}>{{ $role->nama }}</option>
                @endforeach
            </select>
            @error('id_role') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>

        <div style="margin-top: 35px; display:flex; gap:15px;">
            <button type="submit" class="btn btn-dark" style="flex:1;">Simpan Data User</button>
            <a href="{{ route('users.index') }}" class="btn btn-outline">Batal</a>
        </div>
    </form>
</div>
@endsection
