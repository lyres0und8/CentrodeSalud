<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * Atributos del modelo
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'primerNombre',
        'primerApellido',
        'segundoApellido',
        'telefono',
        'rut',
        'correo',
        'contrasenia',
        'especialidad',
        'habilitado',
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    //relacionar el usuario con el Rol (1 usuario tiene solo 1 rol)
    public function rol(){
        return $this->belongsTo(Rol::class, 'idRol');
    }
}
