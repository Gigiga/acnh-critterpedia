package com.acnh.critterpedia.configuration;

import com.acnh.critterpedia.service.TurnipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TurnipGeneratorRunner implements CommandLineRunner {
    @Autowired
    TurnipService turnipService;

    @Override
    public void run(String... args) throws Exception {
        turnipService.pregeneratePatterns();
    }
}