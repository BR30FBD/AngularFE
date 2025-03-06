import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:[ReactiveFormsModule,CommonModule],
  styleUrls: ['./login.component.scss'], //  Fixed (plural)
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        console.log(this.loginForm.value);
        this.isLoading = false;
        this.router.navigate(["/dashboard"]);
      }, 1500);
    }
  }

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:3000/auth/google'; //  Correct Google Auth Redirect
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      console.log('Token from URL:', token);
      if (token) {
        localStorage.setItem('token', token); //  Store token in localStorage
        console.log('Token stored:', token);
        
        //  Add slight delay before redirecting
        setTimeout(() => {
          console.log('Token stored:', token);
          this.router.navigate(['/dashboard'], { queryParamsHandling: 'merge' }); //  Keeps query parameters
        }, 500);
        
      }
    });
  }
}
