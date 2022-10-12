package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.response.PublishResponse;

public interface PublishService {
    List<PublishResponse> getPublishFromJournal(Integer journalId);

    List<PublishResponse> getPublishFromAuthor(Integer authorId);

    List<PublishResponse> getPublishFromAuthor(String slug);

    PublishResponse getPublish(Integer publishId);
}
