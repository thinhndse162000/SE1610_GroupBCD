package com.bcd.ejournal.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountSignupRequest {
    @Email(message = "Email is not valid")
    @NotBlank(message = "Email must not be blank")
    private String email;
    @NotBlank(message = "Password must not be blank")
    private String password;
    @NotBlank(message = "Retype password must not be blank")
    private String passwordRetype;
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
