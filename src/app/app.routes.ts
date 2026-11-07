import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/services/auth.service';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];
