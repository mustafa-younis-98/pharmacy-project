import { Component, inject, OnInit } from '@angular/core';

import { DashboardService } from '../../../core/services/dashboard.service';
import { DashboardStats } from '../../../core/models/dashboard-stats.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  dashboardStats?: DashboardStats;

  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardService.getDashboardStats().subscribe({
      next: (response) => {
        this.dashboardStats = response;
        this.isLoading = false;
      },

      error: (error) => {
        console.error('Failed to load dashboard stats:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to load dashboard data. Please try again.';

        this.isLoading = false;
      },
    });
  }
}
