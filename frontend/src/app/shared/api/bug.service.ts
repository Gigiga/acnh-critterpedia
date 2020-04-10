import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Bug } from '../model/bug';

@Injectable({
  providedIn: 'root',
})
export class BugService {
  private basePath = `${environment.basePath}/bug/`;

  constructor(private httpClient: HttpClient) {}

  getAllBugs(): Observable<Bug[]> {
    return this.httpClient.get<Bug[]>(`${this.basePath}`);
  }

  getBug(name: string): Observable<Bug> {
    return this.httpClient.get(`${this.basePath}${name}`);
  }

  getImage(name: string): Observable<string> {
    return this.httpClient.get(`${this.basePath}${name}/image`, {
      responseType: 'text',
    });
  }
}
