package com.bcd.ejournal.service;

import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.springframework.core.io.Resource;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdateRequest;
import com.bcd.ejournal.domain.dto.response.PagingResponse;
import com.bcd.ejournal.domain.dto.response.PaperDetailResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.enums.PaperStatus;

public interface PaperService {
    void submitPaper(Integer authorId, PaperSubmitRequest paperSubmitRequest) throws InvalidPasswordException, IOException;

    void updatePaper(Integer accountId, Integer paperId, PaperUpdateRequest request);

    void deleteById(Integer paperId);

    void managerUpdatePaperStatus(Integer accountId, Integer paperId, PaperStatus status);

    void managerBulkUpdatePaperStatus(Integer accountId, List<Integer> paperIds, PaperStatus status);

    PagingResponse searchByRequest(PaperSearchRequest request);

    List<PaperResponse> getAllPaperFromAuthor(Integer authorId);

    List<PaperResponse> getAllPaperFromJournal(Integer journalId);

    PaperDetailResponse getPaper(Integer paperId);

    Resource downloadFile(Integer paperId) throws IOException;

    void cleanDuePaper();
}
