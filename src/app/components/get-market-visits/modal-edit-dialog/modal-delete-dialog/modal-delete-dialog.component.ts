import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketVisits } from '../../../../models/market-visits';
import { MarketVisitsService } from '../../../../services/market-visits.service';

@Component({
  selector: 'app-modal-delete-dialog',
  templateUrl: './modal-delete-dialog.component.html',
  styleUrl: './modal-delete-dialog.component.css',
})
export class ModalDeleteDialogComponent {
  @Input() mvisit?: MarketVisits;
  @Output() marketVisitsUpdated = new EventEmitter<MarketVisits[]>();

  constructor(
    private marketVisitsService: MarketVisitsService,
    public dialogRef: MatDialogRef<ModalDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteVisit(): void {
    this.marketVisitsService
      .deleteMarketVisits(this.data)
      .subscribe(() => this.fetchMarketVisits());
    this.dialogRef.close(this.data);
  }

  //for editing and updating
  private fetchMarketVisits() {
    this.marketVisitsService
      .getMarketVisits()
      .subscribe((visits: MarketVisits[]) => {
        this.marketVisitsUpdated.emit(visits);
      });
  }
}
