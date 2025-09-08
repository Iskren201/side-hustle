import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loading = false;
  errorMsg = '';
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  submit() {
    if (this.form.invalid) return;
    this.loading = true; this.errorMsg = '';
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => { this.errorMsg = err?.error?.message || 'Невалидни данни'; this.loading = false; }
    });
  }
}
