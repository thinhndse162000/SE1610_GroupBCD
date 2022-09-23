package com.bcd.ejournal.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdatePaperRequest;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.exception.PaperException;
import com.bcd.ejournal.service.PaperService;

@RestController
@RequestMapping(path = "/paper")
public class PaperApi {
	@Autowired
	private PaperService paperService;
	
	@PostMapping(path = "/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> submitPaper( PaperSubmitRequest model) throws Exception, PaperException {
		paperService.submitPaper(model);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updatePaper(@RequestBody PaperUpdatePaperRequest req){
		paperService.updateSubmitPaper(req);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping(path = "/search")
	public String searchPaperbytitle(Model model, @Param ("title") String title) {
		List<Paper> listPaper = paperService.listAll(title);
		model.addAttribute("listPaper", listPaper);
		model.addAttribute("title", title);
		return "index";
		
	}
	
	@PostMapping(path = "/{id}")
	public int deletePaperById(@RequestBody int Id  ) throws Exception {
		return paperService.deleteById(Id);
	}
}
