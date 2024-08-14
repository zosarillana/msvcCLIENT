import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketVisits } from '../../../models/market-visits';
import { MarketVisitsService } from '../../../services/market-visits.service';

@Component({
  selector: 'app-modal-create-dialog',
  templateUrl: './modal-create-dialog.component.html',
  styleUrl: './modal-create-dialog.component.css',
})
export class ModalCreateDialogComponent {
  @Input() mvisit?: MarketVisits;
  @Output() marketVisitsUpdated = new EventEmitter<MarketVisits[]>();

  constructor(
    private marketVisitsService: MarketVisitsService,
    public dialogRef: MatDialogRef<ModalCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    this.marketVisitsService.createMarketVisits(this.data).subscribe(() => {
      this.dialogRef.close(this.data);
    });
  }
}
