import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Area } from '../../../../../../../models/area';
import { AreaService } from '../../../../../../../services/area.service';
import { formatDate } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../../../../models/user';
import { ModalEditUserDialogComponent } from '../../../../user/user-add/modal/modal-edit-user-dialog/modal-edit-user-dialog.component';

@Component({
  selector: 'app-modal-view-area',
  templateUrl: './modal-view-area.component.html',
  styleUrl: './modal-view-area.component.css'
})
export class ModalViewAreaComponent {
  @Input() area?: Area;
  @Output() areaUpdated = new EventEmitter<User[]>();

  formattedDate: string = '';
  formattedDateUpdated: string = '';
  ngOnInit() {
    this.formattedDate = formatDate(this.data.date_created, 'short', 'en-US');
    this.formattedDateUpdated = formatDate(this.data.date_updated, 'short', 'en-US');
  }

  constructor(
    private areaService: AreaService,
    public dialogRef: MatDialogRef<ModalEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
