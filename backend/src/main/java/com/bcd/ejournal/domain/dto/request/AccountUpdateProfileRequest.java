package com.bcd.ejournal.domain.dto.request;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountUpdateProfileRequest {
    @NotBlank(message = "Phone number must not be blank")
    private String phone;
    @NotBlank(message = "Organization must not be blank")
    private String organization;
}
