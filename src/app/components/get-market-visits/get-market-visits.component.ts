import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MarketVisits } from '../../models/market-visits';
import { MarketVisitsService } from '../../services/market-visits.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditDialogComponent } from './modal-edit-dialog/modal-edit-dialog.component';
import { ModalCreateDialogComponent } from './modal-create-dialog/modal-create-dialog.component';
import { ModalDeleteDialogComponent } from './modal-delete-dialog/modal-delete-dialog.component';
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

  constructor(
    private marketVisitsService: MarketVisitsService,
    public dialog: MatDialog
  ) {}
  // Inject MatDialog

  ngOnInit(): void {
    this.marketVisitsService
      .getMarketVisits()
      .subscribe((result: MarketVisits[]) => {
        this.dataSource.data = result;
      });
  }

  loadMarketVisits(): void {
    this.marketVisitsService
      .getMarketVisits()
      .subscribe((result: MarketVisits[]) => {
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

  openEditDialog(mvisit: MarketVisits): void {
    const dialogRef = this.dialog.open(ModalEditDialogComponent, {
      width: '500px',
      data: mvisit, // Pass the data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Handle any result here
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMarketVisits(); // Reload data after dialog is closed
      }
    });
  }

  
  openDeleteDialog(mvisit: MarketVisits): void {
    const dialogRef = this.dialog.open(ModalDeleteDialogComponent, {
      width: '500px',
      data: mvisit, // Pass the data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.loadMarketVisits(); // Reload data after dialog is closed
      }
    });
  }
}
