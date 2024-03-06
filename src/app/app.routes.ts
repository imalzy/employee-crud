import { Routes } from '@angular/router';
import { authenticationGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'employee',
    canActivate: [authenticationGuard()],
    loadComponent: () =>
      import('./modules/employee/employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
  },
  {
    path: 'create-employee',
    canActivate: [authenticationGuard()],
    loadComponent: () =>
      import('./modules/employee/employee-form/employee-form.component').then(
        (m) => m.EmployeeFormComponent
      ),
  },
];
