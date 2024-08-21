import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../../models/user';
import { UserService } from '../../../../../services/user.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modal-edit-user-dialog',
  templateUrl: './modal-edit-user-dialog.component.html',
  styleUrls: ['./modal-edit-user-dialog.component.css'],
})
export class ModalEditUserDialogComponent {
  @Input() user?: User;
  @Output() userUpdated = new EventEmitter<User[]>();
  isPasswordEnabled = false; // Default is disabled

  errorMessages: { [key: string]: string[] } = {};

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ModalEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog // Inject MatDialog service
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(); // Proceed with saving if the user confirmed
      }
    });
  }

  save(): void {
    this.userService.updateUser(this.data).subscribe({
      next: (response) => {
        this.dialogRef.close(this.data);
      },
      error: (errorResponse) => {
        // Log the error response for debugging
        console.log('Error Response:', errorResponse);

        // Clear previous error messages
        this.errorMessages = {};

        if (errorResponse && typeof errorResponse === 'object') {
          if (errorResponse.errors) {
            // Handle validation errors
            for (const [key, value] of Object.entries(errorResponse.errors)) {
              if (Array.isArray(value)) {
                this.errorMessages[key] = value; // Map field to its errors
              } else if (typeof value === 'string') {
                this.errorMessages[key] = [value]; // Single error message as an array
              } else {
                this.errorMessages[key] = ['Unexpected error format.'];
              }
            }
          } else if (errorResponse.message) {
            this.errorMessages['general'] = [errorResponse.message]; // General error message
          } else {
            this.errorMessages['general'] = ['Unexpected error format.'];
          }
        } else {
          this.errorMessages['general'] = ['An unknown error occurred.'];
        }
      },
    });
  }

  // Method to toggle password field enabled state
  togglePasswordField(event: any) {
    this.isPasswordEnabled = event.target.checked;
  }

  //for editing and updating
  private fetchMarketVisits() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.userUpdated.emit(users);
    });
  }
}
