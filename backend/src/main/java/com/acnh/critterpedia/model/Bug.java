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
public class Bug {
    @Id
    private String name;
    @Column(columnDefinition = "TEXT")
    private String image;
    private int price;
    @Enumerated(EnumType.STRING)
    private LocationEnum location;
    @OneToOne(cascade = CascadeType.ALL)
    private CatchTime catchTime;
    @Column(columnDefinition = "TEXT")
    private String largeImage;

    @Getter
    public enum LocationEnum {
        FLYING("FLYING"),

        FLYING_BY_HYBRID_FLOWERS("FLYING_BY_HYBRID_FLOWERS"),

        FLYING_BY_LIGHT("FLYING_BY_LIGHT"),

        TREES("TREES"),

        GROUND("GROUND"),

        WHITE_FLOWERS("WHITE_FLOWERS"),

        SHAKING_TREES("SHAKING_TREES"),

        UNDERGROUND("UNDERGROUND"),

        POND_AND_RIVERS("POND_AND_RIVERS"),

        FLOWERS("FLOWERS"),

        TREESTUMPS("TREESTUMPS"),

        COCONUT_TREES("COCONUT_TREES"),

        GROUND_ROLLING_SNOWBALLS("GROUND_ROLLING_SNOWBALLS"),

        UNDER_TREES_DISGUISED_LEAFS("UNDER_TREES_DISGUISED_LEAFS"),

        ROTTEN_FRUIT("ROTTEN_FRUIT"),

        BEACH("BEACH"),

        BEACH_ROCKS("BEACH_ROCKS"),

        TRASH("TRASH"),

        VILLAGERS_HATS("VILLAGERS_HATS"),

        ROCKS_RAINING("ROCKS_RAINING"),

        HITTING_ROCKS("HITTING_ROCKS"),

        ROCKS_BUSHES_RAINING("ROCKS_BUSHES_RAINING");

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