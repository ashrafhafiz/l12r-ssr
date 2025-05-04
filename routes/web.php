<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('features', FeatureController::class)->except(['index', 'show'])->middleware('can:' . PermissionsEnum::ManageFeatures->value);

    Route::get('features', [FeatureController::class, 'index'])->name('features.index');
    Route::get('features/{feature}', [FeatureController::class, 'show'])->name('features.show');

    Route::post('features/{feature}/upvote', [UpvoteController::class, 'store'])->name('upvote.store');
    Route::delete('features/{feature}/upvote', [UpvoteController::class, 'delete'])->name('upvote.delete');

    Route::post('feature/{feature}/comments', [CommentController::class, 'store'])->name('comments.store')->middleware('can:' . PermissionsEnum::ManageComments->value);
    Route::delete('feature/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy')->middleware('can:' . PermissionsEnum::ManageComments->value);

    Route::resource('users', UserController::class)->only(['index', 'edit', 'update', 'destroy'])->middleware('role:' . RolesEnum::Admin->value);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
