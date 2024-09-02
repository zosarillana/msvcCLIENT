import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Area } from '../../../../../../../models/area';
import { AreaService } from '../../../../../../../services/area.service';
import { formatDate } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../../../../models/user';

@Component({
  selector: 'app-modal-view-area',
  templateUrl: './modal-view-area.component.html',
  styleUrls: ['./modal-view-area.component.css'] // Corrected property name from 'styleUrl' to 'styleUrls'
})
export class ModalViewAreaComponent {
  @Input() area?: Area; // This may not be necessary if you're using MAT_DIALOG_DATA to pass the data
  @Output() areaUpdated = new EventEmitter<User[]>();

  formattedDate: string = '';
  formattedDateUpdated: string = '';

  constructor(
    private areaService: AreaService,
    public dialogRef: MatDialogRef<ModalViewAreaComponent>, // Corrected type here
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.formattedDate = formatDate(this.data.date_created, 'short', 'en-US');
      this.formattedDateUpdated = formatDate(this.data.date_updated, 'short', 'en-US');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
