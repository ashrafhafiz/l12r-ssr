<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Http\Request;

class UpvoteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'feature_id' => 'required|exists:features,id',
            'upvote' => 'required|boolean',
        ]);
        // dd($request->all());

        Upvote::updateOrCreate(
            [
                'feature_id' => $data['feature_id'],
                'user_id' => auth()->id()
            ],
            ['upvote' => $data['upvote']],
        );

        // The following is showing the updateOrCreate through the Feature model relationship
        // $feature = Feature::findOrFail($request->feature_id);

        // $feature->upvotes()->updateOrCreate(
        //     ['user_id' => auth()->id()],
        //     ['upvote' => $request->upvote]
        // );

        return redirect()->back()->with('success', 'Upvote recorded successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Feature $feature)
    {
        if (Feature::where('id', $feature->id)) {
            Upvote::where([
                'feature_id' => $feature->id,
                'user_id' => auth()->id(),
            ])->delete();
        };

        return redirect()->back()->with('success', 'Upvote removed successfully.');
    }
}