import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  token: string | null = '';
  email: string | null = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/),
          ],
        ],
        password_confirmation: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator() }
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');
  }

  passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pass = group.get('password')?.value;
      const confirm = group.get('password_confirmation')?.value;
      return pass === confirm ? null : { passwordsMismatch: true };
    };
  }

  onSubmit() {
    if (this.form.valid && this.token && this.email) {
      const data = {
        token: this.token,
        email: this.email,
        password: this.form.value.password,
        password_confirmation: this.form.value.password_confirmation,
      };

      this.http
        .post('http://localhost:8000/api/resetPassword', data)
        .subscribe({
          next: () => this.router.navigate(['/login']),
          error: (err) => console.error(err),
        });
    }
  }
}
