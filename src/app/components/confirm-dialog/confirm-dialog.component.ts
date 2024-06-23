import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onCancel() {
    this.dialogRef.close(false)
  }

  onConfirm() {
    this.dialogRef.close(true)
  }
}
