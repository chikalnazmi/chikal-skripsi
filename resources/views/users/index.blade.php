@extends('layouts.admin')

@section('header_title', 'Manage Users')

@section('content')
<div class="content-box">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h2 style="margin:0;">User Directory</h2>
        <a href="{{ route('users.create') }}" class="btn btn-dark">
            <i class="ph-bold ph-plus"></i> Tambah User Baru
        </a>
    </div>

    <div style="overflow-x: auto;">
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama User</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $index => $user)
                <tr>
                    <td style="font-weight:600;">{{ $index + 1 }}</td>
                    <td style="font-weight:600; display:flex; align-items:center; gap:10px;">
                        <div class="avatar" style="width:30px; height:30px; font-size:12px; background: {{ $user->id_role == 1 ? 'var(--card-pink)' : 'var(--card-mint)' }};">
                            {{ substr($user->nama, 0, 1) }}
                        </div>
                        {{ $user->nama }}
                    </td>
                    <td>{{ $user->username }}</td>
                    <td style="color:#666;">{{ $user->email }}</td>
                    <td>
                        @if($user->id_role == 1)
                            <span style="background:var(--card-pink); color:#5a1111; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight:700;"><i class="ph-fill ph-shield-star"></i> Admin</span>
                        @else
                            <span style="background:var(--bg-main); border: 1px solid #ccc; color:#333; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight:600;"><i class="ph-fill ph-user"></i> User</span>
                        @endif
                    </td>
                    <td>
                        <div style="display:flex; gap:10px;">
                            <a href="{{ route('users.edit', $user->id) }}" class="btn btn-outline btn-sm">
                                <i class="ph-bold ph-pencil-simple"></i> Edit
                            </a>
                            @if($user->id != auth()->id())
                            <form action="{{ route('users.destroy', $user->id) }}" method="POST" onsubmit="return confirm('Hapus user ini?');">
                                @csrf @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" style="border:none;">
                                    <i class="ph-bold ph-trash"></i>
                                </button>
                            </form>
                            @endif
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
