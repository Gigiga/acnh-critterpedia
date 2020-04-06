package com.acnh.critterpedia.service;

import com.acnh.critterpedia.repository.FossilRepository;
import io.swagger.api.NotFoundException;
import io.swagger.model.Fossil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FossilServiceImpl implements FossilService {

    @Autowired
    private FossilRepository repository;

    @Override
    public List<Fossil> getFossil() {
        List<Fossil> fossils = new ArrayList<>();
        repository.findAll().forEach(fossil -> {
            Fossil out = mapFossil(fossil);
            fossils.add(out);
        });

        return fossils;
    }

    @Override
    public Fossil getFossil(String name) throws NotFoundException {
        Optional<com.acnh.critterpedia.model.Fossil> fossil = repository.findById(name);

        if (!fossil.isPresent()) {
            throw new NotFoundException(404, "The fossil " + name + " was not found");
        }

        return mapFossil(fossil.get());
    }

    private Fossil mapFossil(com.acnh.critterpedia.model.Fossil input) {
        Fossil output = new Fossil();
        output.setName(input.getName());
        output.setImage(input.getImage());
        output.setPrice(input.getPrice());

        return output;
    }
}
