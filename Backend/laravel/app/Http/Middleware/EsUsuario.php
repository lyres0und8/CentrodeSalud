<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EsUsuario
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verificar si el usuario está autenticado
        $usuario = auth('api')->user();
    
        // Si el usuario no está autenticado, devolver un error 401
        if (!$usuario) {
            return response()->json([
                'status' => false,
                'message' => 'Debe iniciar sesión para acceder a este recurso',
            ], 401);
        }
        // Si el usuario está autenticado, continuar con la solicitud
        return $next($request);
    }
}
