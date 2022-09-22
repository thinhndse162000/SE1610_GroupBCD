package com.bcd.ejournal.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountUpdateProfileRequest {
    // TODO: Validation and
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
