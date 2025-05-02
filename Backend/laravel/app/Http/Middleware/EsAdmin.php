<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $usuario = auth('api')->user();

        //Verificar si el usuario es administrados y si esta autenticado
        if($usuario && $usuario->idRol == 1){
            return $next($request);
        }else{
            return response()->json([
                'status' => false,
                'messenge' => 'No autorizado',
            ], 401);
        }
    }
}
