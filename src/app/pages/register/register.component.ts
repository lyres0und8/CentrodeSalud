import { Component, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  public submitted = false;
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public rutRepetido = false;
  public emailRepetido = false;
  public isMenuVisible = false;

  public formRegister: FormGroup = this.formBuild.group(
    {
      name: ['', Validators.required],
      paternal_surname: ['', Validators.required],
      maternal_surname: ['', Validators.required],
      rut: ['', [Validators.required, this.rutValidator()]],
      phone: ['', [Validators.required, this.phoneValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    },
    { validators: [this.matchPasswords()] });

  public registrarse(): void {
    this.submitted = true;
    this.rutRepetido = false;
    this.emailRepetido = false;

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
        } else if (data.message?.includes('ya existe')) {
          this.rutRepetido = true;
          this.emailRepetido = true;
        }
        else {
          alert('No se pudo registrar el usuario');
        }
      },
      error: () => {
        console.error('Error al registrar el usuario: ', Error);
        alert('Error al intentar registrar. Intente nuevamente más tarde.');
      },
    });
  }

  volver() {
    this.router.navigate(['login']);
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  get rut() {
    return this.formRegister.get('rut');
  }

  private rutValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;
      if (!rut) return null;
      if (!/^\d{7,8}[0-9Kk]$/.test(rut)) return { rutInvalido: true };

      const body = rut.slice(0, -1);
      let dv = rut.slice(-1).toUpperCase();

      let sum = 0;
      let multiplier = 2;
      for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
      }

      const expectedDv = 11 - (sum % 11);
      const dvCalc = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();

      return dv === dvCalc ? null : { rutInvalido: true };
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

  private matchPasswords(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirm = group.get('password_confirmation')?.value;
      return password === confirm ? null : { passwordMismatch: true };
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

