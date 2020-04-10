package io.swagger.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * CalculationRequest
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-10T16:36:46.244Z")

public class CalculationRequest {
  @JsonProperty("basePrice")
  private Integer basePrice = null;

  @JsonProperty("firstTime")
  private Boolean firstTime = false;

  @JsonProperty("seenPrices")
  @Valid
  private List<Integer> seenPrices = null;

  public CalculationRequest basePrice(Integer basePrice) {
    this.basePrice = basePrice;
    return this;
  }

  /**
   * Get basePrice
   *
   * @return basePrice
   **/
  @ApiModelProperty(value = "")


  public Integer getBasePrice() {
    return basePrice;
  }

  public void setBasePrice(Integer basePrice) {
    this.basePrice = basePrice;
  }

  public CalculationRequest firstTime(Boolean firstTime) {
    this.firstTime = firstTime;
    return this;
  }

  /**
   * Get firstTime
   *
   * @return firstTime
   **/
  @ApiModelProperty(value = "")


  public Boolean isFirstTime() {
    return firstTime;
  }

  public void setFirstTime(Boolean firstTime) {
    this.firstTime = firstTime;
  }

  public CalculationRequest seenPrices(List<Integer> seenPrices) {
    this.seenPrices = seenPrices;
    return this;
  }

  public CalculationRequest addSeenPricesItem(Integer seenPricesItem) {
    if (this.seenPrices == null) {
      this.seenPrices = new ArrayList<Integer>();
    }
    this.seenPrices.add(seenPricesItem);
    return this;
  }

  /**
   * Get seenPrices
   *
   * @return seenPrices
   **/
  @ApiModelProperty(value = "")


  public List<Integer> getSeenPrices() {
    return seenPrices;
  }

  public void setSeenPrices(List<Integer> seenPrices) {
    this.seenPrices = seenPrices;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CalculationRequest calculationRequest = (CalculationRequest) o;
    return Objects.equals(this.basePrice, calculationRequest.basePrice) &&
            Objects.equals(this.firstTime, calculationRequest.firstTime) &&
            Objects.equals(this.seenPrices, calculationRequest.seenPrices);
  }

  @Override
  public int hashCode() {
    return Objects.hash(basePrice, firstTime, seenPrices);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CalculationRequest {\n");

    sb.append("    basePrice: ").append(toIndentedString(basePrice)).append("\n");
    sb.append("    firstTime: ").append(toIndentedString(firstTime)).append("\n");
    sb.append("    seenPrices: ").append(toIndentedString(seenPrices)).append("\n");
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

