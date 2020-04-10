import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Fish } from '../model/fish';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  private basePath = `${environment.basePath}/fish/`;

  constructor(private httpClient: HttpClient) { }

  getAllFish(): Observable<Fish[]> {
    return this.httpClient.get<Fish[]>(`${this.basePath}`);
  }

  getFish(name: string): Observable<Fish> {
    return this.httpClient.get(`${this.basePath}${name}`);
  }

  getImage(name: string): Observable<string> {
    return this.httpClient.get(`${this.basePath}${name}/image`, {
      responseType: 'text',
    });
  }
}
