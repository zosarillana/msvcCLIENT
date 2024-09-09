import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketVisits } from '../../../../models/market-visits';
import { MarketVisitsService } from '../../../../services/market-visits.service';

@Component({
  selector: 'app-view-visits',
  templateUrl: './view-visits.component.html',
  styleUrl: './view-visits.component.css'
})
export class ViewVisitsComponent {
  @Input() visitId: string | null = null;
  @Input() mvisit?: MarketVisits;
  @Output() marketVisitsUpdated = new EventEmitter<MarketVisits[]>();

  constructor(private marketVisitsService: MarketVisitsService) {}

  ngOnInit(): void {
    if (this.visitId) {
      // Fetch data based on visitId
      this.marketVisitsService.getVisitById(this.visitId).subscribe(
        (visit: MarketVisits) => {
          this.mvisit = visit;
        },
        (error) => {
          console.error('Error fetching visit details:', error);
        }
      );
    }
  }
  
  onSubmit(): void {
    // if (this.mvisit && this.visitId) {
    //   this.marketVisitsService.updateMarketVisits(this.visitId, this.mvisit).subscribe(
    //     (updatedVisit: MarketVisits) => {
       
    //       this.marketVisitsUpdated.emit([updatedVisit]);
    //     },
    //     (error) => {
    //       console.error('Error updating visit:', error);
    //     }
    //   );
    // }
  }
}
