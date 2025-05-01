<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Usuario;

class Rol extends Model
{
    use HasFactory;

    //atributos
    protected $fillable = [

        'nombreRol',
    ];

    public function usuarios(){
        return $this->hasMany(Usuario::class, 'idRol');
    }
}
