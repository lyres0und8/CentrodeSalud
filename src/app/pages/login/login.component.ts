import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccesoService } from '../../services/acceso.service';
import { Login } from '../../interfaces/Login';
import { ResponseAcceso } from '../../interfaces/ReponseAcceso';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private accesoService: AccesoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const loginData: Login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log('Intentando login con:', loginData);

    this.accesoService.login(loginData).subscribe({
      next: (response: ResponseAcceso) => {
        console.log('Respuesta del servidor:', response);

        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userData', JSON.stringify(response.user));
          this.router.navigate(['/inicio']);
        } else {
          this.errorMessage = 'Credenciales inválidas';
        }
      },
      error: (error) => {
        console.error('Error durante el login:', error);
        if (error.status === 401) {
          this.errorMessage = 'Correo o contraseña incorrectos';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Por favor, intente nuevamente.';
        }
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }
}
