import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { User } from '../../../../../../../models/user';
import { UserService } from '../../../../../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete-user-dialog',
  templateUrl: './modal-delete-user-dialog.component.html',
  styleUrls: ['./modal-delete-user-dialog.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class ModalDeleteUserDialogComponent {
  @Input() user?: User;
  @Output() userUpdated = new EventEmitter<User[]>();

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ModalDeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser(): void {
    this.userService
      .deleteUser(this.data)
      .subscribe(() => {
        this.fetchUsers();
        this.dialogRef.close(this.data); // Close the dialog after fetching users
      });
  }

  // Fetch users after deletion to update the list
  private fetchUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.userUpdated.emit(users); // Emit the updated user list
    });
  }
}
