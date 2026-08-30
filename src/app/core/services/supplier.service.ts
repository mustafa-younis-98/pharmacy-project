import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Supplier } from '../models/supplier.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getSuppliers(
    page: number = 1,
    pageSize: number = 100,
    q: string = '',
  ): Observable<PaginatedResponse<Supplier>> {
    return this.http.get<PaginatedResponse<Supplier>>(
      `${this.apiUrl}/suppliers`,
      {
        params: {
          page,
          pageSize,
          q,
        },
      },
    );
  }
}
