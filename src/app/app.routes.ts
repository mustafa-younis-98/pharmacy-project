import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },

  {
    path: 'medicines',
    loadComponent: () =>
      import('./features/medicines/medicines-list/medicines-list.component').then(
        (m) => m.MedicinesListComponent,
      ),
  },

  {
    path: 'medicines/add',
    loadComponent: () =>
      import('./features/medicines/medicine-add/medicine-add.component').then(
        (m) => m.MedicineAddComponent,
      ),
  },

  {
    path: 'medicines/:id/edit',
    loadComponent: () =>
      import('./features/medicines/medicine-edit/medicine-edit.component').then(
        (m) => m.MedicineEditComponent,
      ),
  },

  {
    path: 'medicines/:id',
    loadComponent: () =>
      import('./features/medicines/medicine-details/medicine-details.component').then(
        (m) => m.MedicineDetailsComponent,
      ),
  },
];
