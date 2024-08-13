import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataSource } from '@angular/cdk/collections';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateMarketVisitsComponent } from './components/update-market-visits/update-market-visits.component';
import { GetMarketVisitsComponent } from './components/get-market-visits/get-market-visits.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponentComponent } from './components/sidebar-component/sidebar-component.component';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalEditDialogComponent } from './components/get-market-visits/modal-edit-dialog/modal-edit-dialog/modal-edit-dialog.component';
import { ModalCreateDialogComponent } from './components/get-market-visits/modal-edit-dialog/modal-create-dialog/modal-create-dialog.component';
import { ModalDeleteDialogComponent } from './components/get-market-visits/modal-edit-dialog/modal-delete-dialog/modal-delete-dialog.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
