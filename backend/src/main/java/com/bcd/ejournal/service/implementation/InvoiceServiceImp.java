package com.bcd.ejournal.service.implementation;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.domain.dto.response.InvoiceResponse;
import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.domain.entity.Invoice;
import com.bcd.ejournal.domain.entity.Journal;
import com.bcd.ejournal.repository.AccountRepository;
import com.bcd.ejournal.repository.InvoiceRepository;
import com.bcd.ejournal.repository.JournalRepository;
import com.bcd.ejournal.service.InvoiceService;
import com.bcd.ejournal.utils.DTOMapper;

@Service
public class InvoiceServiceImp implements InvoiceService{
	
	@Autowired
	private InvoiceRepository invoiceRepository;
	
	@Autowired
	private JournalRepository journalRepository;
	
	@Autowired
	private DTOMapper dtoMapper;
	
	@Autowired
	private AccountRepository accountRepository;

	@Override
	public void createInvoice(double amount,String method, Integer accountId, Integer journalId) {
		Invoice invoice = new Invoice();
		Journal journal = journalRepository.findById(journalId)
				.orElseThrow(() -> new NullPointerException("Journal not found. Id: " + journalId));
		Account account = accountRepository.findById(accountId)
				.orElseThrow(() -> new NullPointerException("Account not found. Id: " + accountId));
		invoice.setAccount(account);
		invoice.setJournal(journal);
		invoice.setPaymentTime(new Timestamp(System.currentTimeMillis()));
		invoice.setEndDate(new Timestamp(System.currentTimeMillis()));
		invoice.setAmount(amount);
		invoice.setPaymentMethod(method);
		invoiceRepository.save(invoice);
	}

	@Override
	public void createInvoice(double amount,String method, Integer accountId, String slug) {
		Invoice invoice = new Invoice();
		Journal journal = journalRepository.findBySlug(slug)
				.orElseThrow(() -> new NullPointerException("Journal not found. Slug: " + slug));
		Account account = accountRepository.findById(accountId)
				.orElseThrow(() -> new NullPointerException("Account not found. Id: " + accountId));

		invoice.setAccount(account);
		invoice.setJournal(journal);
		invoice.setPaymentTime(new Timestamp(System.currentTimeMillis()));

        Pageable pageable = PageRequest.of(0, 1, Sort.by("endDate").descending());
        List<Invoice> invoiceList = invoiceRepository.findFirstByAccountIdAndSlug(accountId, slug, pageable).getContent();
        Invoice latestInvoice = null;
        if (invoiceList.size() != 0) {
            latestInvoice = invoiceList.get(0);
        }

        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        if (latestInvoice == null || latestInvoice.getEndDate().before(currentTime)) {
            // One year
            invoice.setEndDate(new Timestamp(System.currentTimeMillis() + (long) 365*24*60*60*1000));
        } else {
            invoice.setEndDate(new Timestamp(latestInvoice.getEndDate().getTime() + (long) 365*24*60*60*1000));
        }

		invoice.setAmount(amount);
		invoice.setPaymentMethod(method);
		invoiceRepository.save(invoice);
	}

    @Override
    public Invoice getLatestInvoice(Integer accountId, Integer journalId) {
        Pageable pageable = PageRequest.of(0, 1, Sort.by("endDate").descending());
        List<Invoice> invoiceList = invoiceRepository.findFirstByAccountIdAndJournalId(accountId, journalId, pageable).getContent();
        if (invoiceList.size() != 0) {
            return invoiceList.get(0);
        }

        return null;
    }

    @Override
    public Invoice getLatestInvoice(Integer accountId, String slug) {
        Pageable pageable = PageRequest.of(0, 1, Sort.by("endDate").descending());
        List<Invoice> invoiceList = invoiceRepository.findFirstByAccountIdAndSlug(accountId, slug, pageable).getContent();
        if (invoiceList.size() != 0) {
            return invoiceList.get(0);
        }

        return null;
    }

	@Override
	public List<InvoiceResponse> getInvoicebyId(Integer AccountId) {
		Iterable<Invoice> invoice = invoiceRepository.getInvoiceByAccountId(AccountId);
		return StreamSupport.stream(invoice.spliterator(), false).map(dtoMapper::toInvoiceResponse)
                .collect(Collectors.toList());
	}
}
