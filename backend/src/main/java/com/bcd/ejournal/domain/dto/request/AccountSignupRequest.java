package com.bcd.ejournal.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountSignupRequest {
    // TODO: Validation and messages
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String passwordRetype;
    @NotBlank
    private String phone;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String organization;
    @NotNull
    private Date dateOfBirth;
    private String profileImage;
}
