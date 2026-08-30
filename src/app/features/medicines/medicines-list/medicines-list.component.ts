import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MedicineService } from '../../../core/services/medicine.service';
import { Medicine } from '../../../core/models/medicine.model';

@Component({
  selector: 'app-medicines-list',
  imports: [CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './medicines-list.component.html',
  styleUrl: './medicines-list.component.css',
})
export class MedicinesListComponent implements OnInit {
  private readonly medicineService = inject(MedicineService);
  private readonly router = inject(Router);

  medicines: Medicine[] = [];

  page = 1;
  pageSize = 8;
  total = 0;
  totalPages = 0;

  isLoading = false;
  errorMessage = '';

  searchTerm = '';

  sortOption = '';
  sortBy = '';
  sortDir: 'asc' | 'desc' = 'asc';

  medicineToDelete: Medicine | null = null;

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.medicineService
      .getMedicines(
        this.page,
        this.pageSize,
        this.searchTerm,
        this.sortBy,
        this.sortDir,
      )
      .subscribe({
        next: (response) => {
          this.medicines = response.items;
          this.page = response.page;
          this.pageSize = response.pageSize;
          this.total = response.total;
          this.totalPages = response.totalPages;

          this.isLoading = false;
        },

        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Failed to load medicines. Please try again.';

          this.isLoading = false;
        },
      });
  }

  onSearch(): void {
    this.page = 1;
    this.loadMedicines();
  }

  onSortChange(): void {
    this.page = 1;

    switch (this.sortOption) {
      case 'name-asc':
        this.sortBy = 'name';
        this.sortDir = 'asc';
        break;

      case 'name-desc':
        this.sortBy = 'name';
        this.sortDir = 'desc';
        break;

      case 'price-asc':
        this.sortBy = 'price';
        this.sortDir = 'asc';
        break;

      case 'price-desc':
        this.sortBy = 'price';
        this.sortDir = 'desc';
        break;

      default:
        this.sortBy = '';
        this.sortDir = 'asc';
    }

    this.loadMedicines();
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadMedicines();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadMedicines();
    }
  }

  viewMedicine(id: string): void {
    this.router.navigate(['/medicines', id]);
  }

  editMedicine(id: string): void {
    this.router.navigate(['/medicines', id, 'edit']);
  }

  deleteMedicine(medicine: Medicine): void {
    this.medicineToDelete = medicine;
  }

  confirmDelete(): void {
    if (!this.medicineToDelete) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.medicineService.deleteMedicine(this.medicineToDelete.id).subscribe({
      next: () => {
        this.medicineToDelete = null;
        this.loadMedicines();
      },

      error: (error) => {
        this.errorMessage =
          error.error?.message ||
          'Failed to delete medicine. Please try again.';

        this.isLoading = false;
      },
    });
  }

  cancelDelete(): void {
    this.medicineToDelete = null;
  }

  addMedicine(): void {
    this.router.navigate(['/medicines/add']);
  }
}
