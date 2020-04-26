import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { ConfigurationService } from '../shared/service/configuration.service';

@Component({
  selector: 'app-perma',
  template: '',
  styleUrls: [],
})
export class PermaComponent implements OnInit {
  constructor(
    private configurationService: ConfigurationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        take(1),
        map((params: ParamMap) => params.get('link'))
      )
      .subscribe((link) => {
        this.configurationService.restoreFromLink(link);
        this.router.navigate(['/']);
      });
  }
}
