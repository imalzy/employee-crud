import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full',
  },
  {
    path: 'employee',
    loadComponent: () =>
      import('./modules/employee/employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
  },
  {
    path: 'create-employee',
    loadComponent: () =>
      import('./modules/employee/employee-form/employee-form.component').then(
        (m) => m.EmployeeFormComponent
      ),
  },
];
