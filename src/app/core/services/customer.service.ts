import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Customer } from '../models/customer.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getCustomers(
    page: number = 1,
    pageSize: number = 10,
    q: string = '',
    sortBy: string = '',
    sortDir: 'asc' | 'desc' = 'asc',
  ): Observable<PaginatedResponse<Customer>> {
    return this.http.get<PaginatedResponse<Customer>>(
      `${this.apiUrl}/customers`,
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
