import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { sortBy } from 'lodash-es';
import { UserDetails } from 'src/app/interfaces/user-details';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorResponse } from 'src/app/interfaces/error-response';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  router = inject(Router)
  authService = inject(AuthService)
  matSnackBar = inject(MatSnackBar)
  users: UserDetails[] = []
  tempUsers: UserDetails[] = []
  selectedUserId: number | null = null
  selectedAll = true
  selectedDoctors = false
  selectedPatients = false
  inputUsername = ''
  inputEmail = ''
  unsavedErrorMessage = ''
  error = ''
  errors = []
  disabled = true

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((data: UserDetails[]) => {
      this.users = data
      this.tempUsers = this.users
    })
  }

  sortOrder = {
    username: 'none',
    email: 'none',
    role: 'none',
    status: 'none'
  }
   
  sortUsers(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      this.sortOrder[sortKey] = 'desc'
      this.tempUsers = sortBy(this.tempUsers, sortKey).reverse()
    } else {
      this.sortOrder[sortKey] = 'asc'
      this.tempUsers = sortBy(this.tempUsers, sortKey)
    }

    for (let key in this.sortOrder) {
      if (key !== sortKey) {
        this.sortOrder[key] = 'none'
      }
    }
  }

  sortSign(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      return '▲';
    } else if (this.sortOrder[sortKey] === 'desc') {
      return '▼';
    } else {
      return '';
    }
  }

  toggleDetails(id: number) {
    if (this.checkUnsaved()) return
    this.selectedUserId = this.selectedUserId === id ? null : id   
  }

  showAll() {
    if (this.checkUnsaved()) return
    this.tempUsers = this.users
    this.selectedAll = true
    this.selectedDoctors = false
    this.selectedPatients = false
    this.selectedUserId = null
    this.inputUsername = ''
    this.inputEmail = ''
    this.disabled = true
  }

  showDoctors() {
    if (this.checkUnsaved()) return
    this.tempUsers = this.users.filter(u => u.userRole === 'Doctor')
    this.selectedDoctors = true
    this.selectedAll = false
    this.selectedPatients = false
    this.selectedUserId = null
    this.inputUsername = ''
    this.inputEmail = ''
    this.disabled = true
  }

  showPatients() {
    if (this.checkUnsaved()) return
    this.tempUsers = this.users.filter(u => u.userRole === 'Patient')
    this.selectedPatients = true
    this.selectedAll = false
    this.selectedDoctors = false
    this.selectedUserId = null
    this.inputUsername = ''
    this.inputEmail = ''
    this.disabled = true
  }

  searchByUsername() {
    if (this.checkUnsaved()) return
    this.inputEmail = ''
    this.tempUsers = this.users.filter(u => u.username.includes(this.inputUsername))
    this.selectedAll = true
    this.selectedDoctors = false
    this.selectedPatients = false
    this.selectedUserId = null
    this.disabled = true
  }

  searchByEmail() {
    if (this.checkUnsaved()) return
    this.inputUsername = ''
    this.tempUsers = this.users.filter(u => u.email.includes(this.inputEmail))
    this.selectedAll = true
    this.selectedDoctors = false
    this.selectedPatients = false
    this.selectedUserId = null
    this.disabled = true
  }

  onActivate(user: UserDetails) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.enableAccount(user.id).subscribe({
          next: (response) => {
            this.reloadComponent()
          },
          error: (err) => {
            this.matSnackBar.open(`Error enabling account`, 'Close', {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            })
            this.reloadComponent()
          }
        })
      }
    })
  }

  onDisable(user: UserDetails) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.disableAccount(user.id).subscribe({
          next: (response) => {
            this.reloadComponent()
          },
          error: (err) => {
            this.matSnackBar.open(`Error disabling account`, 'Close', {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            })
            this.reloadComponent()
          }
        })
      }
    })
  }

  onSave(user: UserDetails) {
    this.authService.updateUserDetails(user).subscribe({
      next: (response) => {
        this.matSnackBar.open('User was updated', 'OK', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
        this.reloadComponent()
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['welcome'])
        }
        this.error = (err.error as ErrorResponse).message

        this.errors = []
        for(const error in err.error.errors) {
          for (const errorItem of err.error.errors[error]) {
            this.errors.push(errorItem)
          }
        }
      }
    })
  }

  onCancel(user: UserDetails) {
    this.error = ''
    this.errors = []
    this.reloadComponent()
  }

  private reloadComponent() {
    this.router.navigateByUrl('/admin/account', {skipLocationChange: true}).then(() => {
      this.router.navigate(['admin'])
    })
  }

  private checkUnsaved() {
    if (this.selectedUserId && !this.disabled) {
      this.unsavedErrorMessage = 'You must save changes or cancel!'
      return true
    }
    this.unsavedErrorMessage = ''
    return false
  }
}
