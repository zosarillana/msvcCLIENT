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
    'date_updated',
    'action',
  ];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userToEdit?: User;

  constructor(private userService: UserService, public dialog: MatDialog) {}
  // Inject MatDialog

  ngOnInit(): void {
    this.userService.getUsers().subscribe((result: User[]) => {
      this.dataSource.data = result;
    });
  }

  loadMarketVisits(): void {
    this.userService.getUsers().subscribe((result: User[]) => {
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  updateVisitList(user: User[]) {
    this.dataSource.data = user;
  }

  initNewMvisits() {
    this.userToEdit = new User();
  }

  editMvisits(user: User): void {
    this.userToEdit = user;
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(ModalEditUserDialogComponent, {
      width: '500px',
      data: user, // Pass the data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Handle any result here
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
        this.loadMarketVisits(); // Reload data after dialog is closed
      }
    });
  }

  openDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(ModalDeleteDialogComponent, {
      width: '500px',
      data: user, // Pass the data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.loadMarketVisits(); // Reload data after dialog is closed
      }
    });
  }
}
