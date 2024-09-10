import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketVisits } from '../../models/market-visits';
import { MarketVisitsService } from '../../services/market-visits.service';

@Component({
  selector: 'app-update-market-visits',
  templateUrl: './update-market-visits.component.html',
  styleUrls: ['./update-market-visits.component.css'],
})
export class UpdateMarketVisitsComponent {
  @Input() mvisit?: MarketVisits;
  @Output() marketVisitsUpdated = new EventEmitter<MarketVisits[]>();

  constructor(private marketVisitsService: MarketVisitsService) {}

  ngOnInit(): void {}

  // private fetchMarketVisits() {
  //   this.marketVisitsService.getMarketVisits().subscribe((visits: MarketVisits[]) => {
  //     this.marketVisitsUpdated.emit(visits);
  //   });
  // }

  // updateVisit(mvisit: MarketVisits) {
  //   this.marketVisitsService.updateMarketVisits(mvisit).subscribe(() => this.fetchMarketVisits());
  // }

  // deleteVisit(mvisit: MarketVisits) {
  //   this.marketVisitsService.deleteMarketVisits(mvisit).subscribe(() => this.fetchMarketVisits());
  // }

  // createVisit(mvisit: MarketVisits) {
  //   this.marketVisitsService.createMarketVisits(mvisit).subscribe(() => this.fetchMarketVisits());
  // }
}
