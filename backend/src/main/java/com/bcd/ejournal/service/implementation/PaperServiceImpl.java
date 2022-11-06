package com.bcd.ejournal.service.implementation;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdateRequest;
import com.bcd.ejournal.domain.dto.response.PagingResponse;
import com.bcd.ejournal.domain.dto.response.PaperDetailResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.dto.response.ReviewReportResponse;
import com.bcd.ejournal.domain.entity.Author;
import com.bcd.ejournal.domain.entity.Journal;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.enums.PaperStatus;
import com.bcd.ejournal.domain.exception.ForbiddenException;
import com.bcd.ejournal.repository.AccountRepository;
import com.bcd.ejournal.repository.FieldRepository;
import com.bcd.ejournal.repository.JournalRepository;
import com.bcd.ejournal.repository.PaperRepository;
import com.bcd.ejournal.service.EmailService;
import com.bcd.ejournal.service.PaperService;
import com.bcd.ejournal.utils.DTOMapper;
import com.bcd.ejournal.utils.FileUtils;

@Service
public class PaperServiceImpl implements PaperService {
    private final PaperRepository paperRepository;
    private final AccountRepository accountRepository;
    private final JournalRepository journalRepository;
    private final FieldRepository fieldRepository;
    private final DTOMapper dtoMapper;
    @Value("${paper.file.dir}")
    private String uploadDir;

    @Autowired
    private EmailService emailService;

    @Autowired
    public PaperServiceImpl(PaperRepository paperRepository, AccountRepository accountRepository,
            JournalRepository journalRepository, FieldRepository fieldRepository,
            DTOMapper dtoMapper) {
        this.paperRepository = paperRepository;
        this.accountRepository = accountRepository;
        this.journalRepository = journalRepository;
        this.fieldRepository = fieldRepository;
        this.dtoMapper = dtoMapper;
    }

    @Override
    @Transactional
    public void submitPaper(Integer authorId, PaperSubmitRequest request) throws InvalidPasswordException, IOException {
        request.setTitle(request.getTitle().trim());
        request.setSummary(request.getSummary().trim());

        Paper paper = new Paper(request);

        paper.setPaperId(0);
        paper.setRound(1);
        paper.setSubmitTime(new Timestamp(System.currentTimeMillis()));

        paper.setStatus(PaperStatus.PENDING);
        paper.setFields(fieldRepository.findAllByFieldIdIn(request.getFieldId()));

        Journal journal = journalRepository.findById(request.getJournalId())
                .orElseThrow(() -> new NullPointerException("Journal not found. Id: " + request.getJournalId()));
        Author author = accountRepository.findById(authorId)
                .orElseThrow(() -> new NullPointerException("Author not found. Id: " + authorId))
                .getAuthor();
        paper.setAuthor(author);
        author.getPapers().add(paper);

        paper.setJournal(journal);
        journal.getPapers().add(paper);

        String fileName = request.getTitle() + " - " + author.getAccount().getFullName() + ".pdf";
        MultipartFile file = request.getFile();
        paper.setLinkPDF(fileName);
        try {
            FileUtils.saveFile(uploadDir, fileName, file);
        } catch (NullPointerException ex) {
            System.out.println("Null");
        } catch (IOException ex) {
            System.out.println("IOexception");
        }

        PDDocument doc = Loader.loadPDF(new File(uploadDir + paper.getLinkPDF()));
        paper.setNumberOfPage(doc.getNumberOfPages());

        emailService.sendEmailSumbitPaper(author.getAccount());

        paperRepository.save(paper);
    }

	@Override
    public void deleteById(Integer paperId) {
        // TODO: verify accountId
        // TODO: log existence
        Optional<Paper> paperOpt = paperRepository.findById(paperId);
        if (paperOpt.isPresent()) {
            File file = new File(paperOpt.get().getLinkPDF());
            // TODO: file service delete
            boolean isDelete = file.delete();
            paperRepository.deleteById(paperId);
            if (isDelete) {
                System.out.println("File delete successfully");
            } else {
                System.out.println("File doesn't exist");
            }
        }
    }

    @Override
    public void updatePaper(Integer accountId, Integer paperId, PaperUpdateRequest request) {
        // trim whitespace
        request.setTitle(request.getTitle().trim());
        request.setSummary(request.getSummary().trim());

        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new NullPointerException("Paper not found. Id: " + paperId));
        // check author's ownership
        if (paper.getAuthor().getAuthorId() != accountId) {
            throw new ForbiddenException("Author does not own paper. Paper Id: " + paperId);
        }

        if (paper.getStatus() != PaperStatus.PENDING) {
            throw new ForbiddenException("Paper cannot be updated. Paper Id: " + paperId);
        }

        paper.setTitle(request.getTitle());
        paper.setSummary(request.getSummary());

        if (request.getFile() != null) {
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
        }

        paperRepository.save(paper);
    }

    @Override
    public PagingResponse searchByRequest(PaperSearchRequest request) {
        int pageNum = request.getPage() != null ? request.getPage() - 1 : 0;
        Pageable page = PageRequest.of(pageNum, 10, Sort.by("submitTime").descending());

        Page<Paper> papers = paperRepository.searchAndFilter(request, page);

        PagingResponse response = new PagingResponse();

        response.setResult(papers.stream().map(dtoMapper::toPaperResponse)
                .collect(Collectors.toList()));
        response.setNumOfPage(papers.getTotalPages());
        response.setTotalFound(papers.getTotalElements());

        return response;
    }

    @Override
    public List<PaperResponse> getAllPaperFromAuthor(Integer authorId) {
        Author author = accountRepository.findById(authorId)
                .orElseThrow(() -> new NullPointerException("Author not found. Id: " + authorId)).getAuthor();

        List<Paper> papers = author.getPapers();
        return papers.stream().map(dtoMapper::toPaperResponse).collect(Collectors.toList());
    }

    @Override
    public List<PaperResponse> getAllPaperFromJournal(Integer journalId) {
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new NullPointerException("Journal not found. Id: " + journalId));
        List<Paper> papers = journal.getPapers();
        return papers.stream().map(dtoMapper::toPaperResponse).collect(Collectors.toList());
    }

    @Override
    public PaperDetailResponse getPaper(Integer paperId) {
        PaperDetailResponse response = new PaperDetailResponse();
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new NullPointerException("No paper found. Id: " + paperId));

        List<ReviewReportResponse> reviewReports = paper.getReviewReports().stream()
                .map(dtoMapper::toReviewReportResponse)
                .collect(Collectors.toList());

        response.setPaper(dtoMapper.toPaperResponse(paper));
        response.setReviews(reviewReports);
        return response;
    }

    @Override
    public Resource downloadFile(Integer paperId) throws IOException {
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new NullPointerException("Paper not found. Id: " + paperId));
        String fileName = paper.getLinkPDF();
        return FileUtils.load(uploadDir, fileName.trim());
    }

    @Override
	public void cleanDuePaper() {
        paperRepository.updatePendingPaperAfter6Months();
        // TODO: Thinh send email to author
    }
}
