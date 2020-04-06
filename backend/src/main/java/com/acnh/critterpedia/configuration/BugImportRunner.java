package com.acnh.critterpedia.configuration;

import com.acnh.critterpedia.datagrabber.extractor.BugExtractor;
import com.acnh.critterpedia.model.Bug;
import com.acnh.critterpedia.repository.BugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BugImportRunner implements CommandLineRunner {

    @Autowired
    BugExtractor extractor;

    @Autowired
    BugRepository bugRepository;

    @Override
    public void run(String... args) throws Exception {
        List<Bug> bugs = extractor.extract();
        bugRepository.saveAll(bugs);
    }
}
