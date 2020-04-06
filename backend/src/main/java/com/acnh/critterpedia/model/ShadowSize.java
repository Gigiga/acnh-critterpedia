package com.acnh.critterpedia.model;

import lombok.Getter;

@Getter
public enum ShadowSize {
    ONE("ONE"),

    TWO("TWO"),

    THREE("THREE"),

    FOUR("FOUR"),

    FIVE("FIVE"),

    SIX("SIX"),

    NARROW("NARROW"),

    FOUR_FIN("FOUR_FIN"),

    SIX_FIN("SIX_FIN");

    private String value;

    ShadowSize(String value) {
        this.value = value;
    }
}
