import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selling-price',
  templateUrl: './selling-price.component.html',
  styleUrls: ['./selling-price.component.scss'],
})
export class SellingPriceComponent implements OnInit {
  @Input() price: number;

  priceMapping: any = {
    '=0': 'NoBells',
    '=1': 'Bell',
    other: 'Bells',
  };

  constructor() {}

  ngOnInit(): void {}
}
