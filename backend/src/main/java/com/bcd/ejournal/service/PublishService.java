package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.request.PublishSearchFilterRequest;
import com.bcd.ejournal.domain.dto.response.PagingResponse;
import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.domain.enums.PublishAccessLevel;

public interface PublishService {
    List<PublishResponse> getPublishFromJournal(Integer journalId);

    List<PublishResponse> getPublishFromJournal(String slug);

    List<PublishResponse> getPublishFromAuthor(Integer authorId);

    List<PublishResponse> getPublishFromAuthor(String slug);

    PublishResponse getPublish(Integer publishId);

    PublishResponse updateAccessLevel(Integer accountId, Integer publishId, PublishAccessLevel accessLevel);

    PagingResponse searchByFilter(PublishSearchFilterRequest req);
}
