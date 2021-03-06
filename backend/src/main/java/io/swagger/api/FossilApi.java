/**
 * NOTE: This class is auto generated by the swagger code generator program (2.4.13).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package io.swagger.api;

import io.swagger.annotations.*;
import io.swagger.model.Fossil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-10T10:14:14.149Z")

@Api(value = "fossil", description = "the fossil API")
@RequestMapping(value = "")
public interface FossilApi {

    @ApiOperation(value = "", nickname = "fossilGet", notes = "Fetch all fossils ```Example: http://192.168.99.101:4041/fossil```", response = Fossil.class, responseContainer = "List", tags = {"Fossil",})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully fetched all fossils", response = Fossil.class, responseContainer = "List")})
    @RequestMapping(value = "/fossil",
            produces = {"application/json"},
            method = RequestMethod.GET)
    ResponseEntity<List<Fossil>> fossilGet();


    @ApiOperation(value = "", nickname = "fossilNameGet", notes = "Fetch fossil with passed name ```Example: http://192.168.99.101:4041/fossil/trilobite```", response = Fossil.class, tags = {"Fossil",})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully fetched a fossil", response = Fossil.class),
            @ApiResponse(code = 404, message = "The fossil was not found")})
    @RequestMapping(value = "/fossil/{name}",
            produces = {"application/json", "text/html"},
            method = RequestMethod.GET)
    ResponseEntity<Fossil> fossilNameGet(@ApiParam(value = "Name of the fossil", required = true) @PathVariable("name") String name);


    @ApiOperation(value = "", nickname = "fossilNameImageGet", notes = "Fetch fossil image with passed name ```Example: http://192.168.99.101:4041/fossil/trilobite/image```", response = String.class, tags = {"Fossil",})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully fetched the fossil image", response = String.class),
            @ApiResponse(code = 404, message = "The fossil was not found")})
    @RequestMapping(value = "/fossil/{name}/image",
            produces = {"text/plain", "text/html"},
            method = RequestMethod.GET)
    ResponseEntity<String> fossilNameImageGet(@ApiParam(value = "Name of the fossil", required = true) @PathVariable("name") String name);

}
