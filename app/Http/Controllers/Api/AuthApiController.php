<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthApiController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();
            return response()->json([
                'message' => 'Login berhasil',
                'user' => [
                    'id'       => $user->id,
                    'nama'     => $user->nama,
                    'username' => $user->username,
                    'email'    => $user->email,
                    'id_role'  => $user->id_role,
                ]
            ]);
        }

        return response()->json(['message' => 'Gagal'], 401);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Berhasil keluar']);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Not logged in'], 401);
        
        return response()->json([
            'id'       => $user->id,
            'nama'     => $user->nama,
            'username' => $user->username,
            'email'    => $user->email,
            'id_role'  => $user->id_role,
        ]);
    }
}
