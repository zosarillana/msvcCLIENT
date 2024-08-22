import { Component, EventEmitter, Inject, Input, Output, signal, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketVisits } from '../../../../models/market-visits';
import { MarketVisitsService } from '../../../../services/market-visits.service';

@Component({
  selector: 'app-modal-create-dialog',
  templateUrl: './modal-create-dialog.component.html',
  styleUrls: ['./modal-create-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCreateDialogComponent {
  @Input() mvisit?: MarketVisits;
  @Output() marketVisitsUpdated = new EventEmitter<MarketVisits[]>();
  readonly panelOpenState = signal(false);

  isAccountTypeOthersSelected = false;
  isIsrOthersSelected = false;
  isIsrNeedOthersSelected = false;

  constructor(
    private marketVisitsService: MarketVisitsService,
    public dialogRef: MatDialogRef<ModalCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onAccountTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value; // Extract the value from the event

    this.isAccountTypeOthersSelected = value === 'Others';
    if (!this.isAccountTypeOthersSelected) {
      this.data.visit_accountTypeOthers = ''; // Clear the input if "Others" is not selected
    }
  }
  OnIsrChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value; // Extract the value from the event

    this.isIsrOthersSelected = value === 'Others';
    if (!this.isIsrOthersSelected) {
      this.data.visit_isrOthers = ''; // Clear the input if "Others" is not selected
    }    
  }
  OnIsrNeedChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value; // Extract the value from the event

    this.isIsrNeedOthersSelected = value === 'Others';
    if (!this.isIsrNeedOthersSelected) {
      this.data.visit_isrNeed = ''; // Clear the input if "Others" is not selected
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.marketVisitsService.createMarketVisits(this.data).subscribe(() => {
      this.dialogRef.close(this.data);
    });
  }
}
