import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
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
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');
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
