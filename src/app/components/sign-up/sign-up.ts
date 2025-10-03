import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/clientService/clientService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})

export class SignUp {
  // signupForm!: FormGroup;
  // service = inject(ClientService);
  // router = inject(Router);

  // ngOnInit() {
  //   this.signupForm = new FormGroup({
  //     firstName: new FormControl('', Validators.required),
  //     middleName: new FormControl(''),
  //     lastName: new FormControl('', Validators.required),
  //     mobileNo: new FormControl('', Validators.required),
  //     altMobileNo: new FormControl(''),
  //     emailId: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(8),
  //       Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
  //     ]),
  //     confirmPassword: new FormControl('', Validators.required),
  //   }, { validators: this.passwordMatchValidator });
  // }

  // passwordMatchValidator(control: AbstractControl) {
  //   const password = control.get('password')?.value;
  //   const confirmPassword = control.get('confirmPassword')?.value;
  //   return password === confirmPassword ? null : { mismatch: true };
  // }

  // onRegister() {
  //   if (this.signupForm.valid) {
  //     const payload = {
  //       userId: 0,
  //       firstName: this.signupForm.get('firstName')?.value,
  //       middleName: this.signupForm.get('middleName')?.value,
  //       lastName: this.signupForm.get('lastName')?.value,
  //       mobileNo: this.signupForm.get('mobileNo')?.value,
  //       altMobileNo: this.signupForm.get('altMobileNo')?.value,
  //       emailId: this.signupForm.get('emailId')?.value,
  //       password: this.signupForm.get('password')?.value,
  //     };

  //     this.service.createUser(payload).subscribe((res) => {
  //       if (res.result) {
  //         alert('Registration successful! Please login.');
  //         this.router.navigateByUrl('/login');
  //       } else {
  //         alert(res.message || 'Registration failed.');
  //       }
  //     });
  //   }
  // }

  // goToLogin() {
  //   this.router.navigateByUrl('/login');
  // }
}
