import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketVisits } from '../../../../models/market-visits';
import { MarketVisitsService } from '../../../../services/market-visits.service';

@Component({
  selector: 'app-modal-edit-dialog',
  templateUrl: './modal-edit-dialog.component.html',
  styleUrl: './modal-edit-dialog.component.css'
})
export class ModalEditDialogComponent {
  @Input() mvisit?: MarketVisits;
  @Output() marketVisitsUpdated = new EventEmitter<MarketVisits[]>();


  constructor(private marketVisitsService: MarketVisitsService,
    public dialogRef: MatDialogRef<ModalEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // save(): void {
  //   // Handle save logic here
  //   this.marketVisitsService.updateMarketVisits(this.data).subscribe(() => this.fetchMarketVisits());
  //   this.dialogRef.close(this.data);
  // }

  //for editing and updating
  private fetchMarketVisits() {
    this.marketVisitsService.getMarketVisits().subscribe((visits: MarketVisits[]) => {
      this.marketVisitsUpdated.emit(visits);
    });
  }
}
