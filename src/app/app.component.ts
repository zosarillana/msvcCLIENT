import { Component, OnInit } from '@angular/core';
import { MarketVisits } from './models/market-visits';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'msvcREST';
  mvisits: MarketVisits[] = [];
 
    ngOnInit(): void {
      
    }
  
}
