import { TurnipPrice } from './turnipPrice';

export interface TurnipPattern {
    basePrice: number;
    prices: Array<TurnipPrice>;
}