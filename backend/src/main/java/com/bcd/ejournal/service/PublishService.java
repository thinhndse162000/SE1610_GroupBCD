package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.response.PublishResponse;

public interface PublishService {
    List<PublishResponse> getPublishFromJournal(Integer journalId);

    PublishResponse getPublish(Integer publishId);
}
