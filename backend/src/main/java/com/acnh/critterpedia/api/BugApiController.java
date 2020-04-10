package com.acnh.critterpedia.api;

import com.acnh.critterpedia.service.BugService;
import io.swagger.annotations.ApiParam;
import io.swagger.api.BugApi;
import io.swagger.api.NotFoundException;
import io.swagger.model.Bug;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-05T12:35:19.500Z")

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BugApiController implements BugApi {

    private static final Logger log = LoggerFactory.getLogger(BugApiController.class);

    private final HttpServletRequest request;

    @Autowired
    private BugService service;

    @org.springframework.beans.factory.annotation.Autowired
    public BugApiController(HttpServletRequest request) {
        this.request = request;
    }

    public ResponseEntity<List<Bug>> bugGet() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            return new ResponseEntity<List<Bug>>(service.getBug(), HttpStatus.ACCEPTED);
        }

        return new ResponseEntity<List<Bug>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Bug> bugNameGet(@ApiParam(value = "Name of the bug", required = true) @PathVariable("name") String name) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<Bug>(service.getBug(name), HttpStatus.ACCEPTED);
            } catch (NotFoundException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        return new ResponseEntity<Bug>(HttpStatus.NOT_IMPLEMENTED);
    }

    @Override
    public ResponseEntity<String> bugNameImageGet(@ApiParam(value = "Name of the bug", required = true) @PathVariable("name") String name) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("text/plain")) {
            try {
                return new ResponseEntity<String>(service.getImage(name), HttpStatus.ACCEPTED);
            } catch (NotFoundException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        return new ResponseEntity<String>(HttpStatus.NOT_IMPLEMENTED);
    }

}
