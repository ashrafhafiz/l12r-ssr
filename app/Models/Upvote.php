<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Upvote extends Model
{
    protected $fillable = [
        'feature_id',
        'user_id',
        'upvote',
    ];
    protected $casts = [
        'upvote' => 'boolean',
    ];
    public $timestamps = false;
    /**
     * Get the feature that owns the Upvote
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function feature(): BelongsTo
    {
        return $this->belongsTo(Feature::class);
    }
}