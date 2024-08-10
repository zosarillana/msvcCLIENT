import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataSource } from '@angular/cdk/collections';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateMarketVisitsComponent } from './components/update-market-visits/update-market-visits.component';
import { GetMarketVisitsComponent } from './components/get-market-visits/get-market-visits.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,    
    UpdateMarketVisitsComponent, GetMarketVisitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
