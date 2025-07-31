<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskApiController extends Controller
{
    public function tasks()
    {
        $tasks = Task::all(); // Jika ingin hanya milik user, gunakan: Task::where('user_id', auth()->id())->get();
        return response()->json([
            'success' => true,
            'data' => $tasks
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'is_completed' => 'nullable|boolean',
        ]);

        // Buat slug dari judul
        $slug = Str::slug($validated['judul'], '-');

        // Simpan task ke database
        $task = Task::create([
            'judul' => $validated['judul'],
            'slug' => $slug,
            'is_completed' => $validated['is_completed'] ?? 0,
            'user_id' => $request->input('user_id'),
            // 'user_id' => auth()->id(),

        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task berhasil ditambahkan',
            'data' => $task
        ]);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Task tidak ditemukan'
            ], 404);
        }

        $task->delete();

        return response()->json([
            'success' => true,
            'message' => 'Task berhasil dihapus'
        ]);
    }

   public function update(Request $request, $id)
{
    $task = Task::find($id);

    if (!$task) {
        return response()->json([
            'success' => false,
            'message' => 'Task tidak ditemukan',
        ], 404);
    }

    $validated = $request->validate([
        'judul' => 'nullable|string|max:255',
        'is_completed' => 'nullable|boolean',
    ]);

    if (isset($validated['judul'])) {
        $task->judul = $validated['judul'];
        $task->slug = Str::slug($validated['judul']);
    }

    if (isset($validated['is_completed'])) {
        $task->is_completed = $validated['is_completed'];
    }

    $task->save(); // ⬅ ini yang benar

    return response()->json([
        'success' => true,
        'message' => 'Task berhasil diperbarui',
        'data' => $task
    ]);
}

}
