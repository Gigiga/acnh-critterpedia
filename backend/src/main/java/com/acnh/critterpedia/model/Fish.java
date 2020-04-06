package com.acnh.critterpedia.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Fish {
    @Id
    private String name;
    @Column(columnDefinition = "TEXT")
    private String image;
    private int price;
    @Enumerated(EnumType.STRING)
    private LocationEnum location;
    @Enumerated(EnumType.STRING)
    private ShadowSize shadowSize;
    @OneToOne(cascade = CascadeType.ALL)
    private CatchTime catchTime;

    @Getter
    public enum LocationEnum {
        RIVER("RIVER"),

        POND("POND"),

        RIVER_CLIFFTOP("RIVER_CLIFFTOP"),

        RIVER_MOUTH("RIVER_MOUTH"),

        SEA("SEA"),

        PIER("PIER"),

        SEA_RAINING("SEA_RAINING");

        private String value;

        LocationEnum(String value) {
            this.value = value;
        }

        public static LocationEnum fromValue(String text) {
            for (LocationEnum b : LocationEnum.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }
    }
}
