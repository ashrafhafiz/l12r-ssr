<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureListResource;
use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $featuredData = Feature::with(['user', 'comments', 'upvotes'])->latest()->paginate(10);
        $featuredData = Feature::latest()
            ->withCount([
                'upvotes as upvote_count' => function ($query) {
                    $query->select(\DB::raw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)'));
                }
            ])
            ->withExists([
                'upvotes as user_upvoted' => function ($query) {
                    $query->where('user_id', auth()->id())->where('upvote', 1);
                },
                'upvotes as user_downvoted' => function ($query) {
                    $query->where('user_id', auth()->id())->where('upvote', 0);
                },
            ])
            ->paginate(10);

        return Inertia::render('Feature/Index', [
            'features' => FeatureListResource::collection($featuredData),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Feature/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Feature::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('features.index')->with('success', 'Feature created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        // $feature->upvote_count = Upvote::where('feature_id', $feature->id)->sum(\DB::raw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)'));

        // $feature->user_upvoted = Upvote::where('feature_id', $feature->id)
        //     ->where('user_id', auth()->id())
        //     ->where('upvote', 1)
        //     ->exists();

        // $feature->user_downvoted = Upvote::where('feature_id', $feature->id)
        //     ->where('user_id', auth()->id())
        //     ->where('upvote', 0)
        //     ->exists();

        $feature->loadCount([
            'upvotes as upvote_count' => function ($query) {
                $query->select(\DB::raw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)'));
            }
        ]);
        $feature->loadExists([
            'upvotes as user_upvoted' => function ($query) {
                $query->where('user_id', auth()->id())->where('upvote', 1);
            },
            'upvotes as user_downvoted' => function ($query) {
                $query->where('user_id', auth()->id())->where('upvote', 0);
            },
        ]);

        return Inertia::render('Feature/Show', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $feature->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('features.index')->with('success', 'Feature updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();

        return redirect()->route('features.index')->with('success', 'Feature deleted successfully.');
    }
}