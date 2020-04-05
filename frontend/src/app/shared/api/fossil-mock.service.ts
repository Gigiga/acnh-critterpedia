import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fossil } from '../model/fossil';

@Injectable({
  providedIn: 'root'
})
export class FossilMockService {
  constructor(private httpClient: HttpClient) { }

  getAllFossils(): Observable<Fossil[]> {
    return this.httpClient.get<Fossil[]>(`/assets/mocks/allFossils.json`);
  }

  getFossil(name: string): Observable<Fossil> {
    return this.httpClient.get(`/assets/mocks/fossil.json`);
  }
}
