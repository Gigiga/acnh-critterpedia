package io.swagger.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.Objects;

/**
 * Fish
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-06T17:23:51.744Z")

public class Fish {
    @JsonProperty("name")
    private String name = null;

    @JsonProperty("image")
    private String image = null;

    @JsonProperty("price")
    private Integer price = null;

    /**
     * Gets or Sets location
     */
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

        @Override
        @JsonValue
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static LocationEnum fromValue(String text) {
            for (LocationEnum b : LocationEnum.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }
    }

    @JsonProperty("location")
    private LocationEnum location = null;

    /**
     * Gets or Sets shadowSize
     */
    public enum ShadowSizeEnum {
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

        ShadowSizeEnum(String value) {
            this.value = value;
        }

        @Override
        @JsonValue
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static ShadowSizeEnum fromValue(String text) {
            for (ShadowSizeEnum b : ShadowSizeEnum.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }
    }

    @JsonProperty("shadowSize")
    private ShadowSizeEnum shadowSize = null;

    @JsonProperty("catchTime")
    private CatchTime catchTime = null;

    public Fish name(String name) {
        this.name = name;
        return this;
    }

    /**
     * Name of the fish
     *
     * @return name
     **/
    @ApiModelProperty(example = "Sea Bass", value = "Name of the fish")


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Fish image(String image) {
        this.image = image;
        return this;
    }

    /**
     * Image of the fish
     *
     * @return image
     **/
    @ApiModelProperty(value = "Image of the fish")


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Fish price(Integer price) {
        this.price = price;
        return this;
    }

    /**
     * Selling price of the fish
     *
     * @return price
     **/
    @ApiModelProperty(example = "400", value = "Selling price of the fish")


    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Fish location(LocationEnum location) {
        this.location = location;
        return this;
    }

    /**
     * Get location
     *
     * @return location
     **/
    @ApiModelProperty(value = "")


    public LocationEnum getLocation() {
        return location;
    }

    public void setLocation(LocationEnum location) {
        this.location = location;
    }

    public Fish shadowSize(ShadowSizeEnum shadowSize) {
        this.shadowSize = shadowSize;
        return this;
    }

    /**
     * Get shadowSize
     *
     * @return shadowSize
     **/
    @ApiModelProperty(value = "")


    public ShadowSizeEnum getShadowSize() {
        return shadowSize;
    }

    public void setShadowSize(ShadowSizeEnum shadowSize) {
        this.shadowSize = shadowSize;
    }

    public Fish catchTime(CatchTime catchTime) {
        this.catchTime = catchTime;
        return this;
    }

    /**
     * Get catchTime
     *
     * @return catchTime
     **/
    @ApiModelProperty(value = "")

    @Valid

    public CatchTime getCatchTime() {
        return catchTime;
    }

    public void setCatchTime(CatchTime catchTime) {
        this.catchTime = catchTime;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Fish fish = (Fish) o;
        return Objects.equals(this.name, fish.name) &&
                Objects.equals(this.image, fish.image) &&
                Objects.equals(this.price, fish.price) &&
                Objects.equals(this.location, fish.location) &&
                Objects.equals(this.shadowSize, fish.shadowSize) &&
                Objects.equals(this.catchTime, fish.catchTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, image, price, location, shadowSize, catchTime);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class Fish {\n");

        sb.append("    name: ").append(toIndentedString(name)).append("\n");
        sb.append("    image: ").append(toIndentedString(image)).append("\n");
        sb.append("    price: ").append(toIndentedString(price)).append("\n");
        sb.append("    location: ").append(toIndentedString(location)).append("\n");
        sb.append("    shadowSize: ").append(toIndentedString(shadowSize)).append("\n");
        sb.append("    catchTime: ").append(toIndentedString(catchTime)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}

