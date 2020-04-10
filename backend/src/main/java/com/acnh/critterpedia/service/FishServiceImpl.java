package com.acnh.critterpedia.service;

import com.acnh.critterpedia.repository.FishRepository;
import io.swagger.api.NotFoundException;
import io.swagger.model.CatchHour;
import io.swagger.model.CatchTime;
import io.swagger.model.Fish;
import io.swagger.model.Months;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FishServiceImpl implements FishService {

    @Autowired
    private FishRepository repository;

    @Override
    public List<Fish> getFish() {
        List<Fish> fishes = new ArrayList<>();
        repository.findAll().forEach(fish -> {
            Fish out = mapFish(fish);
            fishes.add(out);
        });

        return fishes;
    }

    @Override
    public Fish getFish(String name) throws NotFoundException {
        Optional<com.acnh.critterpedia.model.Fish> fish = repository.findById(name);

        if (!fish.isPresent()) {
            throw new NotFoundException(404, "The fish " + name + " was not found");
        }

        return mapFish(fish.get());
    }

    private Fish mapFish(com.acnh.critterpedia.model.Fish input) {
        Fish output = new Fish();
        output.setName(input.getName());
        output.setImage(input.getImage());
        output.setPrice(input.getPrice());
        output.setLocation(Fish.LocationEnum.fromValue(input.getLocation().getValue()));
        output.setCatchTime(mapCatchTime(input.getCatchTime()));
        output.setShadowSize(Fish.ShadowSizeEnum.fromValue(input.getShadowSize().getValue()));

        return output;
    }

    private CatchTime mapCatchTime(com.acnh.critterpedia.model.CatchTime input) {
        CatchTime output = new CatchTime();
        output.setCatchHours(mapCatchHours(input.getCatchHours()));
        output.setNorthernHemisphereMonths(mapMonth(input.getNorthernHemisphereMonths()));
        output.setSouthernHemisphereMonths(mapMonth(input.getSouthernHemisphereMonths()));

        return output;
    }

    private List<CatchHour> mapCatchHours(List<com.acnh.critterpedia.model.CatchHour> catchHours) {
        return catchHours.stream().map(catchHour -> {
            CatchHour ch = new CatchHour();
            ch.setStartHour(catchHour.getStartHour());
            ch.setEndHour(catchHour.getEndHour());
            return ch;
        }).collect(Collectors.toList());
    }

    private List<Months> mapMonth(List<com.acnh.critterpedia.model.Months> input) {
        List<Months> output = new ArrayList<>();
        input.stream().forEach(month -> {
            Months months = new Months();
            months.setName(month.getName());
            output.add(months);
        });

        return output;
    }

    @Override
    public String getImage(String name) throws NotFoundException {
        Optional<com.acnh.critterpedia.model.Fish> fish = repository.findById(name);

        if (!fish.isPresent()) {
            throw new NotFoundException(404, "The fish " + name + " was not found");
        }

        return fish.get().getLargeImage();
    }
}
