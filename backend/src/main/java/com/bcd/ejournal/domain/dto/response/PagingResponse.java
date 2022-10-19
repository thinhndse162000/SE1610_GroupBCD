package com.bcd.ejournal.domain.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PagingResponse {
    private List<Object> result;
    private Long totalFound;
    private Integer numOfPage;
}
