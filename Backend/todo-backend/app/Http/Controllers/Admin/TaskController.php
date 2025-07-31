<?php

namespace App\Http\Controllers\Admin;

use App\Models\Task;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return view('Admin.Tasks.task', compact('tasks'));
    }

    public function formTask()
    {
        return view('Admin.Tasks.tambahTask');
    }

    public function tambahTask(Request $request)
    {
        Task::create([
            'judul' => $request->judul,
            'is_completed' => $request->is_completed,
            'user_id' => $request->user_id,
            'slug' => Str::slug($request->judul)
        ]);

        return redirect()->route('index.task')->with('Create', "Data Task berhasil ditambahkan");
    }

    public function editTask(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        return view('Admin.Tasks.editTask', compact('task'));
    }

    public function updateTask(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->judul = $request->judul;
        $task->is_completed = $request->is_completed;
        $task->user_id = $request->user_id;
        $task->slug = Str::slug($request->judul);

        $task->update();
        return redirect()->route('index.task')->with('Update', "Data Task $request->judul Berhasil di Update");
    }

    public function deleteTask($id) {
        $task = Task::findOrFail($id);

        $task->delete();
        return redirect()->back()->with('Delete', "Data Kategori Galeri $task->kategori berhasil dihapus");
    }
}
