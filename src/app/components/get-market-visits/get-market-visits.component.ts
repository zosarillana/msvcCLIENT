import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MarketVisits } from '../../models/market-visits';
import { MarketVisitsService } from '../../services/market-visits.service';

@Component({
  selector: 'app-get-market-visits',
  templateUrl: './get-market-visits.component.html',
  styleUrls: ['./get-market-visits.component.css'],
})
export class GetMarketVisitsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'area', 'visitor', 'visitdate', 'action'];
  dataSource = new MatTableDataSource<MarketVisits>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  mvisitsToEdit?: MarketVisits;

  constructor(private marketVisitsService: MarketVisitsService) {}

  ngOnInit(): void {
    this.marketVisitsService.getMarketVisits().subscribe((result: MarketVisits[]) => {
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  updateVisitList(mvisits: MarketVisits[]) {
    this.dataSource.data = mvisits;
  }

  initNewMvisits() {
    this.mvisitsToEdit = new MarketVisits();
  }

  editMvisits(visit: MarketVisits): void {
    this.mvisitsToEdit = visit;
  }
}
