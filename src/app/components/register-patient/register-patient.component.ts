import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatRadioModule } from '@angular/material/radio'

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatRadioModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.css'
})
export class RegisterPatientComponent {
  hide = true
  authService = inject(AuthService)
  router = inject(Router)
  
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^\\S{5,}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*\\W)^.{8,}$')]),
    confirmPassword: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^\\S{3,}$')]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^\\S{3,}$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^\\d{10,14}$')]),
    age: new FormControl(18, [Validators.max(100), Validators.min(18), Validators.required]),
    gender: new FormControl(),
    medicalHistory: new FormControl()
  }, this.passwordConfirmValidator)

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({passwordMismatch: true})
      return {passwordMismatch: true}
    }
    return {}
  }

  registerPatient() {
    console.log(this.form.value)
  }
}
