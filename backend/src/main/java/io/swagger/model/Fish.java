package io.swagger.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Fish
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-05T12:35:19.500Z")

public class Fish {
    @JsonProperty("name")
    private String name = null;

    @JsonProperty("image")
    private byte[] image = null;

    @JsonProperty("price")
    private Integer price = null;

    /**
     * Gets or Sets locations
     */
    public enum LocationsEnum {
        RIVER("RIVER"),

        POND("POND"),

        RIVER_CLIFFTOP("RIVER_CLIFFTOP"),

        RIVER_MOUTH("RIVER_MOUTH"),

        SEA("SEA"),

        PIER("PIER"),

        SEA_RAINING("SEA_RAINING");

        private String value;

        LocationsEnum(String value) {
            this.value = value;
        }

        @Override
        @JsonValue
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static LocationsEnum fromValue(String text) {
            for (LocationsEnum b : LocationsEnum.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }
    }

    @JsonProperty("locations")
    @Valid
    private List<LocationsEnum> locations = null;

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

    public Fish image(byte[] image) {
        this.image = image;
        return this;
    }

    /**
     * Image of the fish
     *
     * @return image
     **/
    @ApiModelProperty(value = "Image of the fish")

    @Pattern(regexp = "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$")
    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
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

    public Fish locations(List<LocationsEnum> locations) {
        this.locations = locations;
        return this;
    }

    public Fish addLocationsItem(LocationsEnum locationsItem) {
        if (this.locations == null) {
            this.locations = new ArrayList<LocationsEnum>();
        }
        this.locations.add(locationsItem);
        return this;
    }

    /**
     * Get locations
     *
     * @return locations
     **/
    @ApiModelProperty(value = "")


    public List<LocationsEnum> getLocations() {
        return locations;
    }

    public void setLocations(List<LocationsEnum> locations) {
        this.locations = locations;
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
    public boolean equals(java.lang.Object o) {
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
                Objects.equals(this.locations, fish.locations) &&
                Objects.equals(this.shadowSize, fish.shadowSize) &&
                Objects.equals(this.catchTime, fish.catchTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, image, price, locations, shadowSize, catchTime);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class Fish {\n");

        sb.append("    name: ").append(toIndentedString(name)).append("\n");
        sb.append("    image: ").append(toIndentedString(image)).append("\n");
        sb.append("    price: ").append(toIndentedString(price)).append("\n");
        sb.append("    locations: ").append(toIndentedString(locations)).append("\n");
        sb.append("    shadowSize: ").append(toIndentedString(shadowSize)).append("\n");
        sb.append("    catchTime: ").append(toIndentedString(catchTime)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(java.lang.Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}

