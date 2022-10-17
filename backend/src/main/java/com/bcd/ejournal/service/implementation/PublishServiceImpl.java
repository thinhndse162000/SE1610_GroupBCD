package com.bcd.ejournal.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.domain.entity.Publish;
import com.bcd.ejournal.domain.enums.PublishAccessLevel;
import com.bcd.ejournal.domain.exception.MethodNotAllowedException;
import com.bcd.ejournal.repository.JournalRepository;
import com.bcd.ejournal.repository.PublishRepository;
import com.bcd.ejournal.service.PublishService;
import com.bcd.ejournal.utils.DTOMapper;

@Service
public class PublishServiceImpl implements PublishService {
    private final JournalRepository journalRepository;
    private final PublishRepository publishRepository;
    private final ModelMapper modelMapper;
    private final DTOMapper dtoMapper;

    @Autowired
    public PublishServiceImpl(JournalRepository journalRepository, PublishRepository publishRepository, ModelMapper modelMapper, DTOMapper dtoMapper) {
        this.journalRepository = journalRepository;
        this.publishRepository = publishRepository;
        this.modelMapper = modelMapper;
        this.dtoMapper = dtoMapper;
    }

    @Override
    public PublishResponse getPublish(Integer publishId) {
        Publish publish = publishRepository.findById(publishId)
            .orElseThrow(() -> new NullPointerException("Publish not found. Id: " + publishId));

        return dtoMapper.toPublishResponse(publish);
    }

    @Override
    public List<PublishResponse> getPublishFromJournal(Integer journalId) {
        List<Publish> publishes = publishRepository.findByJournalId(journalId);

        return publishes.stream()
            .map(dtoMapper::toPublishResponse)
            .collect(Collectors.toList());
    }

    @Override
    public List<PublishResponse> getPublishFromJournal(String slug) {
        List<Publish> publishes = publishRepository.findByJournalSlug(slug);

        return publishes.stream()
            .map(dtoMapper::toPublishResponse)
            .collect(Collectors.toList());
    }

    @Override
    public List<PublishResponse> getPublishFromAuthor(Integer authorId) {
        List<Publish> publishes = publishRepository.findByAuthorId(authorId);

        return publishes.stream()
            .map(dtoMapper::toPublishResponse)
            .collect(Collectors.toList());
    }

    @Override
    public List<PublishResponse> getPublishFromAuthor(String slug) {
        List<Publish> publishes = publishRepository.findByAuthorSlug(slug);

        return publishes.stream()
            .map(dtoMapper::toPublishResponse)
            .collect(Collectors.toList());
    }

    @Override
    public PublishResponse updateAccessLevel(Integer accountId, Integer publishId, PublishAccessLevel accessLevel) {
        Publish publish = publishRepository.findById(publishId)
            .orElseThrow(() -> new NullPointerException("Publish not found. Id" + publishId));

        // Authorization
        if (accountId != publish.getPaper().getJournal().getManager().getAccountId()) {
            throw new MethodNotAllowedException("Account not allow to modify publish. AccountId: " + accountId);
        }

        publish.setAccessLevel(accessLevel);
        publishRepository.save(publish);
        return dtoMapper.toPublishResponse(publish);
    }
}
