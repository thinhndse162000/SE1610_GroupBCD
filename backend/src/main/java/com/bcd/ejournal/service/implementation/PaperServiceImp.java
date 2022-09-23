package com.bcd.ejournal.service.implementation;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdatePaperRequest;
import com.bcd.ejournal.domain.dto.response.PaperUpdatepaperRespone;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.exception.PaperException;
import com.bcd.ejournal.message.MessageConstant;
import com.bcd.ejournal.repository.PaperRepository;
import com.bcd.ejournal.service.PaperService;
import com.bcd.ejournal.utils.FileUtils;

@Service
public class PaperServiceImp implements PaperService {
	
	@Value("${paper.file.dir}")
	private String uploadDir;
	
	@Autowired // auto new instance
	private PaperRepository paperRepository;

	@Override
	public void submitPaper(PaperSubmitRequest submitRequest) throws PaperException {
		// TODO Auto-generated method stub
		Paper paper = new Paper(submitRequest);
		
		try {
			String fileName = submitRequest.getFile().getOriginalFilename();
			MultipartFile file = submitRequest.getFile();
			String filePath = uploadDir + fileName;
			paper.setLinkPDF(filePath);
			paper.setSubmitTime(new Timestamp(System.currentTimeMillis()));
			//paperRepository.save(paper);
			FileUtils.saveFile(uploadDir, fileName, file);
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new PaperException(HttpStatus.BAD_REQUEST, MessageConstant.PAPER_ERROR_FORMAT, "E001");
		}

	}

	@Override
	public PaperUpdatepaperRespone updateSubmitPaper(PaperUpdatePaperRequest req) {
		Optional<Paper> paper = paperRepository.findById(req.getPaperId());
		paperRepository.save(paper.get());
		return null;

	}

	@Override
	public List<Paper> listAll(String title) {
		// TODO Auto-generated method stub
		if (title != null) {
			return paperRepository.search(title);
		}
		return (List<Paper>) paperRepository.findAll();
	}

	@Override
	public int deleteById(int id) throws Exception {
		Optional<Paper> paperOpt = paperRepository.findById(id);
		if(paperOpt.isPresent()) {
			paperRepository.deleteById(id);
			return 1;
		} else {
			throw new Exception("Data not found");
		}
		
		
	}
	
}