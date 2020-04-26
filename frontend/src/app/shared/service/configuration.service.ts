import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigurationParameters } from './configuration-parameters.enum';
import { TurnipCalculationRequest } from '../model/turnipCalculationRequest';
import { skip } from 'rxjs/operators';
import { TurnipPatterns } from '../model/turnip-patterns.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  southernHemisphere = new BehaviorSubject<boolean>(false);
  collectedCollectibles = new BehaviorSubject<string[]>([]);
  donatedCollectibles = new BehaviorSubject<string[]>([]);
  turnipRequest = new BehaviorSubject<TurnipCalculationRequest>(null);
  lastTurnipPattern = new BehaviorSubject<TurnipPatterns>(null);

  constructor(private router: Router) {
    this.loadFromStorage();

    this.southernHemisphere.subscribe((southernHemisphere) =>
      localStorage.setItem(
        ConfigurationParameters.SOUTHERN_HEMISPHERE,
        String(southernHemisphere)
      )
    );
    this.collectedCollectibles
      .pipe(skip(1))
      .subscribe((collectedCollectibles) =>
        localStorage.setItem(
          ConfigurationParameters.COLLECTED_COLLECTIBLES,
          JSON.stringify(collectedCollectibles)
        )
      );
    this.donatedCollectibles
      .pipe(skip(1))
      .subscribe((donatedCollectibles) =>
        localStorage.setItem(
          ConfigurationParameters.DONATED_COLLECTIBLES,
          JSON.stringify(donatedCollectibles)
        )
      );
    this.turnipRequest
      .pipe(skip(1))
      .subscribe((turnipRequest) =>
        localStorage.setItem(
          ConfigurationParameters.TURNIP_REQUEST,
          JSON.stringify(turnipRequest)
        )
      );
    this.lastTurnipPattern
      .pipe(skip(1))
      .subscribe((lastPattern) =>
        localStorage.setItem(
          ConfigurationParameters.LAST_TURNIP_PATTERN,
          JSON.stringify(lastPattern)
        )
      );
  }

  private loadFromStorage() {
    this.southernHemisphere.next(
      localStorage.getItem(ConfigurationParameters.SOUTHERN_HEMISPHERE) ===
        'true'
    );
    this.collectedCollectibles.next(this.loadCollected());
    this.donatedCollectibles.next(this.loadDonated());
    this.turnipRequest.next(
      JSON.parse(localStorage.getItem(ConfigurationParameters.TURNIP_REQUEST))
    );
    this.lastTurnipPattern.next(
      JSON.parse(localStorage.getItem(
        ConfigurationParameters.LAST_TURNIP_PATTERN
      ))
    );
  }

  private loadCollected(): string[] {
    return (
      JSON.parse(
        localStorage.getItem(ConfigurationParameters.COLLECTED_COLLECTIBLES)
      ) || []
    );
  }

  private loadDonated(): string[] {
    return (
      JSON.parse(
        localStorage.getItem(ConfigurationParameters.DONATED_COLLECTIBLES)
      ) || []
    );
  }

  addCollected(name: string) {
    const collected = this.loadCollected();
    if (!collected.includes(name)) {
      this.collectedCollectibles.next([...collected, name]);
    }
  }

  removeCollected(name: string) {
    const collected = this.loadCollected();
    this.collectedCollectibles.next(collected.filter((n) => n !== name));
  }

  addDonated(name: string) {
    const donated = this.loadDonated();
    if (!donated.includes(name)) {
      this.donatedCollectibles.next([...donated, name]);
    }
  }

  removeDonated(name: string) {
    const donated = this.loadDonated();
    this.donatedCollectibles.next(donated.filter((n) => n !== name));
  }

  createPermaLink(): string {
    const obj = {};
    for (const configParam of Object.values(ConfigurationParameters)) {
      obj[configParam] = localStorage.getItem(configParam);
    }
    return `${location.origin}/#${this.router.createUrlTree(['/perma', btoa(JSON.stringify(obj))])}`;
  }

  restoreFromLink(link: string) {
    const obj = JSON.parse(atob(link));
    for(const configParam in obj) {
      localStorage.setItem(configParam, obj[configParam]);
    }
    this.loadFromStorage();
  }
}
