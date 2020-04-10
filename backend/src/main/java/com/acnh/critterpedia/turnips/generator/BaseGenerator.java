package com.acnh.critterpedia.turnips.generator;

import com.acnh.critterpedia.turnips.TurnipPatterns;
import com.acnh.critterpedia.turnips.TurnipPrice;

import java.util.ArrayList;
import java.util.List;

public abstract class BaseGenerator implements Generator {
    private TurnipPatterns pattern;

    public BaseGenerator(TurnipPatterns pattern) {
        this.pattern = pattern;
    }

    @Override
    public TurnipPatterns getPattern() {
        return pattern;
    }

    protected int intceil(double val) {
        return (int) (val + 0.99999);
    }

    protected TurnipPrice createTurnipPrice(int basePrice, double rateMin, double rateMax) {
        return new TurnipPrice(intceil(rateMin * basePrice), intceil(rateMax * basePrice));
    }

    protected List<TurnipPrice> decreasingPhase(int phaseLen, int basePrice, double rateMax, double rateMin, double maxDec, double minDec) {
        List<TurnipPrice> prices = new ArrayList<>();
        for (int i = 0; i < phaseLen; ++i) {
            prices.add(createTurnipPrice(basePrice, rateMin, rateMax));
            rateMin -= minDec;
            rateMax -= maxDec;
        }
        return prices;
    }
}
