package com.bcd.ejournal.domain.dto.request;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JournalSubscribeResponse {
    private Boolean subscribed;
    private Timestamp endDate;
}
