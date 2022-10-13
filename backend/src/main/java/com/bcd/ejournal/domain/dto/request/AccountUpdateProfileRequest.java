package com.bcd.ejournal.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountUpdateProfileRequest {
    @NotBlank(message = "Phone number must not be blank")
    private String phone;
    @NotBlank(message = "First name must not be blank")
    private String firstName;
    @NotBlank(message = "Last name must not be blank")
    private String lastName;
    @NotBlank(message = "Organization must not be blank")
    private String organization;
    @NotNull(message = "Date of birth must not be blank")
    private Date dateOfBirth;
}
