package io.swagger.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import java.util.Objects;

/**
 * Start and end hour of catch time
 */
@ApiModel(description = "Start and end hour of catch time")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-09T20:09:08.110Z")

public class CatchHour {
  @JsonProperty("startHour")
  private Integer startHour = null;

  @JsonProperty("endHour")
  private Integer endHour = null;

  public CatchHour startHour(Integer startHour) {
    this.startHour = startHour;
    return this;
  }

  /**
   * Availability start hour
   *
   * @return startHour
   **/
  @ApiModelProperty(example = "12", value = "Availability start hour")


  public Integer getStartHour() {
    return startHour;
  }

  public void setStartHour(Integer startHour) {
    this.startHour = startHour;
  }

  public CatchHour endHour(Integer endHour) {
    this.endHour = endHour;
    return this;
  }

  /**
   * Availability end hour
   *
   * @return endHour
   **/
  @ApiModelProperty(example = "16", value = "Availability end hour")


  public Integer getEndHour() {
    return endHour;
  }

  public void setEndHour(Integer endHour) {
    this.endHour = endHour;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CatchHour catchHour = (CatchHour) o;
    return Objects.equals(this.startHour, catchHour.startHour) &&
            Objects.equals(this.endHour, catchHour.endHour);
  }

  @Override
  public int hashCode() {
    return Objects.hash(startHour, endHour);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CatchHour {\n");

    sb.append("    startHour: ").append(toIndentedString(startHour)).append("\n");
    sb.append("    endHour: ").append(toIndentedString(endHour)).append("\n");
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

