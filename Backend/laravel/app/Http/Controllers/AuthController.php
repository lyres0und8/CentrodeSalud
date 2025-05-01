<?php

namespace App\Http\Controllers;

use app\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    //metodo de registro
    public function registro(Request $request){
        //Validar datos de entarda 
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|min:3|max:255',
            'appat' => 'required|string|min:3|max:255',
            'apmat' => 'required|string|min:3|max:255',
            'rut' => 'required|string|max:255|unique:usuario',
            'telefono' => 'required|string|size:12',
            'correo' => 'required|string|email|max:255|unique:usuario',
            'contrasenia' => 'required|string|min:6|confirmed',
            'especialidad' => 'nullable|string|max:255',
            'habilitado' => 'required|boolean',
        ]);

        //Si la validacion falla, devolver un error
        if($validator->fails()){
            return response()->json([
                'status' => 'error',
                'messenge' => 'error de validacion',
                'errors' => $validator->errors(),
            ], 422);
        }
        //Asignar rol por defecto (Paciente = 2)
        $idRol = 2;

        $usuario = Usuario::create([
            'nombre'    => $request->nombre,
            'appat'    => $request->appat,
            'apmat'    => $request->apmat,
            'rut'    => $request->rut,
            'telefono'    => $request->telefono,
            'correo'    => $request->correo,
            'contrasenia'    => bcrypt($request->contrasenia),
            'idRol'    => $request->idRol,
        ]);
        //Retornar respuesta
        return response()->json([
            'status' => 'success',
            'messenge' => 'Usuario registardo exitosamente',
            'data' => $usuario,
        ], 201);
    }

    //Metodo de inicio de sesion
    public function iniciarSesion(Request $request){
        //Validar datos
        $validator = Validator::make($request->all(),[
            'correo' => 'required|String|email|max:255',
            'contrasenia' => 'required|string|size:6',
        ]);
        //Si falla la validacion
        if($validator->fails()){
            return response()->json([
                'status' => 'error',
                'messenge' => 'Error de validacion',
                'errors' => $validator->errors(),
            ], 422);
        }

        //Obtener las credenciales del request
        $credenciales = $request->only('correo', 'contrasenia');

        try {
            //intentar autentigar y generar token JWT
            if(!$token = JWTAuth::attempt($credenciales)){
                return response()->json([
                    'status' => 'error',
                    'meddenge' => 'Credenciales Invalidas',
                ], 401);
            }

            //Obtener usuario autenticado
            $usuario = JWTAuth::usuario();

            //Entregar respuesta exitosa con token y datos
            return response()->json([
                'status' => 'exito',
                'messenge' => 'Inicio de sesion exitoso',
                'data' => [
                    'user' => $usuario,
                    'token' => $token,
                ],
            ], 200);
        }catch (\Exception $e){
            //Captura errores
            return response()->json([
                'status' => 'error',
                'messenge' => 'Inicio de sesion fallido',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
