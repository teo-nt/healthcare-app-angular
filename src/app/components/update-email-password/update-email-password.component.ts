import { Component, inject } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-email-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule],
  templateUrl: './update-email-password.component.html',
  styleUrl: './update-email-password.component.css'
})
export class UpdateEmailPasswordComponent {
  hide = true
  authService = inject(AuthService)
  
  matSnackbar = inject(MatSnackBar)
  errors: {}
  errorList = []
  errorMessage = ''
  
  form = new FormGroup({  
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*\\W)^.{8,}$')]),
    confirmPassword: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]) 
  }, this.passwordConfirmValidator)

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({passwordMismatch: true})
      return {passwordMismatch: true}
    }
    return {}
  }

  updateEmailAndPassword() {
    //this.authService
  }
}
