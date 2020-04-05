package io.swagger.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Gets or Sets months
 */
public enum Months {

    JAN("JAN"),

    FEB("FEB"),

    MAR("MAR"),

    APR("APR"),

    MAY("MAY"),

    JUN("JUN"),

    JUL("JUL"),

    AUG("AUG"),

    SEP("SEP"),

    OCT("OCT"),

    NOV("NOV"),

    DEC("DEC");

    private String value;

    Months(String value) {
        this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
        return String.valueOf(value);
    }

    @JsonCreator
    public static Months fromValue(String text) {
        for (Months b : Months.values()) {
            if (String.valueOf(b.value).equals(text)) {
                return b;
            }
        }
        return null;
    }
}

