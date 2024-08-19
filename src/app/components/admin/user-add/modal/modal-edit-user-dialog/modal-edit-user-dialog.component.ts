import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { User } from '../../../../../models/user';
import { UserService } from '../../../../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit-user-dialog',
  templateUrl: './modal-edit-user-dialog.component.html',
  styleUrl: './modal-edit-user-dialog.component.css',
})
export class ModalEditUserDialogComponent {
  @Input() user?: User;
  @Output() userUpdated = new EventEmitter<User[]>();

  errorMessages: { [key: string]: string[] } = {};

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ModalEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
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
  //for editing and updating
  private fetchMarketVisits() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.userUpdated.emit(users);
    });
  }
}
