package com.acnh.critterpedia.service;

import io.swagger.model.CalculationRequest;
import io.swagger.model.TurnipPatternMap;

public interface TurnipService {
    void pregeneratePatterns();

    TurnipPatternMap getPossiblePatterns(CalculationRequest calculationRequest);
}
