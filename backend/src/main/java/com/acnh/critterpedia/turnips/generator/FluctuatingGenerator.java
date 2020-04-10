package com.acnh.critterpedia.turnips.generator;

import com.acnh.critterpedia.turnips.TurnipPattern;
import com.acnh.critterpedia.turnips.TurnipPatterns;
import com.acnh.critterpedia.turnips.TurnipPrice;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FluctuatingGenerator extends BaseGenerator {
    public FluctuatingGenerator() {
        super(TurnipPatterns.FLUCTUATING);
    }

    @Override
    public List<TurnipPattern> generatePatterns(int basePrice) {
        List<TurnipPattern> patterns = new ArrayList<>();
        for (int decPhaseLen1 = 2; decPhaseLen1 <= 3; ++decPhaseLen1) {
            int decPhaseLen2 = 5 - decPhaseLen1;
            for (int hiPhaseLen1 = 0; hiPhaseLen1 <= 6; ++hiPhaseLen1) {
                int hiPhaseLen2and3 = 7 - hiPhaseLen1;
                for (int hiPhaseLen3 = 0; hiPhaseLen3 < hiPhaseLen2and3; ++hiPhaseLen3) {
                    List<TurnipPrice> turnipPrices = new ArrayList<>();
                    // high phase 1
                    turnipPrices.addAll(hiPhase(basePrice, hiPhaseLen1));

                    // decreasing phase 1
                    turnipPrices.addAll(decreasingPhase(basePrice, decPhaseLen1));

                    // high phase 2
                    turnipPrices.addAll(hiPhase(basePrice, hiPhaseLen2and3 - hiPhaseLen3));

                    // decreasing phase 2
                    turnipPrices.addAll(decreasingPhase(basePrice, decPhaseLen2));

                    // high phase 3
                    turnipPrices.addAll(hiPhase(basePrice, hiPhaseLen3));

                    patterns.add(new TurnipPattern(turnipPrices));
                }
            }
        }
        return patterns;
    }

    private List<TurnipPrice> hiPhase(int basePrice, int hiPhaseLen) {
        List<TurnipPrice> turnipPrices = new ArrayList<>();
        for (int i = 0; i < hiPhaseLen; i++) {
            turnipPrices.add(createTurnipPrice(basePrice, 0.9, 1.4));
        }
        return turnipPrices;
    }

    private List<TurnipPrice> decreasingPhase(int basePrice, int phaseLen) {
        return decreasingPhase(phaseLen, basePrice, 0.8, 0.6, 0.04, 0.1);
    }
}
