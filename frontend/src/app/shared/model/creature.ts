import { CatchTime } from './catchTime';
import { Collectible } from './collectible';

export interface Creature extends Collectible {
  catchTime?: CatchTime;
}
