import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { MedicineService } from '../../../core/services/medicine.service';
import { Medicine } from '../../../core/models/medicine.model';
import { UpdateMedicine } from '../../../core/models/update-medicine.model';

@Component({
  selector: 'app-medicine-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './medicine-edit.component.html',
  styleUrl: './medicine-edit.component.css',
})
export class MedicineEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly medicineService = inject(MedicineService);
  private readonly fb = inject(FormBuilder);

  medicineId: string | null = null;
  isLoading = false;
  errorMessage = '';

  medicine?: Medicine;

  editForm = this.fb.nonNullable.group({
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
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/medicines']);
      return;
    }

    this.medicineId = id;
    this.loadMedicine(id);
  }

  loadMedicine(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.medicineService
      .getMedicineById(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (response) => {
          this.medicine = response;

          this.editForm.patchValue({
            name: response.name,
            genericName: response.genericName,
            barcode: response.barcode,

            categoryId: response.categoryId,
            supplierId: response.supplierId,

            description: response.description,
            price: response.price,
            costPrice: response.costPrice,
            stockQuantity: response.stockQuantity,
            reorderLevel: response.reorderLevel,

            expiryDate: response.expiryDate,

            batchNumber: response.batchNumber,
            requiresPrescription: response.requiresPrescription,
            isActive: response.isActive,
          });
        },

        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to load medicine';
        },
      });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    if (!this.medicineId) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const updatedMedicine: UpdateMedicine = this.editForm.getRawValue();

    this.medicineService
      .updateMedicine(this.medicineId, updatedMedicine)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/medicines']);
        },

        error: (error) => {
          this.errorMessage =
            error.error?.message || 'Failed to update medicine';
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/medicines']);
  }
}
