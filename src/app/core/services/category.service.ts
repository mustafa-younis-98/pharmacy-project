import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Category } from '../models/category.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getCategories(
    page: number = 1,
    pageSize: number = 10,
    q: string = '',
    sortBy: string = '',
    sortDir: 'asc' | 'desc' = 'asc',
  ): Observable<PaginatedResponse<Category>> {
    return this.http.get<PaginatedResponse<Category>>(
      `${this.apiUrl}/categories`,
      {
        params: {
          page,
          pageSize,
          q,
          sortBy,
          sortDir,
        },
      },
    );
  }
}
