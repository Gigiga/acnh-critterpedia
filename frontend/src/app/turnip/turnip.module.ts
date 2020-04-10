import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TurnipPredictionComponent } from './turnip-prediction/turnip-prediction.component';
import { PriceInputComponent } from './price-input/price-input.component';

@NgModule({
  declarations: [PriceInputComponent, TurnipPredictionComponent],
  imports: [SharedModule],
})
export class TurnipModule {}
