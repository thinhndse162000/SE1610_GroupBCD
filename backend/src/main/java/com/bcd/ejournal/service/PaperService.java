package com.bcd.ejournal.service;

import java.util.List;
import java.util.Optional;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdatePaperRequest;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.exception.PaperException;


public interface PaperService {
	void submitPaper(PaperSubmitRequest paperSubmitRequest) throws PaperException;
	
	void updatePaper(PaperUpdatePaperRequest req);
	
	int deleteById(int Id) throws Exception;
	
	List<Paper> searchByRequest(PaperSearchRequest paperSearchRequest);
	Optional<Paper> findById (int id);
	
}