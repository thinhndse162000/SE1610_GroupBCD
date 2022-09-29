package com.bcd.ejournal.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
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
	public ResponseEntity<?> submitPaper(PaperSubmitRequest model) throws Exception, PaperException {
		paperService.submitPaper(model);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping(value = "/update")
	public ResponseEntity<?> updatePaper(@RequestBody PaperUpdatePaperRequest req) {
		paperService.updatePaper(req);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping(path = "/search")
	public ResponseEntity<?> search(@RequestBody PaperSearchRequest request ){
		List<Paper> rs = paperService.searchByRequest(request);
		return ResponseEntity.ok(rs);
	}
	
	@DeleteMapping(path = "/delete/{id}")
	public int deletePaperById(@PathVariable int id) throws Exception {
		return paperService.deleteById(id);
	}
	@GetMapping(path = "/{id}")
	public ResponseEntity<?> searchById(@PathVariable int id){
		Optional<Paper> paper = paperService.findById(id);
		return ResponseEntity.ok(paper);
	}
	
}
