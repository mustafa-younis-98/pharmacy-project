import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})
export class CustomersListComponent implements OnInit {
  private readonly customerService = inject(CustomerService);

  customers: Customer[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.customerService.getCustomers().subscribe({
      next: (response) => {
        this.customers = response.items;
        this.isLoading = false;
      },

      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to load customers.';
        this.isLoading = false;
      },
    });
  }
}
