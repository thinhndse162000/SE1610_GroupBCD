package com.bcd.ejournal.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bcd.ejournal.domain.entity.Invoice;

@Repository
public interface InvoiceRepository extends CrudRepository<Invoice, Integer>{

}
