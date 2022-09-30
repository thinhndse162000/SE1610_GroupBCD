package com.bcd.ejournal.api;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdateRequest;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.service.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/paper")
public class PaperApi {
    private final PaperService paperService;

    @Autowired
    public PaperApi(PaperService paperService) {
        this.paperService = paperService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> submitPaper(@AuthenticationPrincipal AccountJWTPayload payload, @ModelAttribute PaperSubmitRequest request) {
        paperService.submitPaper(payload.getAccountID(), request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updatePaper(@PathVariable(name = "id") Integer paperID, @ModelAttribute PaperUpdateRequest request) {
        paperService.updatePaper(paperID, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<List<PaperResponse>> search(@RequestBody PaperSearchRequest request) {
        List<PaperResponse> rs = paperService.searchByRequest(request);
        return ResponseEntity.ok(rs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaperById(@PathVariable(name = "id") Integer paperID) {
        paperService.deleteById(paperID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaperResponse> getPaper(@PathVariable(name = "id") Integer paperID) {
        // TODO: author or reviewer or journal
        PaperResponse response = paperService.getPaper(paperID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
