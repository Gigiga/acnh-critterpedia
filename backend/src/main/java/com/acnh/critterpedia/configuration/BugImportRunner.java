package com.acnh.critterpedia.configuration;

import com.acnh.critterpedia.datagrabber.extractor.BugExtractor;
import com.acnh.critterpedia.model.Bug;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BugImportRunner implements CommandLineRunner {

    @Autowired
    BugExtractor extractor;

    @Override
    public void run(String... args) throws Exception {
        List<Bug> bugs = extractor.extract();

        for (Bug bug : bugs) {
            System.out.println(bug);
        }
    }
}
