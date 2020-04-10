package com.acnh.critterpedia.api;

import com.acnh.critterpedia.service.TurnipService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiParam;
import io.swagger.api.TurnipPatternApi;
import io.swagger.model.CalculationRequest;
import io.swagger.model.TurnipPatternMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2020-04-10T16:36:46.244Z")

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TurnipPatternApiController implements TurnipPatternApi {
    @Autowired
    TurnipService service;

    private static final Logger log = LoggerFactory.getLogger(TurnipPatternApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public TurnipPatternApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<TurnipPatternMap> turnipPatternPost(@ApiParam(value = "Turnip pattern calculation request", required = true) @Valid @RequestBody CalculationRequest calculationRequest) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            return new ResponseEntity<TurnipPatternMap>(service.getPossiblePatterns(calculationRequest), HttpStatus.CREATED);
        }
        
        return new ResponseEntity<TurnipPatternMap>(HttpStatus.NOT_IMPLEMENTED);
    }

}
