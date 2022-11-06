package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.response.InvoiceResponse;
import com.bcd.ejournal.domain.entity.Invoice;

public interface InvoiceService {
    void createInvoice(double amount, String method, Integer accountId, Integer journalId);

    void createInvoice(double amount, String method, Integer accountId, String slug);

    Invoice getLatestInvoice(Integer accountId, Integer journalId);

    Invoice getLatestInvoice(Integer accountId, String slug);

    List<InvoiceResponse> getInvoicebyId(Integer AccountId);
}
