import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fossil } from '../model/fossil';

@Injectable({
  providedIn: 'root'
})
export class FossilService {
  private basePath = `${environment.basePath}/fossil/`;

  constructor(private httpClient: HttpClient) { }

  getAllFossils(): Observable<Fossil[]> {
    return this.httpClient.get<Fossil[]>(`${this.basePath}`);
  }

  getFossil(name: string): Observable<Fossil> {
    return this.httpClient.get(`${this.basePath}${name}`);
  }
}
