import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bug } from '../model/bug';

@Injectable({
  providedIn: 'root',
})
export class BugMockService {
  constructor(private httpClient: HttpClient) {}

  getAllBugs(): Observable<Bug[]> {
    return this.httpClient.get<Bug[]>(`/assets/mocks/allBugs.json`);
  }

  getBug(name: string): Observable<Bug> {
    return this.httpClient.get(`/assets/mocks/bug.json`);
  }
}
