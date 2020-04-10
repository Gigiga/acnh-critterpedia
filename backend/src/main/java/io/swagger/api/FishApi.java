/**
 * NOTE: This class is auto generated by the swagger code generator program (2.4.13).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package io.swagger.api;

import io.swagger.annotations.*;
import io.swagger.model.Fish;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-10T10:14:14.149Z")

@Api(value = "fish", description = "the fish API")
@RequestMapping(value = "")
public interface FishApi {

    @ApiOperation(value = "", nickname = "fishGet", notes = "Fetch all fishes ```Example: http://192.168.99.101:4041/fish```", response = Fish.class, responseContainer = "List", tags = {"Fish",})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully fetched all fishes", response = Fish.class, responseContainer = "List")})
    @RequestMapping(value = "/fish",
            produces = {"application/json"},
            method = RequestMethod.GET)
    ResponseEntity<List<Fish>> fishGet();


    @ApiOperation(value = "", nickname = "fishNameGet", notes = "Fetch fish with passed name ```Example: http://192.168.99.101:4041/fish/bass```", response = Fish.class, tags = {"Fish",})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully fetched a fish", response = Fish.class),
            @ApiResponse(code = 404, message = "The fish was not found")})
    @RequestMapping(value = "/fish/{name}",
            produces = {"application/json", "text/html"},
            method = RequestMethod.GET)
    ResponseEntity<Fish> fishNameGet(@ApiParam(value = "Name of the fish", required = true) @PathVariable("name") String name);


    @ApiOperation(value = "", nickname = "fishNameImageGet", notes = "Fetch fish image with passed name ```Example: http://192.168.99.101:4041/fish/bass/image```", response = String.class, tags = {"Fish",})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully fetched the fish image", response = String.class),
            @ApiResponse(code = 404, message = "The fish was not found")})
    @RequestMapping(value = "/fish/{name}/image",
            produces = {"text/plain", "text/html"},
            method = RequestMethod.GET)
    ResponseEntity<String> fishNameImageGet(@ApiParam(value = "Name of the fish", required = true) @PathVariable("name") String name);

}
