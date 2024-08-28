import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../../../../models/user';
import { UserService } from '../../../../../../../services/user.service';

@Component({
  selector: 'app-modal-create-user-dialog',
  templateUrl: './modal-create-user-dialog.component.html',
  styleUrls: ['./modal-create-user-dialog.component.css'],
})
export class ModalCreateUserDialogComponent {
  @Input() user?: User;
  @Output() userUpdated = new EventEmitter<User[]>();

  // Object to hold field-specific error messages
  errorMessages: { [key: string]: string[] } = {};

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ModalCreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    // Convert role_id to number if it is a string
    if (typeof this.data.role === 'string') {
      this.data.role = parseInt(this.data.role, 10);
    }

    // Ensure date fields are handled correctly if they come from user input
    // Example: this.data.date_created = new Date(this.data.date_created);

    this.userService.createUser(this.data).subscribe({
      next: (response) => {
        console.log(this.data);
        this.dialogRef.close(this.data);
      },
      error: (errorResponse) => {
        console.log('Error Response:', errorResponse);
        this.errorMessages = {};

        if (errorResponse && typeof errorResponse === 'object') {
          if (errorResponse.errors) {
            for (const [key, value] of Object.entries(errorResponse.errors)) {
              if (Array.isArray(value)) {
                this.errorMessages[key] = value;
              } else if (typeof value === 'string') {
                this.errorMessages[key] = [value];
              } else {
                this.errorMessages[key] = ['Unexpected error format.'];
              }
            }
          } else if (errorResponse.message) {
            this.errorMessages['general'] = [errorResponse.message];
          } else {
            this.errorMessages['general'] = ['Unexpected error format.'];
          }
        } else {
          this.errorMessages['general'] = ['An unknown error occurred.'];
        }
      },
    });
  }
}
