import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { IsrService } from '../../../../../../../services/isr.service';
import { Isr } from '../../../../../../../models/isr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDeleteAreaComponent } from '../../../area-add/modal/modal-delete-area/modal-delete-area.component';

@Component({
  selector: 'app-modal-delete-isr',
  templateUrl: './modal-delete-isr.component.html',
  styleUrl: './modal-delete-isr.component.css',
})
export class ModalDeleteIsrComponent {
  @Input() isr?: Isr;
  @Output() isrUpdated = new EventEmitter<Isr[]>();

  constructor(
    private isrService: IsrService,
    public dialogRef: MatDialogRef<ModalDeleteAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteArea(): void {
    this.isrService.deleteIsrs(this.data).subscribe(() => {
      this.fetchUsers();
      this.dialogRef.close(this.data); // Close the dialog after fetching users
    });
  }

  // Fetch users after deletion to update the list
  private fetchUsers() {
    this.isrService.getIsrs().subscribe((isrs: Isr[]) => {
      this.isrUpdated.emit(isrs); // Emit the updated user list
    });
  }
}
