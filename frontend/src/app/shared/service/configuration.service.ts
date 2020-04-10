import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigurationParameters } from './configuration-parameters.enum';
import { TurnipCalculationRequest } from '../model/turnipCalculationRequest';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  southernHemisphere = new BehaviorSubject<boolean>(false);
  collectedCollectibles = new BehaviorSubject<string[]>([]);
  donatedCollectibles = new BehaviorSubject<string[]>([]);
  turnipRequest = new BehaviorSubject<TurnipCalculationRequest>(null);

  constructor() {
    this.southernHemisphere.next(
      localStorage.getItem(ConfigurationParameters.SOUTHERN_HEMISPHERE) ===
        'true'
    );
    this.collectedCollectibles.next(
      JSON.parse(
        localStorage.getItem(ConfigurationParameters.COLLECTED_COLLECTIBLES)
      ) || []
    );
    this.donatedCollectibles.next(
      JSON.parse(
        localStorage.getItem(ConfigurationParameters.DONATED_COLLECTIBLES)
      ) || []
    );
    this.turnipRequest.next(
      JSON.parse(localStorage.getItem(ConfigurationParameters.TURNIP_REQUEST))
    );

    this.southernHemisphere.subscribe((southernHemisphere) =>
      localStorage.setItem(
        ConfigurationParameters.SOUTHERN_HEMISPHERE,
        String(southernHemisphere)
      )
    );
    this.collectedCollectibles.subscribe((collectedCollectibles) =>
      localStorage.setItem(
        ConfigurationParameters.COLLECTED_COLLECTIBLES,
        JSON.stringify(collectedCollectibles)
      )
    );
    this.donatedCollectibles.subscribe((donatedCollectibles) =>
      localStorage.setItem(
        ConfigurationParameters.DONATED_COLLECTIBLES,
        JSON.stringify(donatedCollectibles)
      )
    );
    this.turnipRequest.subscribe((turnipRequest) =>
      localStorage.setItem(
        ConfigurationParameters.TURNIP_REQUEST,
        JSON.stringify(turnipRequest)
      )
    );
  }

  addCollected(name: string) {
    if (!this.collectedCollectibles.value.includes(name)) {
      this.collectedCollectibles.next([
        ...this.collectedCollectibles.value,
        name,
      ]);
    }
  }

  removeCollected(name: string) {
    this.collectedCollectibles.next(
      this.collectedCollectibles.value.filter((n) => n !== name)
    );
  }

  addDonated(name: string) {
    if (!this.donatedCollectibles.value.includes(name)) {
      this.donatedCollectibles.next([...this.donatedCollectibles.value, name]);
    }
  }

  removeDonated(name: string) {
    this.donatedCollectibles.next(
      this.donatedCollectibles.value.filter((n) => n !== name)
    );
  }
}
