@extends('layouts.admin')

@section('header_title', 'Update User')

@section('content')
<div class="content-box" style="max-width: 650px;">
    <h2 style="margin-bottom: 25px;"><i class="ph-bold ph-pencil-simple"></i> Edit Data User</h2>
    
    <form action="{{ route('users.update', $user->id) }}" method="POST">
        @csrf @method('PUT')
        
        <div class="form-group">
            <label class="form-label">Nama Lengkap</label>
            <input type="text" name="nama" class="form-control" value="{{ old('nama', $user->nama) }}" required>
            @error('nama') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>

        <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" name="username" class="form-control" value="{{ old('username', $user->username) }}" required>
            @error('username') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>
        
        <div class="form-group">
            <label class="form-label">Alamat Email</label>
            <input type="email" name="email" class="form-control" value="{{ old('email', $user->email) }}" required>
            @error('email') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>

        <div class="form-group" style="background:#fafafa; padding:15px; border-radius:12px; border:1px dashed #ccc;">
            <label class="form-label">Ganti Password (Opsional)</label>
            <input type="password" name="password" class="form-control" placeholder="Biarkan kosong jika password tidak diubah">
            @error('password') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>

        <div class="form-group">
            <label class="form-label">Pilih Role Akses</label>
            <select name="id_role" class="form-control" required>
                @foreach($roles as $role)
                    <option value="{{ $role->id }}" {{ old('id_role', $user->id_role) == $role->id ? 'selected' : '' }}>{{ $role->nama }}</option>
                @endforeach
            </select>
            @error('id_role') <small style="color:var(--card-pink); font-weight:600;">{{ $message }}</small> @enderror
        </div>

        <div style="margin-top: 35px; display:flex; gap:15px;">
            <button type="submit" class="btn btn-dark" style="flex:1;">Simpan Perubahan</button>
            <a href="{{ route('users.index') }}" class="btn btn-outline">Batal</a>
        </div>
    </form>
</div>
@endsection
