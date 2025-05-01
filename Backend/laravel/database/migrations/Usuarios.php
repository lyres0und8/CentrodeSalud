<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //esta es la tabla de usuarios, sus campos van según el modelo .dia
        Schema::create('Usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('primerNombre');
            $table->string('primerApellido');
            $table->string('segundoApellido');
            $table->string('telefono');
            $table->string('rut')->unique(); //unico
            $table->string('correo')->unique(); //unico
            $table->string('contrasenia');
            $table->string('especialidad')->nullable(); //que puede ser nulo
            $table->boolean('habilitado')->default(true); //es booleano y por defecto está es habilitado
            $table->timestamp('correoVerificadoEn')->nullable(); 
            $table->foreignId('idRol')->constrained()->onDelete('cascade'); //la clave foranea es necesaria y si se borra el admin se borra todo.
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
