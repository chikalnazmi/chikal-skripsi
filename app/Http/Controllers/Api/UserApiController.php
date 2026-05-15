<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserApiController extends Controller
{
    private function adminOnly()
    {
        if (auth()->user()->id_role != 1) {
            abort(403, 'Forbidden. Admin only.');
        }
    }

    public function index(Request $request)
    {
        $this->adminOnly();
        $query = User::with('role');
        if ($request->filled('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                  ->orWhere('username', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }
        return response()->json($query->latest()->get()->map(function ($u) {
            return [
                'id'      => $u->id,
                'name'    => $u->nama,
                'email'   => $u->email,
                'role'    => $u->id_role == 1 ? 'Admin' : 'User',
                'status'  => $u->status ?? 'aktif',
            ];
        }));
    }

    public function store(Request $request)
    {
        $this->adminOnly();
        $request->validate([
            'nama'     => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email'    => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'id_role'  => 'required|exists:role,id',
        ]);

        $user = User::create([
            'nama'     => $request->nama,
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'id_role'  => $request->id_role,
            'status'   => 'aktif',
        ]);

        return response()->json([
            'id'     => $user->id,
            'name'   => $user->nama,
            'email'  => $user->email,
            'role'   => $user->id_role == 1 ? 'Admin' : 'User',
            'status' => $user->status,
        ], 201);
    }

    public function update(Request $request, User $user)
    {
        $this->adminOnly();
        $request->validate([
            'nama'    => 'required|string|max:255',
            'email'   => 'required|email|max:255|unique:users,email,' . $user->id,
            'id_role' => 'required|exists:role,id',
            'status'  => 'sometimes|in:aktif,nonaktif',
        ]);

        $data = [
            'nama'    => $request->nama,
            'email'   => $request->email,
            'id_role' => $request->id_role,
            'status'  => $request->status ?? $user->status,
        ];
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);
        return response()->json([
            'id'     => $user->id,
            'name'   => $user->nama,
            'email'  => $user->email,
            'role'   => $user->id_role == 1 ? 'Admin' : 'User',
            'status' => $user->status,
        ]);
    }

    public function destroy(User $user)
    {
        $this->adminOnly();
        if ($user->id === auth()->id()) {
            return response()->json(['error' => 'Tidak dapat menghapus diri sendiri.'], 422);
        }
        $user->delete();
        return response()->json(['message' => 'User berhasil dihapus.']);
    }
}
