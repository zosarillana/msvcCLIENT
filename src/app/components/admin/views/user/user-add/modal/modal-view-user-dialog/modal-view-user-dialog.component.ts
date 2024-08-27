import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../../../../models/user';
import { UserService } from '../../../../../../../services/user.service';
import { ModalEditUserDialogComponent } from '../modal-edit-user-dialog/modal-edit-user-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modal-view-user-dialog',
  templateUrl: './modal-view-user-dialog.component.html',
  styleUrl: './modal-view-user-dialog.component.css',
})
export class ModalViewUserDialogComponent {
  @Input() user?: User;
  @Output() userUpdated = new EventEmitter<User[]>();

  formattedDate: string = '';
  formattedDateUpdated: string = '';
  ngOnInit() {
    this.formattedDate = formatDate(this.data.date_created, 'short', 'en-US');
    this.formattedDateUpdated = formatDate(this.data.date_updated, 'short', 'en-US');
  }

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ModalEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
