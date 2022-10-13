package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdateRequest;
import com.bcd.ejournal.domain.dto.response.PaperDetailResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import org.springframework.core.io.Resource;

<<<<<<< HEAD
=======
import java.io.IOException;
import java.util.List;

>>>>>>> fa7bc9628dcf3d0fa2ef64cf90a8ecb9602c3fb0

public interface PaperService {
    void submitPaper(Integer authorId, PaperSubmitRequest paperSubmitRequest);

    void updatePaper(Integer paperId, PaperUpdateRequest request);

    void deleteById(Integer paperId);

    List<PaperResponse> searchByRequest(PaperSearchRequest paperSearchRequest);

    List<PaperResponse> getAllPaperFromAuthor(Integer authorId);

    List<PaperResponse> getAllPaperFromJournal(Integer journalId);

    PaperDetailResponse getPaper(Integer paperId);

    Resource downloadFile(Integer paperId) throws IOException;
}
