import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { UpdateMarketVisitsComponent } from './components/update-market-visits/update-market-visits.component';
import { GetMarketVisitsComponent } from './components/get-market-visits/get-market-visits.component';
import { SidebarComponentComponent } from './components/sidebar-component/sidebar-component.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalCreateDialogComponent } from './components/get-market-visits/modal/modal-create-dialog/modal-create-dialog.component';
import { ModalEditDialogComponent } from './components/get-market-visits/modal/modal-edit-dialog/modal-edit-dialog.component';
import { ModalDeleteDialogComponent } from './components/get-market-visits/modal/modal-delete-dialog/modal-delete-dialog.component';
import { UserAddComponent } from './components/admin/user-add/user-add.component';
import { IsrAddComponent } from './components/admin/isr-add/isr-add.component';
import { PodAddComponent } from './components/admin/pod-add/pod-add.component';
import { ModalCreateUserDialogComponent } from './components/admin/user-add/modal/modal-create-user-dialog/modal-create-user-dialog.component';
import { ModalEditUserDialogComponent } from './components/admin/user-add/modal/modal-edit-user-dialog/modal-edit-user-dialog.component';
import { ModalDeleteUserDialogComponent } from './components/admin/user-add/modal/modal-delete-user-dialog/modal-delete-user-dialog.component';
import { LoginComponent } from './components/authentication/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateMarketVisitsComponent,
    GetMarketVisitsComponent,
    SidebarComponentComponent,
    ModalComponent,
    ModalEditDialogComponent,
    ModalCreateDialogComponent,
    ModalDeleteDialogComponent,
    UserAddComponent,
    IsrAddComponent,
    PodAddComponent,
    ModalCreateUserDialogComponent,
    ModalEditUserDialogComponent,
    ModalDeleteUserDialogComponent,
    LoginComponent,    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],

  providers: [], // Remove provideAnimationsAsync() if not needed
  bootstrap: [AppComponent]
})
export class AppModule {}
