package com.acnh.critterpedia.turnips.generator;

import com.acnh.critterpedia.turnips.TurnipPattern;
import com.acnh.critterpedia.turnips.TurnipPatterns;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DecreasingGenerator extends BaseGenerator {
    public DecreasingGenerator() {
        super(TurnipPatterns.DECREASING);
    }

    @Override
    public List<TurnipPattern> generatePatterns(int basePrice) {
        List<TurnipPattern> patterns = new ArrayList<>();
        patterns.add(new TurnipPattern(decreasingPhase(12, basePrice, 0.9, 0.85, 0.03, 0.05)));
        return patterns;
    }
}
