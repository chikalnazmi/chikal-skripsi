<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Input;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        
        if ($user->id_role == 1) { // Admin — keep existing dashboard
            $totalInputs = Input::count();
            $totalUsers = User::count();
            
            // Status ratio chart data
            $statusCounts = [
                'pending' => Input::where('status', 'pending')->count(),
                'processing' => Input::where('status', 'processing')->count(),
                'completed' => Input::where('status', 'completed')->count(),
                'failed' => Input::where('status', 'failed')->count(),
            ];

            // Filter for Trend Chart
            $days = $request->input('range', 7); // Default 7 days
            if (!in_array($days, [7, 14, 30])) {
                $days = 7;
            }

            // Upload trend
            $trendDates = [];
            $trendCounts = [];
            for ($i = $days - 1; $i >= 0; $i--) {
                $date = now()->subDays($i)->format('Y-m-d');
                $trendDates[] = now()->subDays($i)->format('d M');
                $trendCounts[] = Input::whereDate('created_at', $date)->count();
            }

            return view('dashboard', compact('totalInputs', 'totalUsers', 'statusCounts', 'trendDates', 'trendCounts', 'days'));
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
