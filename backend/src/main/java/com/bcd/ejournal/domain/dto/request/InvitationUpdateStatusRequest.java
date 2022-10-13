package com.bcd.ejournal.domain.dto.request;

import com.bcd.ejournal.domain.enums.InvitationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InvitationUpdateStatusRequest {
    @NotNull(message = "Status must not be blank")
    private InvitationStatus status;
}
