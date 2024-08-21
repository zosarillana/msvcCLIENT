import { Component, ViewChild } from '@angular/core';
import { MarketVisits } from '../../../models/market-visits';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MarketVisitsService } from '../../../services/market-visits.service';
import { ModalCreateDialogComponent } from '../../get-market-visits/modal/modal-create-dialog/modal-create-dialog.component';
import { ModalDeleteDialogComponent } from '../../get-market-visits/modal/modal-delete-dialog/modal-delete-dialog.component';
import { ModalEditDialogComponent } from '../../get-market-visits/modal/modal-edit-dialog/modal-edit-dialog.component';
import { ModalCreateUserDialogComponent } from './modal/modal-create-user-dialog/modal-create-user-dialog.component';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ModalEditUserDialogComponent } from './modal/modal-edit-user-dialog/modal-edit-user-dialog.component';
import { ModalDeleteUserDialogComponent } from './modal/modal-delete-user-dialog/modal-delete-user-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';
import { ModalViewUserDialogComponent } from './modal/modal-view-user-dialog/modal-view-user-dialog.component';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css',
})
export class UserAddComponent {
  displayedColumns: string[] = [
    'id',
    'fullname',
    'username',
    'email_add',
    'contact_num',
    'date_created',  
    'action',
  ];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userToEdit?: User;
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((result: User[]) => {
      this.dataSource.data = result;
      this.dataSource.paginator = this.paginator;
    });
  }
  
  applyFilter(event: Event, filterType: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    if (filterType === 'username') {
      this.dataSource.filterPredicate = (data: User) => {
        return data.username.toLowerCase().includes(value.trim().toLowerCase());
      };
      this.dataSource.filter = value.trim().toLowerCase(); // Apply the filter
    }
  }

  applyDateFilter(type: string, event: MatDatepickerInputEvent<Date>): void {
    const date = event.value;
  
    if (type === 'start') {
      this.startDate = date;
    } else {
      this.endDate = date;
    }
  
    this.dataSource.filterPredicate = (data: User) => {
      const createdDate = moment(data.date_created);
      const withinStart = this.startDate ? createdDate.isSameOrAfter(this.startDate) : true;
      const withinEnd = this.endDate ? createdDate.isSameOrBefore(this.endDate) : true;
      return withinStart && withinEnd;
    };
    this.dataSource.filter = '' + Math.random(); // Trigger filtering
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(ModalEditUserDialogComponent, {
      width: '500px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateUserDialogComponent, {
      width: '500px',
      height: '55%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  openDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(ModalDeleteUserDialogComponent, {
      width: '500px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  openViewDialog(user: User): void {
    const dialogRef = this.dialog.open(ModalViewUserDialogComponent, {
      width: '500px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }
}