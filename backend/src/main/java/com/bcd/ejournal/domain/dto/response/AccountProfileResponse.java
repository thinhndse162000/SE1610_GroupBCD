package com.bcd.ejournal.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountProfileResponse {
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private String organization;
    private Date dateOfBirth;
    private String slug;
}
