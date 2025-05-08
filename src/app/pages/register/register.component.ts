import { Component, AfterViewInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  public submitted = false;
  public successMessage: string = ''; // Mensaje de éxito
  public errorMessage: string[] = []; // Array para mensajes de error específicos
  public rutRepetido = false;
  public emailRepetido = false;
  public isMenuVisible = false;

  private accesoService = inject(AccesoService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  public formRegister: FormGroup = this.formBuilder.group(
    {
      rut: ['', [Validators.required, this.rutValidator()]], // Validador personalizado para RUT
      name: ['', [Validators.required, Validators.minLength(3)]], // Nombre obligatorio, mínimo 3 caracteres
      paternal_surname: ['', [Validators.required, Validators.minLength(3)]], // Apellido paterno obligatorio
      maternal_surname: ['', [Validators.required, Validators.minLength(3)]], // Apellido materno obligatorio
      phone: ['', [Validators.required, this.phoneValidator()]], // Teléfono obligatorio con formato válido
      email: ['', [Validators.required, Validators.email]], // Correo electrónico obligatorio y válido
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordStrengthValidator(),
        ],
      ], // Contraseña obligatoria con validaciones de seguridad
      password_confirmation: ['', [Validators.required]], // Confirmación de contraseña obligatoria
    },
    { validators: this.matchPasswordsValidator() } // Validador para confirmar contraseñas
  );

  get formControls() {
    return this.formRegister.controls;
  }

  public async registrarse(): Promise<void> {
    this.submitted = true;

    if (this.formRegister.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const formData = {
      ...this.formRegister.value,
      password_confirmation: this.formRegister.value.password_confirmation,
    };

    try {
      const response = await this.accesoService.registrarse(formData).toPromise();
      console.log('Registro exitoso:', response);

      // Mostrar mensaje de éxito
      this.successMessage = 'Registro exitoso. Redirigiendo al inicio de sesión...';

      // Redirigir al login después de 5 segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    } catch (error: any) {
      console.error('Error al registrar:', error);

      if (error?.error?.errors) {
        this.errorMessage = Object.values(error.error.errors).flat() as string[];
      } else if (error?.message) {
        this.errorMessage = [error.message];
      } else {
        this.errorMessage = ['Error al registrar el usuario. Inténtalo de nuevo.'];
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  private rutValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;

      // Verifica que el RUT tenga exactamente 9 caracteres
      if (!rut || rut.length !== 9) {
        return { invalidRut: true };
      }

      // Patrón de RUT sin puntos ni guion, con 8 dígitos y un dígito verificador
      const rutPattern = /^[0-9]{8}[K0-9]$/i;
      return rutPattern.test(rut) ? null : { invalidRut: true };
    };
  }

  private phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phone = control.value;
      if (!phone) return null;
      const regex = /^\+56\s?9\d{8}$/;
      return regex.test(phone) ? null : { telefonoInvalido: true };
    };
  }

  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      if (!password) return null;

      // Verifica que tenga al menos 8 caracteres, una mayúscula y un número
      const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      return regex.test(password)
        ? null
        : { passwordWeak: 'La contraseña no cumple con los estándares de seguridad.' };
    };
  }

  private matchPasswordsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('password_confirmation')?.value;

      return password === confirmPassword
        ? null
        : { passwordsMismatch: true };
    };
  }

  ngAfterViewInit(): void {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');

    if (toggle && menu && overlay) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
      });

      overlay.addEventListener('click', () => {
        menu.classList.add('hidden');
        overlay.classList.add('hidden');
      });
    }
  }
}
