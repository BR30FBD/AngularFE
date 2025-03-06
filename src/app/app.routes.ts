import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';  // If you have an Auth Guard

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //  Redirect to login on load
  { path: 'login', component: LoginComponent }, //  Login page
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, //  Secure dashboard
  { path: 'see', component: DashboardComponent,canActivate: [AuthGuard]  } //  Redirect unknown paths to login
];

