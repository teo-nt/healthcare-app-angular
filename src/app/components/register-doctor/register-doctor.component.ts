import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { RegisterErrorResponse } from 'src/app/interfaces/error-response';
import { RegisterDoctor } from 'src/app/interfaces/register-doctor';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-doctor',
  standalone: true,
  imports: [MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-doctor.component.html',
  styleUrl: './register-doctor.component.css'
})
export class RegisterDoctorComponent {
  hide = true
  authService = inject(AuthService)
  router = inject(Router)
  matSnackbar = inject(MatSnackBar)
  errors: {}
  errorList = []
  errorMessage = ''

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^\\S{5,}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*\\W)^.{8,}$')]),
    confirmPassword: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^\\S{3,}$')]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^\\S{3,}$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^\\d{10,14}$')]),
    city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^\\S.+\\S$')]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^\\S.+\\S$')]),
    streetNumber: new FormControl(1, [Validators.required, Validators.min(1)]),
    speciality: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(80), Validators.pattern('^\\S.+\\S$')]),
    appointmentDuration: new FormControl(30, [Validators.min(15), Validators.max(60)])
  }, this.passwordConfirmValidator)

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({passwordMismatch: true})
      return {passwordMismatch: true}
    }
    return {}
  }

  durationValue = this.form.get('appointmentDuration').value

  registerDoctor() {
    this.authService.registerDoctor(this.form.value as RegisterDoctor).subscribe({
      next: (response) => {
        this.matSnackbar.open("Thank you for submitting the form. Please give us some time to approve your account.", 'Close', {
          duration: 8000,
          horizontalPosition: 'center'
        })
        this.router.navigate(['welcome', 'login'])
      },
      error: (err) => {
        this.errorList = []
        this.errorMessage = err.error.message
        this.errors = (err.error as RegisterErrorResponse).errors
        for (let errorItem in this.errors) {
          for (let errorMessage of this.errors[errorItem]) {
            this.errorList.push(errorMessage)
          }
        }
      }
    })
  }

  changeDurationValue() {
    this.durationValue = this.form.get('appointmentDuration').value
  }
}
