import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterErrorResponse } from 'src/app/interfaces/error-response';
import { UserUpdate } from 'src/app/interfaces/user-update';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-email-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule],
  templateUrl: './update-email-password.component.html',
  styleUrl: './update-email-password.component.css'
})
export class UpdateEmailPasswordComponent {
  @Input() userId: number
  @Output() onUpdate: EventEmitter<string> = new EventEmitter()
  router = inject(Router)
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
    const data = this.form.value
    data["id"] = this.userId
    this.authService.updateEmailAndPassword(data as UserUpdate).subscribe({
      next: (response) => {
        this.matSnackbar.open("Email and password were updated", "OK", {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top' 
        })
        this.onUpdate.emit("OK")
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
}
