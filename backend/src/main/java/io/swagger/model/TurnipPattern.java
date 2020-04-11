package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.model.TurnipPrice;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * TurnipPattern
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-11T10:47:13.120Z")

public class TurnipPattern   {
  @JsonProperty("prices")
  @Valid
  private List<TurnipPrice> prices = null;

  @JsonProperty("basePrice")
  private Integer basePrice = null;

  public TurnipPattern prices(List<TurnipPrice> prices) {
    this.prices = prices;
    return this;
  }

  public TurnipPattern addPricesItem(TurnipPrice pricesItem) {
    if (this.prices == null) {
      this.prices = new ArrayList<TurnipPrice>();
    }
    this.prices.add(pricesItem);
    return this;
  }

  /**
   * Get prices
   * @return prices
  **/
  @ApiModelProperty(value = "")

  @Valid

  public List<TurnipPrice> getPrices() {
    return prices;
  }

  public void setPrices(List<TurnipPrice> prices) {
    this.prices = prices;
  }

  public TurnipPattern basePrice(Integer basePrice) {
    this.basePrice = basePrice;
    return this;
  }

  /**
   * Get basePrice
   * @return basePrice
  **/
  @ApiModelProperty(value = "")


  public Integer getBasePrice() {
    return basePrice;
  }

  public void setBasePrice(Integer basePrice) {
    this.basePrice = basePrice;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TurnipPattern turnipPattern = (TurnipPattern) o;
    return Objects.equals(this.prices, turnipPattern.prices) &&
        Objects.equals(this.basePrice, turnipPattern.basePrice);
  }

  @Override
  public int hashCode() {
    return Objects.hash(prices, basePrice);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TurnipPattern {\n");
    
    sb.append("    prices: ").append(toIndentedString(prices)).append("\n");
    sb.append("    basePrice: ").append(toIndentedString(basePrice)).append("\n");
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

