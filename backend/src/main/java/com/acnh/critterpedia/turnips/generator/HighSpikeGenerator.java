package com.acnh.critterpedia.turnips.generator;

import com.acnh.critterpedia.turnips.TurnipPattern;
import com.acnh.critterpedia.turnips.TurnipPatterns;
import com.acnh.critterpedia.turnips.TurnipPrice;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HighSpikeGenerator extends BaseGenerator {
    public HighSpikeGenerator() {
        super(TurnipPatterns.HIGH_SPIKE);
    }

    @Override
    public List<TurnipPattern> generatePatterns(int basePrice) {
        List<TurnipPattern> patterns = new ArrayList<>();
        for (int peakStart = 1; peakStart <= 7; ++peakStart) {
            List<TurnipPrice> prices = new ArrayList<>();

            prices.addAll(decreasingPhase(peakStart, basePrice, 0.9, 0.85, 0.03, 0.05));

            prices.add(createTurnipPrice(basePrice, 0.9, 1.4));
            prices.add(createTurnipPrice(basePrice, 1.4, 2.0));
            prices.add(createTurnipPrice(basePrice, 2.0, 6.0));
            prices.add(createTurnipPrice(basePrice, 1.4, 2.0));
            prices.add(createTurnipPrice(basePrice, 0.9, 1.4));

            while (prices.size() < 12) {
                prices.add(createTurnipPrice(basePrice, 0.4, 0.9));
            }
            patterns.add(new TurnipPattern(prices));
        }
        return patterns;
    }
}
