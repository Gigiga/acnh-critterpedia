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
import java.util.stream.Collectors;

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

            io.swagger.model.TurnipPatterns possibilities = new io.swagger.model.TurnipPatterns();

            for (int price = priceMin; price <= priceMax; ++price) {
                int finalPrice = price;
                possibilities.addAll(calculated.get(price)
                        .stream()
                        .map(calculatedPattern -> this.mapTurnipPattern(calculationRequest, calculatedPattern,
                                finalPrice))
                        .filter(Objects::nonNull)
                        .collect(Collectors.toList()));
            }

            if (!possibilities.isEmpty()) {
                possiblePatterns.put(pattern.name(), possibilities);
            }
        }
        return possiblePatterns;
    }

    private io.swagger.model.TurnipPattern mapTurnipPattern(CalculationRequest calculationRequest,
                                                            TurnipPattern calculatedPattern, int basePrice) {
        io.swagger.model.TurnipPattern turnipPattern = new io.swagger.model.TurnipPattern();

        List<TurnipPrice> prices = calculatedPattern.getPrices();
        List<Integer> seenPrices = calculationRequest.getSeenPrices();
        for (int i = 0; i < prices.size(); ++i) {
            TurnipPrice turnipPrice = prices.get(i);
            if (i >= seenPrices.size() || seenPrices.get(i) == null) {
                turnipPattern.addPricesItem(mapTurnipPrice(turnipPrice));
            } else {
                Integer seenPrice = seenPrices.get(i);
                if (seenPrice < turnipPrice.getMin() || seenPrice > turnipPrice.getMax()) {
                    return null;
                }
                turnipPattern.addPricesItem(mapTurnipPrice(turnipPrice));
            }
        }
        turnipPattern.setBasePrice(basePrice);
        return turnipPattern;
    }

    private io.swagger.model.TurnipPrice mapTurnipPrice(TurnipPrice turnipPrice) {
        io.swagger.model.TurnipPrice mappedTurnipPrice = new io.swagger.model.TurnipPrice();
        mappedTurnipPrice.setMax(turnipPrice.getMax());
        mappedTurnipPrice.setMin(turnipPrice.getMin());
        return mappedTurnipPrice;
    }
}
