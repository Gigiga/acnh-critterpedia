package com.acnh.critterpedia.service;


import io.swagger.api.NotFoundException;
import io.swagger.model.Fish;

import java.util.List;

public interface FishService {

    List<Fish> getFish();

    Fish getFish(String name) throws NotFoundException;
}
