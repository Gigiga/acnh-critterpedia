package com.acnh.critterpedia.repository;

import com.acnh.critterpedia.model.Fish;
import org.springframework.data.repository.CrudRepository;

public interface FishRepository extends CrudRepository<Fish, String> {
}
