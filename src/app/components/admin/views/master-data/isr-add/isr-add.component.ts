import { Component, ViewChild } from '@angular/core';
import { Isr } from '../../../../../models/isr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IsrService } from '../../../../../services/isr.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateIsrComponent } from './modal/modal-create-isr/modal-create-isr.component';
import { environment } from '../../../../../../environments/environment';  // <-- Import the environment
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';
import { ModalEditIsrComponent } from './modal/modal-edit-isr/modal-edit-isr.component';
import { initFlowbite } from 'flowbite';
import { ModalViewIsrComponent } from './modal/modal-view-isr/modal-view-isr.component';
import { ModalDeleteIsrComponent } from './modal/modal-delete-isr/modal-delete-isr.component';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-isr-add',
  templateUrl: './isr-add.component.html',
  styleUrls: ['./isr-add.component.css']
})
export class IsrAddComponent {
  displayedColumns: string[] = [
    'isr_name',
    'others',
    'type',
    'image_path',
    'description',
    'date_created',
    'action',
  ];
  dataSource = new MatTableDataSource<Isr>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isrCount: number = 0;
  startDate: Date | null = null;
  endDate: Date | null = null;

  private pollingSubscription!: Subscription;

  // Construct the base API URL
  public imageUrlBase = `${environment. apiUrl}/Isr/image/`;  // <-- Use the environment API URL

  constructor(private isrService: IsrService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadIsrs();
    this.startPolling();
    initFlowbite();
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
  
  applyDateFilter(type: string, event: MatDatepickerInputEvent<Date>): void {
    const date = event.value;
  
    if (type === 'start') {
      this.startDate = date;
    } else {
      this.endDate = date;
    }
  
    this.dataSource.filterPredicate = (data: Isr) => {
      const createdDate = moment(data.date_created);
      const withinStart = this.startDate ? createdDate.isSameOrAfter(this.startDate) : true;
      const withinEnd = this.endDate ? createdDate.isSameOrBefore(this.endDate) : true;
      return withinStart && withinEnd;
    };
    this.dataSource.filter = '' + Math.random(); // Trigger filtering
  }
  

  loadIsrs(): void {
    this.isrService.getIsrs().subscribe((result: Isr[]) => {
      this.dataSource.data = result;
      this.dataSource.paginator = this.paginator; // Set paginator after data is loaded
      this.fetchUserCount();
    });
  }

  private startPolling(): void {
    this.pollingSubscription = this.isrService.getIsrCount()
      .subscribe(
        (count: number) => this.isrCount = count,
        (error) => console.error('Error fetching ISR count:', error)
      );

    setInterval(() => this.fetchUserCount(), 3000);
  }

  private fetchUserCount(): void {
    this.isrService.getIsrCount().subscribe(
      (count: number) => {
        this.isrCount = count;
      },
      (error) => {
        console.error('Error fetching ISR count:', error);
      }
    );
  }

  openViewDialog(isr: Isr): void {
    const dialogRef = this.dialog.open(ModalViewIsrComponent, {
      width: '500px',
      data: isr,
    });

    dialogRef.afterClosed().subscribe(() => this.loadIsrs());
  }

  openEditDialog(isr: Isr): void {
    const dialogRef = this.dialog.open(ModalEditIsrComponent, {
      width: '500px',
      data: isr,
    });

    dialogRef.afterClosed().subscribe(() => this.loadIsrs());
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateIsrComponent, {
      width: '900px',
      height: 'auto',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIsrs();
      }
    });
  }

  openDeleteDialog(isr: Isr): void {
    const dialogRef = this.dialog.open(ModalDeleteIsrComponent, {
      width: '500px',
      data: isr,
    });

    dialogRef.afterClosed().subscribe(() => this.loadIsrs());
  }

}
