import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup; // Usa el operador `!` para indicar que será inicializado más tarde

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Inicializa el formulario aquí
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  iniciarSesion(): void {
    if (this.formLogin.valid) {
      const { email, password } = this.formLogin.value;
      console.log('Iniciando sesión con:', email, password);
      // Aquí puedes agregar lógica para autenticar al usuario
    } else {
      console.log('Formulario inválido');
    }
  }

  registrarse(): void {
    this.router.navigate(['/register']); // Redirige al componente de registro
  }
}
