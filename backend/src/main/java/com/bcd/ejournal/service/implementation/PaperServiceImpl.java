package com.bcd.ejournal.service.implementation;


import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdateRequest;
import com.bcd.ejournal.domain.dto.response.AuthorResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.dto.response.PaperDetailResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.dto.response.ReviewReportResponse;
import com.bcd.ejournal.domain.dto.response.ReviewerResponse;
import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.domain.entity.Author;
import com.bcd.ejournal.domain.entity.Journal;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.domain.enums.PaperStatus;
import com.bcd.ejournal.repository.AccountRepository;
import com.bcd.ejournal.repository.JournalRepository;
import com.bcd.ejournal.repository.PaperRepository;
import com.bcd.ejournal.repository.RequestMapper;
import com.bcd.ejournal.repository.ReviewReportRepository;
import com.bcd.ejournal.service.PaperService;
import com.bcd.ejournal.utils.FileUtils;

@Service
public class PaperServiceImpl implements PaperService {
	private final PaperRepository paperRepository;
	private final AccountRepository accountRepository;
	private final JournalRepository journalRepository;
	private final ReviewReportRepository reviewReportRepository;
	private final RequestMapper paperMapper;
	private final ModelMapper modelMapper;
	@Value("${paper.file.dir}")
	private String uploadDir;

	@Autowired
	public PaperServiceImpl(PaperRepository paperRepository, AccountRepository accountRepository,
			JournalRepository journalRepository, ReviewReportRepository reviewReportRepository,
			RequestMapper paperMapper, ModelMapper modelMapper) {
		this.paperRepository = paperRepository;
		this.accountRepository = accountRepository;
		this.journalRepository = journalRepository;
		this.reviewReportRepository = reviewReportRepository;
		this.paperMapper = paperMapper;
		this.modelMapper = modelMapper;
	}

	@Override
	@Transactional
	public void submitPaper(Integer authorId, PaperSubmitRequest submitRequest) {
		// TODO: trim white space from title and abstract
		Paper paper = new Paper(submitRequest);
		// TODO: generate random file name
		// TODO: delete file if error
		String fileName = submitRequest.getFile().getOriginalFilename();
		MultipartFile file = submitRequest.getFile();
		paper.setLinkPDF(fileName);
		try {
			FileUtils.saveFile(uploadDir, fileName, file);
		} catch (NullPointerException ex) {
			System.out.println("Null");
		} catch (IOException ex) {
			System.out.println("IOexception");
		}

		paper.setPaperId(0);
		paper.setSubmitTime(new Timestamp(System.currentTimeMillis()));
		// TODO: read number of page from pdf
		paper.setNumberOfPage(10);
		paper.setStatus(PaperStatus.PENDING);

		Journal journal = journalRepository.findById(submitRequest.getJournalId())
				.orElseThrow(() -> new NullPointerException("Journal not found. ID: " + submitRequest.getJournalId()));
		Author author = accountRepository.findById(authorId)
				.orElseThrow(() -> new NullPointerException("Author not found. ID: " + authorId)).getAuthor();
		paper.setAuthor(author);
		author.getPapers().add(paper);

		Journal journal1 = journalRepository.findById(submitRequest.getJournalId())
				.orElseThrow(() -> new NullPointerException("Journal not found. Id: " + submitRequest.getJournalId()));
		Author author1 = accountRepository.findById(authorId)
				.orElseThrow(() -> new NullPointerException("Author not found. Id: " + authorId)).getAuthor();
		paper.setAuthor(author1);
		author1.getPapers().add(paper);

		paper.setJournal(journal1);
		journal1.getPapers().add(paper);

		paperRepository.save(paper);
	}



	@Override
	public void deleteById(Integer paperID) {
		// TODO: verify accountID
		// TODO: log existence
		Optional<Paper> paperOpt = paperRepository.findById(paperID);
		if (paperOpt.isPresent()) {
			File file = new File(paperOpt.get().getLinkPDF());
			// TODO: file service delete
			boolean isDelete = file.delete();
			paperRepository.deleteById(paperID);
			if (isDelete) {
				System.out.println("File delete successfully");
			} else {
				System.out.println("File doesn't exist");
			}
		}
	}

