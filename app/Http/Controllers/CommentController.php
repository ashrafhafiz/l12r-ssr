<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required|min:5',
        ]);

        Comment::create([
            'comment' => $request->comment,
            'feature_id' => $request->feature_id,
            'user_id' => Auth::id(),
        ]);

        // return to_route('features.show', $feature)->with('success', 'Comment created!');
        return back()->with('success', 'Comment created!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        if (!Auth::user()->hasRole('admin') && Auth::id() !== $comment->user_id) {
            return back()->with('error', 'You are not authorized to delete this comment!');
        }
        // $featureId = $comment->feature_id;
        $comment->delete();
        // return to_route('features.show', $feature)->with('success', 'Comment deleted!');
        return back()->with('success', 'Comment deleted!');
    }
}
