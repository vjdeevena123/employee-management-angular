import { Component, inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/clientService/clientService';
import { MyButton } from "../../reusableComponents/my-button/my-button";

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, MyButton],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword implements OnInit {
  @Input() closePopup!: () => void; // parent will pass function to close popup
  resetForm!: FormGroup;
  user: any;
  passwordStrength: string = '';
  strengthColor: string = 'red';
  strengthPercent: number = 0;
  step: number = 1; // 🔹 Step control (1 = enter email, 2 = not found, 3 = reset, 4 = success)
  loading: boolean = false; // 🔹 spinner state

  onCancel() {
    this.closePopup();
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('userDetails');
    if (userData) {
      this.user = JSON.parse(userData);
    }

    this.resetForm = new FormGroup(
      {
        userId: new FormControl(this.user?.userId || '', [
          Validators.required,
          Validators.email,
        ]),
        emailId: new FormControl( '', [Validators.required, Validators.email] ),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(/^(?=.*[@])(?=.*(\.com|\.co\.in)).*$/) // must have '@' and '.com' or '.co.in'
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
    // 🔹 Watch password changes
    this.resetForm.get('password')?.valueChanges.subscribe((value) => {
      this.checkPasswordStrength(value);
    });
  }

   // Step 1 → Verify email existence
  onVerifyEmail() {
    const email = this.resetForm.get('emailId')?.value;
    if (!email || this.resetForm.get('emailId')?.invalid) {
      alert('Please enter a valid email.');
      return;
    }

    this.loading = true;
    this.service.getUsersList().subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.result) {
          const foundUser = res.data.find((u: any) => u.emailId === email);
          if (foundUser) {
            this.user = foundUser;
            this.step = 3; // go to reset password step
          } else {
            this.step = 2; // email not found
          }
        }
      },
      error: (err: any) => {
        this.loading = false;
        alert('Something went wrong while verifying email.');
        console.error(err);
      }
    });
  }

  // Step 2 → Back to email input
  backToEmail() {
    this.step = 1;
    this.resetForm.reset();
  }

  service = inject(ClientService);
  router = inject(Router);

  // Step 3 → Update password
  onResetPassword() {
    if (this.resetForm.valid && this.user) {
      const payload = {
        userId: this.user.userId,
        firstName: this.user.firstName,
        middleName: this.user.middleName,
        lastName: this.user.lastName,
        mobileNo: this.user.mobileNo,
        emailId: this.user.emailId,
        altMobileNo: this.user.altMobileNo,
        password: this.resetForm.get('password')?.value,
      };

      this.loading = true;
      this.service.updateUserPassword(payload).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res.result) {
            this.step = 4; // ✅ Success screen
            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 2000);
          } else {
            alert(res.message || 'Password update failed.');
          }
        },
        error: (err: any) => {
          this.loading = false;
          alert('An error occurred while updating the password.');
          console.error(err);
        }
      });
    }
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Check password strength
  checkPasswordStrength(password: string) {
    if (!password) {
      this.passwordStrength = '';
      this.strengthColor = 'red';
      this.strengthPercent = 0;
      return;
    }

    let strength = 0;
    if (/[A-Z]/.test(password)) strength++; // Uppercase
    if (/[a-z]/.test(password)) strength++; // Lowercase
    if (/\d/.test(password)) strength++; // Number
    if (/[@$!%*?&]/.test(password)) strength++; // Special char
    if (password.length >= 8) strength++; // Length

    this.strengthPercent = (strength / 5) * 100;

    if (strength <= 2) {
      this.passwordStrength = 'Weak';
      this.strengthColor = 'red';
    } else if (strength === 3 || strength === 4) {
      this.passwordStrength = 'Medium';
      this.strengthColor = 'orange';
    } else {
      this.passwordStrength = 'Strong';
      this.strengthColor = 'green';
    }
  }
  
}