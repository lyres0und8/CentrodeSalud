import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formRegister: FormGroup = this.formBuild.group({
    name: ['', Validators.required],
    paternal_surname: ['', Validators.required],
    maternal_surname: ['', Validators.required],
    rut: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', Validators.required],
  });

  registrarse() {
    if (this.formRegister.invalid) return;

    const usuario: User = {
      name: this.formRegister.value.name,
      paternal_surname: this.formRegister.value.paternal_surname,
      maternal_surname: this.formRegister.value.maternal_surname,
      rut: this.formRegister.value.rut,
      phone: this.formRegister.value.phone,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
      password_confirmation: this.formRegister.value.password_confirmation,
    };

    this.accesoService.registrarse(usuario).subscribe({
      next: (data) => {
        if (data.status === 'success') {
          this.router.navigate(['login']);
        } else {
          alert('No se pudo registrar el usuario');
        }
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Error al intentar registrar. Intente nuevamente más tarde.');
      },
    });
  }

  volver() {
    this.router.navigate(['login']);
  }
}
