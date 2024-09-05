import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Pod } from '../../../../../../../models/pod';
import { PodService } from '../../../../../../../services/pod.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDeleteAreaComponent } from '../../../area-add/modal/modal-delete-area/modal-delete-area.component';

@Component({
  selector: 'app-modal-delete-pod',
  templateUrl: './modal-delete-pod.component.html',
  styleUrl: './modal-delete-pod.component.css'
})
export class ModalDeletePodComponent {
  @Input() pod?: Pod;
  @Output() podUpdated = new EventEmitter<Pod[]>();

  constructor(
    private podService: PodService,
    public dialogRef: MatDialogRef<ModalDeletePodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteArea(): void {
    this.podService.deletePods(this.data).subscribe(() => {
      this.fetchUsers();
      this.dialogRef.close(this.data); // Close the dialog after fetching users
    });
  }

  // Fetch users after deletion to update the list
  private fetchUsers() {
    this.podService.getPods().subscribe((pods: Pod[]) => {
      this.podUpdated.emit(pods); // Emit the updated user list
    });
  }
}
