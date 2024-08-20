import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; // Make sure this path is correct
import { LoginComponent } from './components/authentication/login/login.component'; // Adjust path as needed
import { SidebarComponentComponent } from './components/sidebar-component/sidebar-component.component'; // Adjust path as needed

const routes: Routes = [
  { path: 'dashboard', component: SidebarComponentComponent, canActivate: [AuthGuard] },
  // { path: 'add-users', component: AddUsersComponent },
  { path: 'login', component: LoginComponent },
  // other routes here
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
