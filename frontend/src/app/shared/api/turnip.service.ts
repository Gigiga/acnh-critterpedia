import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TurnipCalculationRequest } from '../model/turnipCalculationRequest';
import { TurnipPatternMap } from '../model/turnipPatternMap';

@Injectable({
  providedIn: 'root'
})
export class TurnipService {
  private basePath = `${environment.basePath}/turnipPattern/`;

  constructor(private httpClient: HttpClient) { }

  getPatterns(calculationRequest: TurnipCalculationRequest): Observable<TurnipPatternMap> {
    return this.httpClient.post<TurnipPatternMap>(this.basePath, calculationRequest);    
  }
}
