import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MedicineService } from '../../../core/services/medicine.service';
import { CategoryService } from '../../../core/services/category.service';

import { CreateMedicine } from '../../../core/models/create-medicine.model';
import { Category } from '../../../core/models/category.model';

import { SupplierService } from '../../../core/services/supplier.service';
import { Supplier } from '../../../core/models/supplier.model';

@Component({
  selector: 'app-medicine-add',
  imports: [ReactiveFormsModule],
  templateUrl: './medicine-add.component.html',
  styleUrl: './medicine-add.component.css',
})
export class MedicineAddComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly medicineService = inject(MedicineService);
  private readonly categoryService = inject(CategoryService);
  private readonly supplierService = inject(SupplierService);

  isLoading = false;
  isCategoriesLoading = false;
  isSuppliersLoading = false;

  errorMessage = '';
  categories: Category[] = [];
  suppliers: Supplier[] = [];

  addForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    genericName: ['', Validators.required],
    barcode: [''],

    categoryId: ['', Validators.required],
    supplierId: ['', Validators.required],

    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    costPrice: [0, [Validators.required, Validators.min(0)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    reorderLevel: [0, [Validators.required, Validators.min(0)]],
    expiryDate: ['', Validators.required],
    batchNumber: [''],
    requiresPrescription: [false],
    isActive: [true],
  });

  ngOnInit(): void {
    this.loadCategories();
    this.loadSuppliers();
  }

  loadCategories(): void {
    this.isCategoriesLoading = true;

    this.categoryService.getCategories(1, 100).subscribe({
      next: (response) => {
        this.categories = response.items;
        this.isCategoriesLoading = false;
      },

      error: (error) => {
        console.error('Failed to load categories:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to load categories. Please try again.';

        this.isCategoriesLoading = false;
      },
    });
  }

  loadSuppliers(): void {
    this.isSuppliersLoading = true;

    this.supplierService.getSuppliers(1, 100).subscribe({
      next: (response) => {
        this.suppliers = response.items;
        this.isSuppliersLoading = false;
      },

      error: (error) => {
        console.error('Failed to load suppliers:', error);

        this.errorMessage =
          error.error?.message || 'Failed to load suppliers. Please try again.';

        this.isSuppliersLoading = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/medicines']);
  }

  onSubmit(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const newMedicine: CreateMedicine = this.addForm.getRawValue();

    this.medicineService.createMedicine(newMedicine).subscribe({
      next: () => {
        this.router.navigate(['/medicines']);
      },

      error: (error) => {
        console.error('Failed to create medicine:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to create medicine. Please try again.';

        this.isLoading = false;
      },
    });
  }
}
