import { Component, inject, OnInit } from '@angular/core';

import { SupplierService } from '../../../core/services/supplier.service';
import { Supplier } from '../../../core/models/supplier.model';

@Component({
  selector: 'app-suppliers-list',
  imports: [],
  templateUrl: './suppliers-list.component.html',
  styleUrl: './suppliers-list.component.css',
})
export class SuppliersListComponent implements OnInit {
  private readonly supplierService = inject(SupplierService);

  suppliers: Supplier[] = [];

  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.supplierService.getSuppliers().subscribe({
      next: (response) => {
        this.suppliers = response.items;

        this.isLoading = false;
      },

      error: (error) => {
        console.error('Failed to load suppliers:', error);

        this.errorMessage =
          error.error?.message || 'Failed to load suppliers. Please try again.';

        this.isLoading = false;
      },
    });
  }
}
