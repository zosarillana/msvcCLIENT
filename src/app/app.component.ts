import { Component, OnInit } from '@angular/core';
import { MarketVisits } from './models/market-visits';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'msvcREST';
  mvisits: MarketVisits[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     console.log('Navigation started to:', event.url);
    //   }
    //   if (event instanceof NavigationEnd) {
    //     console.log('Navigation ended to:', event.url);
    //   }
    // });
  }

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
