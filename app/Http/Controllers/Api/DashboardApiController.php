<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Input;
use App\Models\User;

class DashboardApiController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->id_role == 1) {
            // Admin dashboard
            $days = in_array($request->input('range', 7), [1, 7, 14, 30])
                ? (int) $request->input('range', 7) : 7;

            $trendData = [];
            for ($i = $days - 1; $i >= 0; $i--) {
                $date = now()->subDays($i);
                $trendData[] = [
                    'name'    => $date->format('D'),
                    'uploads' => Input::whereDate('created_at', $date->format('Y-m-d'))->count(),
                ];
            }

            $total     = Input::count();
            $completed = Input::where('status', 'completed')->count();
            $processing = Input::where('status', 'processing')->count();
            $pending   = Input::where('status', 'pending')->count();
            $failed    = Input::where('status', 'failed')->count();

            return response()->json([
                'total_inputs'   => $total,
                'total_users'    => User::count(),
                'processing'     => $processing,
                'completed'      => $completed,
                'trend_data'     => $trendData,
                'status_data'    => [
                    ['name' => 'Selesai',  'value' => $completed,  'color' => '#BAFFC9'],
                    ['name' => 'Diproses', 'value' => $processing, 'color' => '#BAE1FF'],
                    ['name' => 'Menunggu', 'value' => $pending,    'color' => '#FFDFBA'],
                    ['name' => 'Gagal',    'value' => $failed,     'color' => '#FFD1DC'],
                ],
            ]);
        }

        // User dashboard
        $query        = Input::where('id_user', $user->id);
        $totalUploads = (clone $query)->count();
        $processing   = (clone $query)->where('status', 'processing')->count();
        $completed    = (clone $query)->where('status', 'completed')->count();

        return response()->json([
            'total_inputs' => $totalUploads,
            'processing'   => $processing,
            'completed'    => $completed,
        ]);
    }
}
