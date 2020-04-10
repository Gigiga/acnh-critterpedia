package com.acnh.critterpedia.turnips.generator;

import com.acnh.critterpedia.turnips.TurnipPattern;
import com.acnh.critterpedia.turnips.TurnipPatterns;

import java.util.List;

public interface Generator {
    List<TurnipPattern> generatePatterns(int basePrice);

    TurnipPatterns getPattern();
}
