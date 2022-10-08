package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdateRequest;
import com.bcd.ejournal.domain.dto.response.PaperDetailResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;


public interface PaperService {
    void submitPaper(Integer authorId, PaperSubmitRequest paperSubmitRequest);

    void updatePaper(Integer accountId, Integer paperId, PaperUpdateRequest request);

    void deleteById(Integer paperId);

    List<PaperResponse> searchByRequest(PaperSearchRequest paperSearchRequest);

    List<PaperResponse> getAllPaperFromAuthor(Integer authorId);

    List<PaperResponse> getAllPaperFromJournal(Integer journalId);

    PaperDetailResponse getPaper(Integer paperId);

    Resource downloadFile(Integer paperId) throws IOException;
}
