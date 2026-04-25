<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Input;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        if ($user->id_role == 1) { // Admin — keep existing dashboard
            $totalInputs = Input::count();
            $totalUsers = User::count();
            return view('dashboard', compact('totalInputs', 'totalUsers'));
        }

        // Regular User — new workspace dashboard
        $query = Input::where('id_user', $user->id);

        $totalUploads = (clone $query)->count();
        $processing   = (clone $query)->where('status', 'processing')->count();
        $completed    = (clone $query)->where('status', 'completed')->count();
        
        $lastInput = (clone $query)->latest('updated_at')->first();
        $lastUpdate = $lastInput ? $lastInput->updated_at->format('H:i') . ' WIB' : '—';

        $inputs = Input::where('id_user', $user->id)
                    ->with('hasils')
                    ->latest()
                    ->get();

        return view('dashboard-user', compact(
            'totalUploads', 'processing', 'completed', 'lastUpdate', 'inputs'
        ));
    }
}
