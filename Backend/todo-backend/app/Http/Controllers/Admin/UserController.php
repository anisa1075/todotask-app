<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();
        return view('Admin.User.user', compact('user'));
    }

    public function formUser()
    {
        return view('Admin.User.tambahUser');
    }

    public function tambahUser(Request $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => $request->role,
        ]);

        return redirect()->route('index.user')->with('Create', "Berhasil Tambah Data User $request->name");
    }

    public function editUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        return view('Admin.User.editUser', compact('user'));
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->role = $request->role;

        $user->update();
        return redirect()->route('index.user')->with('Update', "Data Status User $request->name Berhasil di Update");
    }

    public function deleteUser($id) {
         $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('Delete', "Data $user->name berhasil di hapus");
    }
}
