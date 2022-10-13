package com.bcd.ejournal.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.domain.entity.Field;
import com.bcd.ejournal.repository.FieldRepository;
import com.bcd.ejournal.service.UtilService;

@Service
public class UtilServiceImpl implements UtilService {
    private final FieldRepository fieldRepository;

    @Autowired
    public UtilServiceImpl(FieldRepository fieldRepository) {
        this.fieldRepository = fieldRepository;
    }

    @Override
    public List<Field> getFields() {
        return fieldRepository.findAll();
    }

    @Override
    public List<Field> getFieldsByIdList(List<Integer> fieldId) {
        return fieldRepository.findAllByFieldIdIn(fieldId);
    }
}
