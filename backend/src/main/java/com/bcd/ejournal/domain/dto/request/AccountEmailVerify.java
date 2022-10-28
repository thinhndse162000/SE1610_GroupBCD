package com.bcd.ejournal.domain.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountEmailVerify {
	@Email(message = "Email is not valid")
    @NotBlank(message = "Email cannot be blank")
    private String email;
}