	@Override
	public void updatePaper(Integer paperId, PaperUpdateRequest request) {
		// TODO: verify accountId
		// TODO: trim white space
		Paper paper = paperRepository.findById(paperId)
				.orElseThrow(() -> new NullPointerException("Paper not found. Id: " + paperId));
		paper.setTitle(request.getTitle());
		paper.setSummary(request.getSummary());

		String fileName = request.getFile().getOriginalFilename();
		MultipartFile file = request.getFile();
		paper.setLinkPDF(fileName);
		// TODO: delete old file if update
		try {
			FileUtils.saveFile(uploadDir, fileName, file);
		} catch (NullPointerException ex) {
			System.out.println("Null");
		} catch (IOException ex) {
			System.out.println("IOexception");
		}

		paperRepository.save(paper);
	}


	@Override
	public List<PaperResponse> searchByRequest(PaperSearchRequest paperSearchRequest) {
		// TODO: verify manager
		int pageNum= paperSearchRequest.getPage() != null ? paperSearchRequest.getPage() - 1 : 0;
		Pageable page = PageRequest.of(pageNum, 10, Sort.by("submitTime").descending());
		 /** Iterable<Paper> papers =
		 * paperRepository.searchByTitle(paperSearchRequest.getTitle() , pageable );
		 * return StreamSupport.stream(papers.spliterator(), false)
		 * .map(this::fromPaper) .collect(Collectors.toList());
		 */
		List<Paper> paper = paperRepository.searchByRequest(paperSearchRequest, page);
		return paper.stream().map(this::fromPaper).collect(Collectors.toList());
	}


	@Override
	public List<PaperResponse> getAllPaperFromAuthor(Integer authorID) {
		Author author = accountRepository.findById(authorID)
				.orElseThrow(() -> new NullPointerException("Author not found. ID: " + authorID)).getAuthor();


		List<Paper> papers = author.getPapers();
		return papers.stream().map(this::fromPaper).collect(Collectors.toList());
	}


	@Override
	public List<PaperResponse> getAllPaperFromJournal(Integer journalID) {
		Journal journal = journalRepository.findById(journalID)
				.orElseThrow(() -> new NullPointerException("Journal not found. ID: " + journalID));


		List<Paper> papers = journal.getPapers();
		return papers.stream().map(this::fromPaper).collect(Collectors.toList());
	}

//	@Override
//	public PaperDetailResponse getPaper(Integer paperId) {
//		PaperDetailResponse response = new PaperDetailResponse();
//		Paper paper = paperRepository.findById(paperId)
//				.orElseThrow(() -> new NullPointerException("No paper found. Id: " + paperId));
//
////		List<ReviewReportResponse> reviewReports = paper.getReviewReports().stream().map(this::fromReviewReport)
////				.collect(Collectors.toList());
//
//		response.setPaper(fromPaper(paper));
//		response.setReviews(reviewReports);
//		return response;
//	}

	@Override
	public Resource downloadFile(Integer paperId) throws IOException {
		Paper paper = paperRepository.findById(paperId)
				.orElseThrow(() -> new NullPointerException("Paper not found. Id: " + paperId));
		String fileName = paper.getLinkPDF();
		// TODO: verify reviewer can download
		// TODO: verify author
		return FileUtils.load(uploadDir, fileName.trim());
	}


	private PaperResponse fromPaper(Paper paper) {
		PaperResponse paperResponse = modelMapper.map(paper, PaperResponse.class);
		paperResponse.setJournal(modelMapper.map(paper.getJournal(), JournalResponse.class));
		paperResponse.setAuthors(fromAuthor(paper.getAuthor()));
		return paperResponse;
	}

	private AuthorResponse fromAuthor(Author author) {
		AuthorResponse authorResponse = modelMapper.map(author, AuthorResponse.class);
		authorResponse.setFullName(author.getAccount().getFullName());
		return authorResponse;
	}


	private ReviewReportResponse fromReviewReport(ReviewReport reviewReport) {
        ReviewReportResponse response = modelMapper.map(reviewReport, ReviewReportResponse.class);
        Account acc = reviewReport.getReviewer().getAccount();
        response.setReviewer(new ReviewerResponse(acc.getAccountId(), acc.getFullName()));
        return response;
    }

	@Override
	public PaperDetailResponse getPaper(Integer paperId) {
		// TODO Auto-generated method stub
		return null;
	}


}
