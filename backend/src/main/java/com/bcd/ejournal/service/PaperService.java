package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdateRequest;
import com.bcd.ejournal.domain.dto.response.PaperResponse;

import java.util.List;


public interface PaperService {
    void submitPaper(Integer authorID, PaperSubmitRequest paperSubmitRequest);

    void updatePaper(Integer paperID, PaperUpdateRequest request);

    void deleteById(Integer paperID);

    List<PaperResponse> searchByRequest(PaperSearchRequest paperSearchRequest);

    List<PaperResponse> getAllPaperFromAuthor(Integer authorID);

    List<PaperResponse> getAllPaperFromJournal(Integer journalID);
}