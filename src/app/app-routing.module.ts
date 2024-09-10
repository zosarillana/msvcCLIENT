import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; // Make sure this path is correct
import { LoginComponent } from './components/authentication/login/login.component'; // Adjust path as needed
import { SidebarComponentComponent } from './components/sidebar-component/sidebar-component.component'; // Adjust path as needed
import { NoAuthGuard } from './auth/no-authguard.service';
import { AddVisitsComponent } from './components/get-market-visits/views/add-visits/add-visits.component';

const routes: Routes = [
  { path: 'dashboard', component: SidebarComponentComponent, canActivate: [AuthGuard] },
  { path: 'visit/edit', component: AddVisitsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] }, // Apply NoAuthGuard here
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/dashboard' } // Wildcard route for 404, adjust if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
