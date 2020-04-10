package com.acnh.critterpedia.service;

import com.acnh.critterpedia.repository.BugRepository;
import io.swagger.api.NotFoundException;
import io.swagger.model.Bug;
import io.swagger.model.CatchHour;
import io.swagger.model.CatchTime;
import io.swagger.model.Months;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BugServiceImpl implements BugService {

    @Autowired
    private BugRepository repository;

    @Override
    public List<Bug> getBug() {
        List<Bug> bugs = new ArrayList<>();
        repository.findAll().forEach(bug -> {
            Bug out = mapBug(bug);
            bugs.add(out);
        });

        return bugs;
    }

    @Override
    public Bug getBug(String name) throws NotFoundException {
        Optional<com.acnh.critterpedia.model.Bug> bug = repository.findById(name);

        if (!bug.isPresent()) {
            throw new NotFoundException(404, "The bug " + name + " was not found");
        }

        return mapBug(bug.get());
    }

    private Bug mapBug(com.acnh.critterpedia.model.Bug input) {
        Bug output = new Bug();
        output.setName(input.getName());
        output.setImage(input.getImage());
        output.setPrice(input.getPrice());
        output.setLocation(Bug.LocationEnum.fromValue(input.getLocation().getValue()));
        output.setCatchTime(mapCatchTime(input.getCatchTime()));

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
        Optional<com.acnh.critterpedia.model.Bug> bug = repository.findById(name);

        if (!bug.isPresent()) {
            throw new NotFoundException(404, "The bug " + name + " was not found");
        }

        return bug.get().getLargeImage();

    }
}
