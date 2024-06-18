import { Component, Inject, OnInit, inject } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/user-details';
import { AuthService } from 'src/app/services/auth.service';
import { Dialog, DialogRef, DialogModule, DIALOG_DATA } from '@angular/cdk/dialog'
import { UpdateEmailPasswordComponent } from '../update-email-password/update-email-password.component';

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
    this.dialog.open(UpdateEmailAndPasswordDialogComponent)
  }
}

@Component({
  imports: [UpdateEmailPasswordComponent],
  standalone: true,
  template: `
    <app-update-email-password></app-update-email-password>
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
  ) {}
}
