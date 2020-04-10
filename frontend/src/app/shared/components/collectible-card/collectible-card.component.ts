import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Collectible } from '../../model/collectible';
import { Subject } from 'rxjs';
import { ConfigurationService } from '../../service/configuration.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-collectible-card',
  templateUrl: './collectible-card.component.html',
  styleUrls: ['./collectible-card.component.scss'],
})
export class CollectibleCardComponent implements OnInit, OnDestroy {
  @Input() collectible: Collectible;
  @Input() image: string;
  @Input() additionalContent: { title: string; value: string }[] = [];

  private destroyed$ = new Subject();

  collected = false;
  donated = false;

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService.collectedCollectibles
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (collected) =>
          (this.collected = collected.includes(this.collectible.name))
      );

    this.configurationService.donatedCollectibles
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (donated) => (this.donated = donated.includes(this.collectible.name))
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toggleCollected(collected: boolean) {
    if (collected) {
      this.configurationService.addCollected(this.collectible.name);
    } else {
      this.configurationService.removeCollected(this.collectible.name);
      this.configurationService.removeDonated(this.collectible.name);
    }
  }

  toggleDonated(donated: boolean) {
    if (donated) {
      this.configurationService.addCollected(this.collectible.name);
      this.configurationService.addDonated(this.collectible.name);
    } else {
      this.configurationService.removeDonated(this.collectible.name);
    }
  }
}
