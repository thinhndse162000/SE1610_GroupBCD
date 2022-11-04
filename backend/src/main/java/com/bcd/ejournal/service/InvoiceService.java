package com.bcd.ejournal.service;

public interface InvoiceService {
	void createInvoice(double amount,String method, Integer accountId, Integer journalId);
}
