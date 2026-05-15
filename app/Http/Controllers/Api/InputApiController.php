<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Input;
use App\Models\Hasil;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class InputApiController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Input::with(['hasils', 'user']);

        if ($user->id_role != 1) {
            $query->where('id_user', $user->id);
        }

        if ($request->filled('search')) {
            $query->where('nama_file', 'like', "%{$request->search}%");
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('date')) {
            $query->whereDate('created_at', $request->date);
        }

        $inputs = $query->latest()->get();
        return response()->json($inputs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:zip,pdf,png,jpg,jpeg|max:50000',
        ]);

        $file     = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $path     = $file->storeAs('uploads/inputs', $fileName, 'public');

        $input = Input::create([
            'id_user'   => auth()->id(),
            'nama_file' => $file->getClientOriginalName(),
            'file_path' => $path,
            'status'    => 'pending',
        ]);

        return response()->json($input, 201);
    }

    public function process(Input $input)
    {
        // Cek kepemilikan
        if (auth()->id() !== $input->id_user && auth()->user()->id_role != 1) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($input->status === 'completed') {
            return response()->json(['error' => 'File ini sudah diproses sebelumnya.'], 422);
        }

        try {
            $apiUrl   = env('AI_API_URL', 'http://127.0.0.1:5000');
            $filePath = Storage::disk('public')->path($input->file_path);

            if (!file_exists($filePath)) {
                return response()->json(['error' => 'File tidak ditemukan di server.'], 404);
            }

            $input->update(['status' => 'processing']);

            $response = Http::timeout(300)
                ->attach('file', file_get_contents($filePath), basename($filePath))
                ->post("{$apiUrl}/api/segment");

            if (!$response->successful()) {
                $input->update(['status' => 'failed']);
                return response()->json(['error' => 'API AI error: ' . $response->status()], 500);
            }

            $data = $response->json();

            if (!$data['success']) {
                $input->update(['status' => 'failed']);
                return response()->json(['error' => $data['error'] ?? 'Unknown error'], 500);
            }

            $zipFileName  = time() . '_hasil_' . pathinfo($input->nama_file, PATHINFO_FILENAME) . '.zip';
            $zipPath      = 'uploads/hasil/' . $zipFileName;
            Storage::disk('public')->put($zipPath, base64_decode($data['result_zip']));

            $previewFileName = time() . '_preview_' . pathinfo($input->nama_file, PATHINFO_FILENAME) . '.jpeg';
            $previewPath     = 'uploads/previews/' . $previewFileName;
            Storage::disk('public')->put($previewPath, base64_decode($data['best_preview']));

            Hasil::create([
                'id_input'        => $input->id,
                'id_user'         => $input->id_user,
                'file_path'       => $zipPath,
                'sample_prediksi' => $previewPath,
            ]);

            $input->update(['status' => 'completed']);
            $input->load('hasils');

            return response()->json([
                'message' => 'Segmentasi berhasil!',
                'input'   => $input,
            ]);

        } catch (\Exception $e) {
            $input->update(['status' => 'failed']);
            Log::error('AI Processing Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Input $input)
    {
        if (auth()->id() !== $input->id_user && auth()->user()->id_role != 1) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        Storage::disk('public')->delete($input->file_path);
        foreach ($input->hasils as $hasil) {
            Storage::disk('public')->delete($hasil->file_path);
            if ($hasil->sample_prediksi) Storage::disk('public')->delete($hasil->sample_prediksi);
            $hasil->delete();
        }
        $input->delete();

        return response()->json(['message' => 'Data berhasil dihapus.']);
    }
}
