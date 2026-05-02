<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Input extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'input';
    protected $guarded = ['id'];

    public function hasils()
    {
        return $this->hasMany(Hasil::class, 'id_input');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
