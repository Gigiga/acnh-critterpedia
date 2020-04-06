package com.acnh.critterpedia.configuration;

import com.acnh.critterpedia.datagrabber.extractor.FishExtractor;
import com.acnh.critterpedia.model.Fish;
import com.acnh.critterpedia.repository.FishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FishImportRunner implements CommandLineRunner {

    @Autowired
    FishExtractor extractor;

    @Autowired
    FishRepository fishRepository;

    @Override
    public void run(String... args) throws Exception {
        List<Fish> fish = extractor.extract();
        fishRepository.saveAll(fish);
    }
}