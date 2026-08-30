import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../../../core/services/medicine.service';
import { Medicine } from '../../../core/models/medicine.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-medicine-details',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './medicine-details.component.html',
  styleUrl: './medicine-details.component.css',
})
export class MedicineDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly medicineService = inject(MedicineService);

  medicine?: Medicine;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadMedicine(id);
    }
  }

  loadMedicine(id: string): void {
    this.medicineService.getMedicineById(id).subscribe({
      next: (response) => {
        this.medicine = response;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/medicines']);
  }
}
