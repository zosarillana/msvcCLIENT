import { Component, ViewChild } from '@angular/core';
import { Isr } from '../../../../../models/isr';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { Area } from '../../../../../models/area';
import { AreaService } from '../../../../../services/area.service';
import { ModalCreateAreaComponent } from '../area-add/modal/modal-create-area/modal-create-area.component';
import { ModalDeleteAreaComponent } from '../area-add/modal/modal-delete-area/modal-delete-area.component';
import { ModalEditAreaComponent } from '../area-add/modal/modal-edit-area/modal-edit-area.component';
import { ModalViewAreaComponent } from '../area-add/modal/modal-view-area/modal-view-area.component';
import { IsrService } from '../../../../../services/isr.service';
import { ModalCreateIsrComponent } from './modal/modal-create-isr/modal-create-isr.component';

@Component({
  selector: 'app-isr-add',
  templateUrl: './isr-add.component.html',
  styleUrl: './isr-add.component.css'
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

  constructor(private isrService: IsrService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAreas();
    this.startPolling();
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

  loadAreas(): void {
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
        (error) => console.error('Error fetching area count:', error)
      );

    setInterval(() => this.fetchUserCount(), 3000);
  }

  private fetchUserCount(): void {
    this.isrService.getIsrCount().subscribe(
      (count: number) => {
        this.isrCount = count;
      },
      (error) => {
        console.error('Error fetching area count:', error);
      }
    );
  }

  openEditDialog(area: Area): void {
    const dialogRef = this.dialog.open(ModalEditAreaComponent, {
      width: '500px',
      data: area,
    });

    dialogRef.afterClosed().subscribe(() => this.loadAreas());
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateIsrComponent, {
      width: '900px',
      height: 'auto',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAreas();
      }
    });
  }

  openDeleteDialog(area: Area): void {
    const dialogRef = this.dialog.open(ModalDeleteAreaComponent, {
      width: '500px',
      data: area,
    });

    dialogRef.afterClosed().subscribe(() => this.loadAreas());
  }

  openViewDialog(area: Area): void {
    const dialogRef = this.dialog.open(ModalViewAreaComponent, {
      width: '500px',
      data: area,
    });

    dialogRef.afterClosed().subscribe(() => this.loadAreas());
  }
}
