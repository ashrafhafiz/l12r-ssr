<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeatureResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // dd($this);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'created_at_human' => $this->created_at->diffForHumans(),
            'updated_at_human' => $this->updated_at->diffForHumans(),
            'upvote_count' => $this->upvote_count ?: 0,
            'user_upvoted' => $this->user_upvoted,
            'user_downvoted' => $this->user_downvoted,
            'comments' => CommentResource::collection($this->Comments),
            // 'user' => new UserResource($this->whenLoaded('user')),
            'user' => new UserResource($this->user),
            // 'upvotes' => UpvoteResource::collection($this->whenLoaded('upvotes')),
        ];
    }
}