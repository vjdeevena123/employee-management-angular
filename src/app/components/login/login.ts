import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/clientService/clientService';
import { APIResponseModel } from '../../models/interfaces/roles/roles';
import {jwtDecode} from 'jwt-decode';
import { lastValueFrom } from 'rxjs';
import { ForgotPassword } from "../forgot-password/forgot-password";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, ForgotPassword],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // track tab
  activeTab: 'login' | 'signup' = 'login';
  isLoggingIn = false;

  // login form
  loginForm = new FormGroup({
    EmailId: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required),
  });

  // signup form
  signupForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      altMobileNo: new FormControl('', Validators.pattern(/^[0-9]{10}$/)),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
        ),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.passwordMatchValidator }
  );
  errorMsg = '';

  passwordMatchValidator(control: AbstractControl) {
    const pass = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  router = inject(Router);
  service = inject(ClientService);
  showForgotPassword = false;
  closeForgotPassword = () => {
    this.showForgotPassword = false;
  };

  async onLogin() {
    const { EmailId, Password } = this.loginForm.value;
    // Replace with real authentication
    if (this.loginForm.invalid) {
      this.showToast('Please fill in all required fields', 'error');
      this.isLoggingIn = false;
      return;
    } 
    else 
    {
      if (EmailId && Password) {
        this.isLoggingIn = true;
        this.service
          .getUserLogin(this.loginForm.value)
          .subscribe(async (res: APIResponseModel) => {
            if (res.result) {
              localStorage.setItem('loginToken', res.data.token);
              await this.getUserIdByEmail(EmailId);
              this.showToast('Login successful! Redirecting...', 'success');
              this.router.navigateByUrl('/dashboard');
              this.isLoggingIn = false;
            } else {
              this.showToast('Login failed! Redirecting...', 'error');
              this.errorMsg = 'Invalid email or password';
              this.loginForm.reset();
              this.isLoggingIn = false;
            }
          });
      }
    }
  }

  async getUserIdByEmail(email: string) {
    const userList: any = await lastValueFrom(this.service.getUsersList());
    if (userList.result) {
      userList.data.forEach((u: any) => {
        if (u.emailId === email) {
          localStorage.setItem('userDetails', JSON.stringify(u));
          localStorage.setItem('userId', JSON.stringify(u.userId));
          console.log('Logged in user:', u.userId);
        }
      });
    }
  }

  // signup handler
  onSignup() {
    if (this.signupForm.valid) {
      this.isLoggingIn = true;

      const payload = {
        userId: 0,
        firstName: this.signupForm.get('firstName')?.value,
        middleName: this.signupForm.get('middleName')?.value,
        lastName: this.signupForm.get('lastName')?.value,
        mobileNo: this.signupForm.get('mobileNo')?.value,
        altMobileNo: this.signupForm.get('altMobileNo')?.value,
        emailId: this.signupForm.get('emailId')?.value,
        password: this.signupForm.get('password')?.value,
      };

      this.service.createUser(payload).subscribe((res: any) => {
        if (res.result) {
          this.showToast("Signup successful! please Login", "success");
          this.activeTab = 'login'; // switch back to login
          this.signupForm.reset();
          this.isLoggingIn = false;
        } else {
          this.showToast('Registration failed.', "error");
          this.isLoggingIn = false;
        }
      });
    }
    else{
      this.isLoggingIn = false;
      this.showToast("Please complete all fields correctly", "error");
      return;
    }
  }

  toast = {
    show: false,
    message: '',
    type: '' as 'success' | 'error',
  };

  showToast(message: string, type: 'success' | 'error') {
    this.toast = { show: true, message, type };
    setTimeout(() => (this.toast.show = false), 3000); // auto-hide in 3s
  }
}

