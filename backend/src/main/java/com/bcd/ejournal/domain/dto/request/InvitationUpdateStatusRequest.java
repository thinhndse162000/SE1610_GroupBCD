package com.bcd.ejournal.domain.dto.request;

import com.bcd.ejournal.domain.enums.InvitationStatus;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class InvitationUpdateStatusRequest {
    @NotNull(message = "Status must not be blank")
    private InvitationStatus status;
}
