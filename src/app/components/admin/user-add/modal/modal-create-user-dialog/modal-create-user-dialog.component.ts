import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MarketVisits } from '../../../../../models/market-visits';
import { MarketVisitsService } from '../../../../../services/market-visits.service';
import { ModalCreateDialogComponent } from '../../../../get-market-visits/modal/modal-create-dialog/modal-create-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../models/user';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-modal-create-user-dialog',
  templateUrl: './modal-create-user-dialog.component.html',
  styleUrl: './modal-create-user-dialog.component.css'
})
export class ModalCreateUserDialogComponent {
  @Input() user?: User;
  @Output() userUpdated = new EventEmitter<User[]>();

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ModalCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    this.userService.createMarketVisits(this.data).subscribe(() => {
      this.dialogRef.close(this.data);
    });
  }
}