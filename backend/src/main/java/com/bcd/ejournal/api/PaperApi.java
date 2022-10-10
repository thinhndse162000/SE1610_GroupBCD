package com.bcd.ejournal.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdateRequest;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.service.PaperService;


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

    // FIXME: change to PUT
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updatePaper(@PathVariable(name = "id") Integer paperID, @ModelAttribute PaperUpdateRequest request) {
        // TODO: verify right account
        paperService.updatePaper(paperID, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // TODO: specify which role will use this
    @PostMapping("/search")
    public ResponseEntity<List<Paper>> search(@RequestBody PaperSearchRequest request) {
        List<Paper> rs = paperService.searchByRequest(request);
        return ResponseEntity.ok(rs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaperById(@PathVariable(name = "id") Integer paperID) {
        // TODO: verify right account
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
