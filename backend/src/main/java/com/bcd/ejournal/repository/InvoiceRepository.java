package com.bcd.ejournal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bcd.ejournal.domain.entity.Invoice;

@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Integer>{
    @Query("SELECT i FROM Invoice i JOIN i.account a JOIN i.journal j WHERE a.accountId = :accountId AND j.journalId = :journalId")
    Page<Invoice> findFirstByAccountIdAndJournalId(Integer accountId, Integer journalId, Pageable pageable);

    @Query("SELECT i FROM Invoice i JOIN i.account a JOIN i.journal j WHERE a.accountId = :accountId AND j.slug = :slug")
    Page<Invoice> findFirstByAccountIdAndSlug(Integer accountId, String slug, Pageable pageable);
	
	@Query("SELECT i FROM Invoice i WHERE AccountId = :accountId")
	Iterable<Invoice> getInvoiceByAccountId( Integer accountId);
}
