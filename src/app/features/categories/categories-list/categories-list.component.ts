import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-categories-list',
  imports: [FormsModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  categories: Category[] = [];

  page = 1;
  pageSize = 10;
  total = 0;
  totalPages = 0;

  isLoading = false;
  errorMessage = '';

  searchTerm = '';

  sortOption = '';
  sortBy = '';
  sortDir: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.categoryService
      .getCategories(
        this.page,
        this.pageSize,
        this.searchTerm,
        this.sortBy,
        this.sortDir,
      )
      .subscribe({
        next: (response) => {
          this.categories = response.items;
          this.page = response.page;
          this.pageSize = response.pageSize;
          this.total = response.total;
          this.totalPages = response.totalPages;

          this.isLoading = false;
        },

        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Failed to load categories. Please try again.';

          this.isLoading = false;
        },
      });
  }

  onSearch(): void {
    this.page = 1;
    this.loadCategories();
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

      default:
        this.sortBy = '';
        this.sortDir = 'asc';
    }

    this.loadCategories();
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadCategories();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadCategories();
    }
  }
}
