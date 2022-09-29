package com.bcd.ejournal.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountChangePasswordRequest {
    @NotBlank(message = "Old password must not be empty")
    private String oldPassword;
    @NotBlank(message = "New password must not be empty")
    private String newPassword;
    @NotBlank(message = "Retype password must not be empty")
    private String newPasswordRetype;
}
