package io.swagger.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiParam;
import io.swagger.model.Bug;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-05T12:35:19.500Z")

@Controller
public class BugApiController implements BugApi {

    private static final Logger log = LoggerFactory.getLogger(BugApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public BugApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<Bug>> bugGet() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<List<Bug>>(objectMapper.readValue("[ {  \"image\" : \"image\",  \"catchTime\" : {    \"endHour\" : 16,    \"startHour\" : 12,    \"southernHemisphereMonths\" : [ null, null ],    \"northernHemisphereMonths\" : [ { }, { } ]  },  \"price\" : 200,  \"name\" : \"Ladybug\",  \"locations\" : [ \"FLYING\", \"FLYING\" ]}, {  \"image\" : \"image\",  \"catchTime\" : {    \"endHour\" : 16,    \"startHour\" : 12,    \"southernHemisphereMonths\" : [ null, null ],    \"northernHemisphereMonths\" : [ { }, { } ]  },  \"price\" : 200,  \"name\" : \"Ladybug\",  \"locations\" : [ \"FLYING\", \"FLYING\" ]} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<Bug>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<Bug>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Bug> bugNameGet(@ApiParam(value = "Name of the bug", required = true) @PathVariable("name") String name) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<Bug>(objectMapper.readValue("{  \"image\" : \"image\",  \"catchTime\" : {    \"endHour\" : 16,    \"startHour\" : 12,    \"southernHemisphereMonths\" : [ null, null ],    \"northernHemisphereMonths\" : [ { }, { } ]  },  \"price\" : 200,  \"name\" : \"Ladybug\",  \"locations\" : [ \"FLYING\", \"FLYING\" ]}", Bug.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<Bug>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<Bug>(HttpStatus.NOT_IMPLEMENTED);
    }

}
