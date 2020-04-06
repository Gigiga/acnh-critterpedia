package io.swagger.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import java.util.Objects;

/**
 * Fossil
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-06T17:23:51.744Z")

public class Fossil {
    @JsonProperty("name")
    private String name = null;

    @JsonProperty("image")
    private String image = null;

    @JsonProperty("price")
    private Integer price = null;

    public Fossil name(String name) {
        this.name = name;
        return this;
    }

    /**
     * Name of the fossil
     *
     * @return name
     **/
    @ApiModelProperty(example = "Acanthostega", value = "Name of the fossil")


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Fossil image(String image) {
        this.image = image;
        return this;
    }

    /**
     * Image of the fossil
     *
     * @return image
     **/
    @ApiModelProperty(value = "Image of the fossil")


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Fossil price(Integer price) {
        this.price = price;
        return this;
    }

    /**
     * Selling price of the fossil
     *
     * @return price
     **/
    @ApiModelProperty(example = "2000", value = "Selling price of the fossil")


    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Fossil fossil = (Fossil) o;
        return Objects.equals(this.name, fossil.name) &&
                Objects.equals(this.image, fossil.image) &&
                Objects.equals(this.price, fossil.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, image, price);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class Fossil {\n");

        sb.append("    name: ").append(toIndentedString(name)).append("\n");
        sb.append("    image: ").append(toIndentedString(image)).append("\n");
        sb.append("    price: ").append(toIndentedString(price)).append("\n");
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

