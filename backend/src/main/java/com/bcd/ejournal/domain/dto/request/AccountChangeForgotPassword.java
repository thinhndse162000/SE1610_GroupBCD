package com.bcd.ejournal.domain.dto.request;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountChangeForgotPassword {
	@NotBlank(message = "New password must not be empty")
	private String newPassword;
	@NotBlank(message = "Retype password must not be empty")
	private String newPasswordRetype;
}
