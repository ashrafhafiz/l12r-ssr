<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Resources\AuthUserResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => AuthUserResource::collection(User::all())->resource,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => new AuthUserResource($user),
            'roles' => Role::all(),
            'roleLabels' => RolesEnum::labels(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);
        $user->update($request->all());
        $user->syncRoles($request->role);
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, Request $request)
    {
        // dd(Auth::user()->password);
        if (!Auth::user()->hasRole(RolesEnum::Admin->value)) {
            abort(403, 'You are not authorized to delete this user.');
        }

        $request->validate([
            'password' => ['required', function ($attribute, $value, $fail) {
                if (!Hash::check($value, Auth::user()->password)) {
                    $fail('The password is incorrect.');
                }
            }],
        ]);

        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}