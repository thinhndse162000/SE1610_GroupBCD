package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.entity.Field;

public interface UtilService {
    List<Field> getFields();

    List<Field> getFieldsByIdList(List<Integer> fieldId);
}
