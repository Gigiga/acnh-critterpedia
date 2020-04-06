package com.acnh.critterpedia.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Months {

    @Id
    private String name;

    @Getter
    public enum MonthsEnum {
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

        public String value;

        MonthsEnum(String value) {
            this.value = value;
        }
    }
}
