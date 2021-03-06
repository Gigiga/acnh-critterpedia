package com.acnh.critterpedia.api;

import com.acnh.critterpedia.service.FossilService;
import io.swagger.annotations.ApiParam;
import io.swagger.api.FossilApi;
import io.swagger.api.NotFoundException;
import io.swagger.model.Fossil;
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
public class FossilApiController implements FossilApi {

    private static final Logger log = LoggerFactory.getLogger(FossilApiController.class);

    private final HttpServletRequest request;

    @Autowired
    private FossilService service;

    @org.springframework.beans.factory.annotation.Autowired
    public FossilApiController(HttpServletRequest request) {
        this.request = request;
    }

    public ResponseEntity<List<Fossil>> fossilGet() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            return new ResponseEntity<List<Fossil>>(service.getFossil(), HttpStatus.ACCEPTED);
        }

        return new ResponseEntity<List<Fossil>>(HttpStatus.NOT_IMPLEMENTED);
    }

    public ResponseEntity<Fossil> fossilNameGet(@ApiParam(value = "Name of the fossil", required = true) @PathVariable("name") String name) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<Fossil>(service.getFossil(name), HttpStatus.ACCEPTED);
            } catch (NotFoundException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        return new ResponseEntity<Fossil>(HttpStatus.NOT_IMPLEMENTED);
    }

    @Override
    public ResponseEntity<String> fossilNameImageGet(@ApiParam(value = "Name of the fossil", required = true) @PathVariable("name") String name) {
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
