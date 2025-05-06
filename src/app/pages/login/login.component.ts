import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router'; // Corrección de importación
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseAcceso } from '../../interfaces/ReponseAcceso';
import { Login } from '../../interfaces/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private accesoService = inject(AccesoService); // Servicio de autenticación
  private router = inject(Router); // Para navegar entre rutas
  private formBuilder = inject(FormBuilder); // Para construir formularios

  public formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], // Validación de email
    password: ['', Validators.required],
  });

  // Método para iniciar sesión
  iniciarSesion() {
    // Validar si el formulario es válido
    if (this.formLogin.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    // Crear objeto con los datos del formulario
    const objeto: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    // Llamar al servicio de autenticación
    this.accesoService.login(objeto).subscribe({
      next: (data: ResponseAcceso) => {
        if (data.status === 'success') {
          // Guardar el token en el local storage
          localStorage.setItem('token', data.data.token);
          // Redirigir a la página de inicio
          this.router.navigate(['/inicio']);
        } else {
          alert('Error al iniciar sesión, verifique sus credenciales.');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión. Intente nuevamente.');
      },
    });
  }

  // Método para redirigir al registro
  registrarse() {
    this.router.navigate(['/register']);
  }
}
