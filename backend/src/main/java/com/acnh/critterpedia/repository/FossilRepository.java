package com.acnh.critterpedia.repository;

import com.acnh.critterpedia.model.Fossil;
import org.springframework.data.repository.CrudRepository;

public interface FossilRepository extends CrudRepository<Fossil, String> {
}
