import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { MarketVisits } from '../../models/market-visits';
import { MarketVisitsService } from '../../services/market-visits.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditDialogComponent } from './modal/modal-edit-dialog/modal-edit-dialog.component';
import { ModalCreateDialogComponent } from './modal/modal-create-dialog/modal-create-dialog.component';
import { ModalDeleteDialogComponent } from './modal/modal-delete-dialog/modal-delete-dialog.component';
import { SharedService } from '../../services/shared.service';
import { initFlowbite } from 'flowbite';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-get-market-visits',
  templateUrl: './get-market-visits.component.html',
  styleUrls: ['./get-market-visits.component.css'],
})
export class GetMarketVisitsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'visit_area',
    'visit_date',
    'visit_accountName',
    'visit_distributor',
    'visit_salesPersonnel',
    'visit_accountType',
    'action'
  ];
  dataSource = new MatTableDataSource<MarketVisits>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  mvisitsToEdit?: MarketVisits;

  constructor(
    private marketVisitsService: MarketVisitsService,
    public dialog: MatDialog,
    private sharedService: SharedService // Inject SharedService
  ) {}

  ngOnInit(): void {
    this.marketVisitsService
      .getMarketVisits()
      .subscribe((result: MarketVisits[]) => {
        this.dataSource.data = result;
      });
    initFlowbite();
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
      data: mvisit,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateDialogComponent, {
      panelClass: 'custom-dialog',
      width: '2000px',
      height: '1000px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMarketVisits();
      }
    });
  }

  openDeleteDialog(mvisit: MarketVisits): void {
    const dialogRef = this.dialog.open(ModalDeleteDialogComponent, {
      width: '500px',
      data: mvisit,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.loadMarketVisits();
      }
    });
  }

  exportToExcel(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Market Visits');

    // Add column headers
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Visit Area', key: 'visit_area', width: 20 },
      { header: 'Visit Date', key: 'visit_date', width: 20 },
      { header: 'Account Name', key: 'visit_accountName', width: 30 },
      { header: 'Distributor', key: 'visit_distributor', width: 20 },
      { header: 'Sales Personnel', key: 'visit_salesPersonnel', width: 20 },
      { header: 'Account Type', key: 'visit_accountType', width: 20 },
      { header: 'ISR', key: 'visit_isr', width: 15 },
      { header: 'ISR Need', key: 'visit_isrNeed', width: 15 },
      { header: 'Payola Merchandiser', key: 'visit_payolaMerchandiser', width: 25 },
      { header: 'Average Off Take PD', key: 'visit_averageOffTakePd', width: 25 },
      { header: 'POD', key: 'visit_pod', width: 15 },
      { header: 'Competitors Check', key: 'visit_competitorsCheck', width: 25 },
      { header: 'PAP', key: 'visit_pap', width: 15 }
    ];

    // Add rows
    this.dataSource.data.forEach(item => {
      worksheet.addRow(item);
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'market-visits.xlsx');
    }).catch(error => {
      console.error('Error generating Excel file:', error);
    });
  }

  showContent(content: string, id?: string) {
    this.sharedService.setSelectedContent(content);
    if (id) {
      this.sharedService.setSelectedId(id);
    }
  }
}
