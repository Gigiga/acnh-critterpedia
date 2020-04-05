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
 * Bug
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-05T12:35:19.500Z")

public class Bug {
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

        HITTING_ROCKS("HITTING_ROCKS");

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

    @JsonProperty("catchTime")
    private CatchTime catchTime = null;

    public Bug name(String name) {
        this.name = name;
        return this;
    }

    /**
     * Name of the bug
     *
     * @return name
     **/
    @ApiModelProperty(example = "Ladybug", value = "Name of the bug")


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Bug image(byte[] image) {
        this.image = image;
        return this;
    }

    /**
     * Image of the bug
     *
     * @return image
     **/
    @ApiModelProperty(value = "Image of the bug")

    @Pattern(regexp = "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$")
    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Bug price(Integer price) {
        this.price = price;
        return this;
    }

    /**
     * Selling price of the bug
     *
     * @return price
     **/
    @ApiModelProperty(example = "200", value = "Selling price of the bug")


    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Bug locations(List<LocationsEnum> locations) {
        this.locations = locations;
        return this;
    }

    public Bug addLocationsItem(LocationsEnum locationsItem) {
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

    public Bug catchTime(CatchTime catchTime) {
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
        Bug bug = (Bug) o;
        return Objects.equals(this.name, bug.name) &&
                Objects.equals(this.image, bug.image) &&
                Objects.equals(this.price, bug.price) &&
                Objects.equals(this.locations, bug.locations) &&
                Objects.equals(this.catchTime, bug.catchTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, image, price, locations, catchTime);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class Bug {\n");

        sb.append("    name: ").append(toIndentedString(name)).append("\n");
        sb.append("    image: ").append(toIndentedString(image)).append("\n");
        sb.append("    price: ").append(toIndentedString(price)).append("\n");
        sb.append("    locations: ").append(toIndentedString(locations)).append("\n");
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

