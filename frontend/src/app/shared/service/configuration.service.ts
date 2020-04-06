import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigurationParameters } from './configuration-parameters.enum';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  southernHemisphere = new BehaviorSubject<boolean>(false);

  constructor() {
    this.southernHemisphere.next(
      localStorage.getItem(ConfigurationParameters.HEMISPHERE) === 'true'
    );

    this.southernHemisphere.subscribe((southernHemisphere) =>
      localStorage.setItem(
        ConfigurationParameters.HEMISPHERE,
        String(southernHemisphere)
      )
    );
  }
}
