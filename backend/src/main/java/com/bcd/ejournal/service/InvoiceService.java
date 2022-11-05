package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.response.InvoiceResponse;

public interface InvoiceService {
	void createInvoice(double amount,String method, Integer accountId, Integer journalId);
	
	List<InvoiceResponse> getInvoicebyId(Integer AccountId); 
}
