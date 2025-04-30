<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
