package io.swagger.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Availability time of the creature
 */
@ApiModel(description = "Availability time of the creature")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-09T20:09:08.110Z")

public class CatchTime {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("catchHours")
  @Valid
  private List<CatchHour> catchHours = null;

  @JsonProperty("northernHemisphereMonths")
  @Valid
  private List<Months> northernHemisphereMonths = null;

  @JsonProperty("southernHemisphereMonths")
  @Valid
  private List<Months> southernHemisphereMonths = null;

  public CatchTime id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Identifier of the catchtime
   *
   * @return id
   **/
  @ApiModelProperty(example = "1", value = "Identifier of the catchtime")


  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public CatchTime catchHours(List<CatchHour> catchHours) {
    this.catchHours = catchHours;
    return this;
  }

  public CatchTime addCatchHoursItem(CatchHour catchHoursItem) {
    if (this.catchHours == null) {
      this.catchHours = new ArrayList<CatchHour>();
    }
    this.catchHours.add(catchHoursItem);
    return this;
  }

  /**
   * Get catchHours
   *
   * @return catchHours
   **/
  @ApiModelProperty(value = "")

  @Valid

  public List<CatchHour> getCatchHours() {
    return catchHours;
  }

  public void setCatchHours(List<CatchHour> catchHours) {
    this.catchHours = catchHours;
  }

  public CatchTime northernHemisphereMonths(List<Months> northernHemisphereMonths) {
    this.northernHemisphereMonths = northernHemisphereMonths;
    return this;
  }

  public CatchTime addNorthernHemisphereMonthsItem(Months northernHemisphereMonthsItem) {
    if (this.northernHemisphereMonths == null) {
      this.northernHemisphereMonths = new ArrayList<Months>();
    }
    this.northernHemisphereMonths.add(northernHemisphereMonthsItem);
    return this;
  }

  /**
   * Availability months in northern hemisphere
   *
   * @return northernHemisphereMonths
   **/
  @ApiModelProperty(value = "Availability months in northern hemisphere")

  @Valid

  public List<Months> getNorthernHemisphereMonths() {
    return northernHemisphereMonths;
  }

  public void setNorthernHemisphereMonths(List<Months> northernHemisphereMonths) {
    this.northernHemisphereMonths = northernHemisphereMonths;
  }

  public CatchTime southernHemisphereMonths(List<Months> southernHemisphereMonths) {
    this.southernHemisphereMonths = southernHemisphereMonths;
    return this;
  }

  public CatchTime addSouthernHemisphereMonthsItem(Months southernHemisphereMonthsItem) {
    if (this.southernHemisphereMonths == null) {
      this.southernHemisphereMonths = new ArrayList<Months>();
    }
    this.southernHemisphereMonths.add(southernHemisphereMonthsItem);
    return this;
  }

  /**
   * Availability months in southern hemisphere
   *
   * @return southernHemisphereMonths
   **/
  @ApiModelProperty(value = "Availability months in southern hemisphere")

  @Valid

  public List<Months> getSouthernHemisphereMonths() {
    return southernHemisphereMonths;
  }

  public void setSouthernHemisphereMonths(List<Months> southernHemisphereMonths) {
    this.southernHemisphereMonths = southernHemisphereMonths;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CatchTime catchTime = (CatchTime) o;
    return Objects.equals(this.id, catchTime.id) &&
            Objects.equals(this.catchHours, catchTime.catchHours) &&
            Objects.equals(this.northernHemisphereMonths, catchTime.northernHemisphereMonths) &&
            Objects.equals(this.southernHemisphereMonths, catchTime.southernHemisphereMonths);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, catchHours, northernHemisphereMonths, southernHemisphereMonths);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CatchTime {\n");

    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    catchHours: ").append(toIndentedString(catchHours)).append("\n");
    sb.append("    northernHemisphereMonths: ").append(toIndentedString(northernHemisphereMonths)).append("\n");
    sb.append("    southernHemisphereMonths: ").append(toIndentedString(southernHemisphereMonths)).append("\n");
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

