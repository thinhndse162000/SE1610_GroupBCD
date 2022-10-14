package com.bcd.ejournal.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.entity.Field;

public interface FieldRepository extends CrudRepository<Field, Integer> {
    List<Field> findAll();

    List<Field> findAllByFieldIdIn(List<Integer> fieldId);
}
