package com.bcd.ejournal.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdatePaperRequest;
import com.bcd.ejournal.domain.dto.response.PaperUpdatepaperRespone;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.exception.PaperException;
import com.bcd.ejournal.message.MessageConstant;
import com.bcd.ejournal.repository.PaperRepository;
import com.bcd.ejournal.service.PaperService;

@Service
public class PaperServiceImp implements PaperService {
	@Autowired //auto new instance
	private PaperRepository paperRepository;
	@Override
	public void submitPaper(PaperSubmitRequest submitRequest ) throws PaperException {
		// TODO Auto-generated method stub
		Paper paper = new Paper(submitRequest);
		try {
			paperRepository.save(paper);
			
		} catch (Exception e) {
			throw new PaperException(HttpStatus.BAD_REQUEST, MessageConstant.PAPER_ERROR_FORMAT, "E001");
		}
		
	}
	@Override
	public PaperUpdatepaperRespone updateSubmitPaper(Integer Id, PaperUpdatePaperRequest req) {
		
		return null;
	}
	@Override
	public PaperUpdatepaperRespone findById() {
		// TODO Auto-generated method stub
		return null;
	}

}