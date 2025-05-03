import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from 'express';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseAcceso } from '../../interfaces/ReponseAcceso';
import { Login } from '../../interfaces/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 private AccesoService = inject(AccesoService); //Servicio de Autenticación
  private router = inject(Router); //Para navegar entre rutas
  public formBuild = inject(FormBuilder); //Para construir formularios

  public formLogin: FormGroup = this.formBuild.group({
    email: ['',Validators.required],
    password: ['',Validators.required],
  });

  // Metodo para iniciar sesión
  iniciarSesion(){
    // Validar si el formulario es valido
    if(this.formLogin.invalid) return; // Si no es valido no se ejecuta

    // Crear objeto con los datos del formulario
    const objeto: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }

    // LLamar al servicio de autenticación
    this.AccesoService.login(objeto).subscribe({
      next: (data: ResponseAcceso) => {
        if (data.status === 'success'){
          // Guardar el token en el local storage
          localStorage.setItem('token', data.data.token);
          // Redirigir a la página de inicio
          this.router.navigate(['/inicio']);
        }else {
          alert('Error al iniciar sesión, verifique sus credenciales');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Error al iniciar sesión, verifique sus credenciales');
      }
    });
  }
  registrarse(){
    this.router.navigate(['register']);
  }
}
