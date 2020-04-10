export interface TurnipCalculationRequest {
    basePrice: number;
    firstTime: boolean;
    seenPrices: Array<number>;
}