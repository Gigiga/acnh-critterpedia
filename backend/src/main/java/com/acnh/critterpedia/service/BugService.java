package com.acnh.critterpedia.service;


import io.swagger.api.NotFoundException;
import io.swagger.model.Bug;

import java.util.List;

public interface BugService {

    List<Bug> getBug();

    Bug getBug(String name) throws NotFoundException;

    String getImage(String name) throws NotFoundException;
}
