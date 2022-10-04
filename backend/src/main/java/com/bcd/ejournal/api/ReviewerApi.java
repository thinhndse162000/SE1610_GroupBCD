package com.bcd.ejournal.api;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.request.InvitationUpdateStatusRequest;
import com.bcd.ejournal.domain.dto.request.ReviewerInvitationRequest;
import com.bcd.ejournal.domain.dto.response.InvitationReviewerResponse;
import com.bcd.ejournal.service.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/reviewer")
public class ReviewerApi {
    private final InvitationService invitationService;

    @Autowired
    public ReviewerApi(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @PostMapping("/{id}/invitation")
    public ResponseEntity<Void> sendInvitation(@PathVariable(name = "id") Integer reviewerID, @Valid @RequestBody ReviewerInvitationRequest request) {
        // TODO: Reviewer cannot review his own paper
        // TODO: validate if reviewer is invitable
        // TODO: validate paper is not in reviewing process
        invitationService.sendInvitation(reviewerID, request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/invitation")
    public ResponseEntity<List<InvitationReviewerResponse>> listAllInvitation(@AuthenticationPrincipal AccountJWTPayload payload) {
        Integer reviewerID = payload.getAccountID();
        List<InvitationReviewerResponse> responses = invitationService.listInvitationFromReviewer(reviewerID);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PutMapping("/invitation/{id}/status")
    public ResponseEntity<Void> acceptOrRejectInvitation(@AuthenticationPrincipal AccountJWTPayload payload,
                                                                               @PathVariable(name = "id") Integer invitationID,
                                                                               @Valid @RequestBody InvitationUpdateStatusRequest request) {
        // TODO: validate if invitation is in PENDING status
        Integer reviewerID = payload.getAccountID();
        invitationService.updateStatus(reviewerID, invitationID, request.getStatus());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
