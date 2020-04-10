package com.acnh.critterpedia.service;

import com.acnh.critterpedia.turnips.TurnipPattern;
import com.acnh.critterpedia.turnips.TurnipPatterns;
import com.acnh.critterpedia.turnips.TurnipPrice;
import com.acnh.critterpedia.turnips.generator.Generator;
import io.swagger.model.CalculationRequest;
import io.swagger.model.TurnipPatternMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Calculation and generation based on https://gist.github.com/Treeki/85be14d297c80c8b3c0a76375743325b
 */
@Service
public class TurnipServiceImpl implements TurnipService {
    @Autowired
    List<Generator> generators;

    private Map<TurnipPatterns, Map<Integer, List<TurnipPattern>>> patterns = new EnumMap<>(TurnipPatterns.class);

    @Override
    public void pregeneratePatterns() {
        for (Generator generator : generators) {
            Map<Integer, List<TurnipPattern>> pricePatterns = new HashMap<>();
            for (int basePrice = 90; basePrice <= 110; ++basePrice) {
                pricePatterns.put(basePrice, generator.generatePatterns(basePrice));
            }
            patterns.put(generator.getPattern(), pricePatterns);
        }

    }

    @Override
    public TurnipPatternMap getPossiblePatterns(CalculationRequest calculationRequest) {
        TurnipPatternMap possiblePatterns = new TurnipPatternMap();

        List<TurnipPatterns> patterns = Arrays.asList(TurnipPatterns.values());
        int priceMin;
        int priceMax;

        if (calculationRequest.getBasePrice() == null || calculationRequest.isFirstTime()) {
            priceMin = 90;
            priceMax = 110;
            if (calculationRequest.isFirstTime()) {
                patterns = Arrays.asList(TurnipPatterns.SPIKE);
            }
        } else {
            priceMin = priceMax = Math.min(Math.max(calculationRequest.getBasePrice(), 90), 110);
        }

        for (TurnipPatterns pattern : patterns) {
            Map<Integer, List<TurnipPattern>> calculated = this.patterns.get(pattern);

            List<TurnipPattern> possibilities = new ArrayList<>();
    
            for (int price = priceMin; price <= priceMax; ++price) {
                List<TurnipPattern> calculatedPatterns = calculated.get(price);
                for (TurnipPattern calculatedPattern : calculatedPatterns) {
                    boolean possible = true;
                    List<Integer> seenPrices = calculationRequest.getSeenPrices();
                    for (int i = 0; i < seenPrices.size(); ++i) {
                        Integer seenPrice = seenPrices.get(i);
                        if (seenPrice != null) {
                            TurnipPrice turnipPrice = calculatedPattern.getPrices().get(i);
                            if (seenPrice < turnipPrice.getMin() || seenPrice > turnipPrice.getMax()) {
                                possible = false;
                                break;
                            }
                        }
                    }

                    if (possible) {
                        possibilities.add(calculatedPattern);
                    }
                }
            }

            if (!possibilities.isEmpty()) {
                possiblePatterns.put(pattern.name(), possibilities);
            }
        }
        return possiblePatterns;
    }
}
