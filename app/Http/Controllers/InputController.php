<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Input;
use App\Models\Hasil;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class InputController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        // Regular users should use the dashboard workspace instead
        if ($user->id_role != 1) {
            return redirect()->route('dashboard');
        }

        // Admin sees all
        $inputs = Input::with(['hasils', 'user'])->latest()->get();
        
        return view('inputs.index', compact('inputs'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:zip,pdf,png,jpg,jpeg|max:50000', // max 50MB
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads/inputs', $fileName, 'public');

            $input = Input::create([
                'id_user' => auth()->id(),
                'nama_file' => $file->getClientOriginalName(),
                'file_path' => $path,
                'status' => 'pending'
            ]);

            return redirect()->back()->with('success', 'File berhasil diunggah. Klik tombol "Proses" untuk memulai segmentasi.');
        }

        return redirect()->back()->with('error', 'Gagal mengunggah file.');
    }

    /**
     * Process an uploaded file through the AI segmentation API.
     */
    public function process(Input $input)
    {
        // Authorization check
        if (auth()->user()->id_role != 1 && auth()->id() != $input->id_user) {
            abort(403);
        }

        // Don't re-process completed inputs
        if ($input->status === 'completed') {
            return redirect()->back()->with('error', 'File ini sudah diproses sebelumnya.');
        }

        try {
            $apiUrl = env('AI_API_URL', 'http://127.0.0.1:5000');
            $filePath = Storage::disk('public')->path($input->file_path);

            if (!file_exists($filePath)) {
                return redirect()->back()->with('error', 'File tidak ditemukan di server.');
            }

            // Update status to processing
            $input->update(['status' => 'processing']);

            // Send file to AI API (timeout 5 minutes for large files)
            $response = Http::timeout(300)
                ->attach(
                    'file',
                    file_get_contents($filePath),
                    basename($filePath)
                )
                ->post("{$apiUrl}/api/segment");

            if (!$response->successful()) {
                $input->update(['status' => 'failed']);
                $errorMsg = $response->json('error') ?? 'API returned error ' . $response->status();
                return redirect()->back()->with('error', 'Gagal memproses: ' . $errorMsg);
            }

            $data = $response->json();

            if (!$data['success']) {
                $input->update(['status' => 'failed']);
                return redirect()->back()->with('error', 'Gagal memproses: ' . ($data['error'] ?? 'Unknown error'));
            }

            // Save result ZIP
            $zipFileName = time() . '_hasil_' . pathinfo($input->nama_file, PATHINFO_FILENAME) . '.zip';
            $zipPath = 'uploads/hasil/' . $zipFileName;
            Storage::disk('public')->put($zipPath, base64_decode($data['result_zip']));

            // Save best preview image
            $previewFileName = time() . '_preview_' . pathinfo($input->nama_file, PATHINFO_FILENAME) . '.jpeg';
            $previewPath = 'uploads/previews/' . $previewFileName;
            Storage::disk('public')->put($previewPath, base64_decode($data['best_preview']));

            // Create Hasil record
            Hasil::create([
                'id_input' => $input->id,
                'id_user' => $input->id_user,
                'file_path' => $zipPath,
                'sample_prediksi' => $previewPath,
            ]);

            // Update input status
            $input->update(['status' => 'completed']);

            return redirect()->back()->with('success', 'Segmentasi berhasil! Lihat hasil di bawah.');

        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            $input->update(['status' => 'failed']);
            Log::error('AI API Connection Error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Tidak dapat terhubung ke AI API. Pastikan API server sedang berjalan (python app.py).');
        } catch (\Exception $e) {
            $input->update(['status' => 'failed']);
            Log::error('AI Processing Error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
    
    public function destroy(Input $input)
    {
        // Simple authorization check
        if (auth()->user()->id_role != 1 && auth()->id() != $input->id_user) {
            abort(403);
        }
        
        Storage::disk('public')->delete($input->file_path);
        
        // delete associated hasils if any
        foreach($input->hasils as $hasil) {
            Storage::disk('public')->delete($hasil->file_path);
            if ($hasil->sample_prediksi) {
                Storage::disk('public')->delete($hasil->sample_prediksi);
            }
            $hasil->delete();
        }
        
        $input->delete();

        // Users go back to dashboard, admin goes to inputs page
        $route = auth()->user()->id_role == 1 ? 'inputs.index' : 'dashboard';
        return redirect()->route($route)->with('success', 'Data berhasil dihapus.');
    }
}
