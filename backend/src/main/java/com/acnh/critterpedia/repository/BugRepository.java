package com.acnh.critterpedia.repository;

import com.acnh.critterpedia.model.Bug;
import org.springframework.data.repository.CrudRepository;

public interface BugRepository extends CrudRepository<Bug, String> {

}
