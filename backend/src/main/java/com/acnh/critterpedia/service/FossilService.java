package com.acnh.critterpedia.service;


import io.swagger.api.NotFoundException;
import io.swagger.model.Fossil;

import java.util.List;

public interface FossilService {

    List<Fossil> getFossil();

    Fossil getFossil(String name) throws NotFoundException;

    String getImage(String name) throws NotFoundException;
}
