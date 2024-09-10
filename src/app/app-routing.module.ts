import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; // Adjust path as needed
import { RoleGuard } from './auth/role.guard'; // Adjust path as needed
import { NoAuthGuard } from './auth/no-authguard.service';
import { LoginComponent } from './components/authentication/login/login.component'; // Adjust path as needed
import { SidebarComponentComponent } from './components/sidebar-component/sidebar-component.component'; // Adjust path as needed
import { AddVisitsComponent } from './components/get-market-visits/views/add-visits/add-visits.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


const routes: Routes = [
  { path: 'dashboard', component: SidebarComponentComponent, canActivate: [AuthGuard] },
  { path: 'visit/edit', component: AddVisitsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: '404', component: NotfoundComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }