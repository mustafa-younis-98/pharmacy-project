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
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),

    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
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
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories-list/categories-list.component').then(
            (m) => m.CategoriesListComponent,
          ),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/customers-list/customers-list.component').then(
            (m) => m.CustomersListComponent,
          ),
      },
      {
        path: 'suppliers',
        loadComponent: () =>
          import('./features/suppliers/suppliers-list/suppliers-list.component').then(
            (m) => m.SuppliersListComponent,
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
    ],
  },
];
