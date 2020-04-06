package com.acnh.critterpedia.configuration;

import com.acnh.critterpedia.datagrabber.extractor.FossilExtractor;
import com.acnh.critterpedia.model.Fossil;
import com.acnh.critterpedia.repository.FossilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FossilImportRunner implements CommandLineRunner {

    @Autowired
    FossilExtractor extractor;

    @Autowired
    FossilRepository fossilRepository;

    @Override
    public void run(String... args) throws Exception {
        List<Fossil> fossils = extractor.extract();
        fossilRepository.saveAll(fossils);
    }
}