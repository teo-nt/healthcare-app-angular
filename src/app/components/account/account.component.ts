import { Component, Inject, OnInit, inject } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/user-details';
import { AuthService } from 'src/app/services/auth.service';
import { Dialog, DialogRef, DialogModule, DIALOG_DATA } from '@angular/cdk/dialog'
import { UpdateEmailPasswordComponent } from '../update-email-password/update-email-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  authService = inject(AuthService)
  userDetails: UserDetails
  router = inject(Router)

  constructor(public dialog: Dialog) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe({
      next: (response) => {
        this.userDetails = response
      },
      error: (err) => {
        this.authService.logout()
      }
    })
  }

  onUpdateEmailAndPassword() {
    const dialogRef = this.dialog.open(UpdateEmailAndPasswordDialogComponent, {data: this.userDetails.id})

    dialogRef.closed.subscribe((result) => {
      if (result === 'updated') {
        // Get the current url as array
        const currentUrlSegments = this.router.url.split('/')

        // Remove the last route (/account)
        currentUrlSegments.pop()

        // Navigate back to the current route to reload the component
        this.router.navigate(currentUrlSegments, { skipLocationChange: true }).then(() => {
          // Navigate back to the actual route to reload the component
          currentUrlSegments.push('account')
          this.router.navigate(currentUrlSegments);
        });
      }
    })
  }
}

@Component({
  imports: [UpdateEmailPasswordComponent],
  standalone: true,
  template: `
    <app-update-email-password [userId]="id" (onUpdate)='afterUpdating()'></app-update-email-password>
    <button class="btn btn-danger btn-md" (click)="dialogRef.close()">Cancel</button>
  `,
  styles: [
    `
    :host {
      display: block;
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      max-width: 316px;
    }
    `
  ]
})
class UpdateEmailAndPasswordDialogComponent {
  constructor(
    public dialogRef: DialogRef, 
    @Inject(DIALOG_DATA) public id: number
  ) {}

  afterUpdating() {
    this.dialogRef.close('updated')
  }
}
