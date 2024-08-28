import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Area } from '../../../../../models/area';
import { AreaService } from '../../../../../services/area.service';
import { ModalDeleteUserDialogComponent } from '../../user/user-add/modal/modal-delete-user-dialog/modal-delete-user-dialog.component';
import { ModalEditUserDialogComponent } from '../../user/user-add/modal/modal-edit-user-dialog/modal-edit-user-dialog.component';
import { ModalViewUserDialogComponent } from '../../user/user-add/modal/modal-view-user-dialog/modal-view-user-dialog.component';
import { ModalCreateAreaComponent } from './modal/modal-create-area/modal-create-area.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';
import { ModalViewAreaComponent } from './modal/modal-view-area/modal-view-area.component';
import { ModalDeleteAreaComponent } from './modal/modal-delete-area/modal-delete-area.component';
import { ModalEditAreaComponent } from './modal/modal-edit-area/modal-edit-area.component';

@Component({
  selector: 'app-area-add',
  templateUrl: './area-add.component.html',
  styleUrls: ['./area-add.component.css'], // Corrected to 'styleUrls'
})
export class AreaAddComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'area',
    'description',
    'date_created',
    'action',
  ];
  dataSource = new MatTableDataSource<Area>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  areaCount: number = 0;
  startDate: Date | null = null;
  endDate: Date | null = null;
  
  private pollingSubscription!: Subscription;

  constructor(private areaService: AreaService, public dialog: MatDialog) {}

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
  
    this.dataSource.filterPredicate = (data: Area) => {
      const createdDate = moment(data.date_created);
      const withinStart = this.startDate ? createdDate.isSameOrAfter(this.startDate) : true;
      const withinEnd = this.endDate ? createdDate.isSameOrBefore(this.endDate) : true;
      return withinStart && withinEnd;
    };
    this.dataSource.filter = '' + Math.random(); // Trigger filtering
  }

  loadAreas(): void {
    this.areaService.getAreas().subscribe((result: Area[]) => {
      this.dataSource.data = result;
      this.dataSource.paginator = this.paginator; // Set paginator after data is loaded
      this.fetchUserCount();
    });
  }

  private startPolling(): void {
    this.pollingSubscription = this.areaService.getAreaCount()
      .subscribe(
        (count: number) => this.areaCount = count,
        (error) => console.error('Error fetching area count:', error)
      );

    setInterval(() => this.fetchUserCount(), 3000);
  }

  private fetchUserCount(): void {
    this.areaService.getAreaCount().subscribe(
      (count: number) => {
        this.areaCount = count;
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
    const dialogRef = this.dialog.open(ModalCreateAreaComponent, {
      width: '500px',
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
