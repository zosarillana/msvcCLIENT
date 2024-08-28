import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Area } from '../../../../../../../models/area';
import { AreaService } from '../../../../../../../services/area.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete-area',
  templateUrl: './modal-delete-area.component.html',
  styleUrl: './modal-delete-area.component.css'
})
export class ModalDeleteAreaComponent {
  @Input() area?: Area;
  @Output() areaUpdated = new EventEmitter<Area[]>();

  constructor(
    private areaService: AreaService,
    public dialogRef: MatDialogRef<ModalDeleteAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteArea(): void {
    this.areaService
      .deleteAreas(this.data)
      .subscribe(() => {
        this.fetchUsers();
        this.dialogRef.close(this.data); // Close the dialog after fetching users
      });
  }

  // Fetch users after deletion to update the list
  private fetchUsers() {
    this.areaService.getAreas().subscribe((areas: Area[]) => {
      this.areaUpdated.emit(areas); // Emit the updated user list
    });
  }
}