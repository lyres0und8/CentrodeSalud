import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Inicializar el formulario reactivo
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const email = this.forgotPasswordForm.get('email')?.value;
    // 👇 Enviar al backend
    this.http
      .post<any>('http://localhost:8000/api/forgotPassword', { email })
      .subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.errorMessage = null;
          this.forgotPasswordForm.reset();
        },
        error: (error) => {
          this.errorMessage =
            error.error.message || 'Error al enviar el correo.';
          this.successMessage = null;
        },
      });
  }
}
