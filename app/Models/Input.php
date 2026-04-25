<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Input extends Model
{
    protected $table = 'input';
    use HasFactory;
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
