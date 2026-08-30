import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medicine } from '../models/medicine.model';
import { PaginatedResponse } from '../models/paginated-response.model';
import { UpdateMedicine } from '../models/update-medicine.model';
import { CreateMedicine } from '../models/create-medicine.model';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getMedicines(
    page: number = 1,
    pageSize: number = 10,
    q: string = '',
    sortBy: string = '',
    sortDir: 'asc' | 'desc' = 'asc',
  ): Observable<PaginatedResponse<Medicine>> {
    return this.http.get<PaginatedResponse<Medicine>>(
      `${this.apiUrl}/medicines`,
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

  getMedicineById(id: string): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.apiUrl}/medicines/${id}`);
  }

  updateMedicine(id: string, medicine: UpdateMedicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.apiUrl}/medicines/${id}`, medicine);
  }

  deleteMedicine(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medicines/${id}`);
  }

  createMedicine(medicine: CreateMedicine): Observable<Medicine> {
    return this.http.post<Medicine>(`${this.apiUrl}/medicines`, medicine);
  }
}
