import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fish } from '../model/fish';

@Injectable({
  providedIn: 'root'
})
export class FishMockService {
  constructor(private httpClient: HttpClient) { }

  getAllFish(): Observable<Fish[]> {
    return this.httpClient.get<Fish[]>(`/assets/mocks/allFish.json`);
  }

  getFish(name: string): Observable<Fish> {
    return this.httpClient.get(`/assets/mocks/fish.json`);
  }
}
