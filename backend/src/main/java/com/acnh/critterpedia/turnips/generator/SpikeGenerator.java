package com.acnh.critterpedia.turnips.generator;

import com.acnh.critterpedia.turnips.TurnipPattern;
import com.acnh.critterpedia.turnips.TurnipPatterns;
import com.acnh.critterpedia.turnips.TurnipPrice;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SpikeGenerator extends BaseGenerator {
    SpikeGenerator() {
        super(TurnipPatterns.SPIKE);
    }

    @Override
    public List<TurnipPattern> generatePatterns(int basePrice) {
        List<TurnipPattern> patterns = new ArrayList<>();
        for (int peakStart = 0; peakStart <= 7; ++peakStart) {
            List<TurnipPrice> prices = new ArrayList<>();

            // decreasing phase before the peak
            prices.addAll(decreasingPhase(basePrice, peakStart));

            // peak
            prices.add(createTurnipPrice(basePrice, 0.9, 1.4));
            prices.add(createTurnipPrice(basePrice, 0.9, 1.4));
            prices.add(createTurnipPrice(basePrice, 1.4, 2.0));
            prices.add(createTurnipPrice(basePrice, 1.4, 2.0));
            prices.add(createTurnipPrice(basePrice, 1.4, 2.0));

            // decreasing
            prices.addAll(decreasingPhase(basePrice, 12 - prices.size()));

            patterns.add(new TurnipPattern(prices));
        }
        return patterns;
    }

    private List<TurnipPrice> decreasingPhase(int basePrice, int phaseLen) {
        return decreasingPhase(phaseLen, basePrice, 0.9, 0.4, 0.03, 0.05);
    }
}
