package com.bcd.ejournal.domain.dto.response;

import com.bcd.ejournal.domain.enums.AccountRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountTokenResponse {
    private String fullName;
    private String token;
    private AccountRole role;
}
