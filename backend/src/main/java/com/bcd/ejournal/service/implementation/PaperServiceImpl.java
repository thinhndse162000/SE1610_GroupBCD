package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdateRequest;
import com.bcd.ejournal.domain.dto.response.AuthorResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.entity.Author;
import com.bcd.ejournal.domain.entity.Journal;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.enumstatus.PaperStatus;
import com.bcd.ejournal.repository.AccountRepository;
import com.bcd.ejournal.repository.JournalRepository;
import com.bcd.ejournal.repository.PaperRepository;
import com.bcd.ejournal.repository.RequestMapper;
import com.bcd.ejournal.service.PaperService;
import com.bcd.ejournal.utils.FileUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PaperServiceImpl implements PaperService {
    private final PaperRepository paperRepository;
    private final AccountRepository accountRepository;
    private final JournalRepository journalRepository;
    private final RequestMapper paperMapper;
    private final ModelMapper modelMapper;
    @Value("${paper.file.dir}")
    private String uploadDir;

    @Autowired
    public PaperServiceImpl(PaperRepository paperRepository, AccountRepository accountRepository, JournalRepository journalRepository, RequestMapper paperMapper, ModelMapper modelMapper) {
        this.paperRepository = paperRepository;
        this.accountRepository = accountRepository;
        this.journalRepository = journalRepository;
        this.paperMapper = paperMapper;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public void submitPaper(Integer authorID, PaperSubmitRequest submitRequest) {
        Paper paper = new Paper(submitRequest);
        // TODO: generate random file name
        // TODO: delete file if error
        String fileName = submitRequest.getFile().getOriginalFilename();
        MultipartFile file = submitRequest.getFile();
        String filePath = uploadDir + fileName;
        paper.setLinkPDF(filePath);
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
        Author author = accountRepository.findById(authorID)
                .orElseThrow(() -> new NullPointerException("Author not found. ID: " + authorID))
                .getAuthor();
        paper.setAuthor(author);
        author.getPapers().add(paper);

        paper.setJournal(journal);
        journal.getPapers().add(paper);

        paperRepository.save(paper);
    }

    @Override
    public void updatePaper(Integer paperID, PaperUpdateRequest request) {
        Paper paper = paperRepository.findById(paperID)
                .orElseThrow(() -> new NullPointerException("Paper not found. ID: " + paperID));
        paper.setTitle(request.getTitle());
        paper.setSummary(request.getSummary());
        paperRepository.save(paper);
    }

    @Override
    public void deleteById(Integer paperID) {
        // TODO: log existence
        Optional<Paper> paperOpt = paperRepository.findById(paperID);
        if (paperOpt.isPresent()) {
            Paper paper = paperOpt.get();
            // TODO: file service delete
        }
        paperRepository.deleteById(paperID);
    }

    @Override
    public List<PaperResponse> searchByRequest(PaperSearchRequest paperSearchRequest) {
        Iterable<Paper> papers = paperRepository.searchByTitle(paperSearchRequest.getTitle());

        return StreamSupport.stream(papers.spliterator(), false)
                .map(this::fromPaper)
                .collect(Collectors.toList());
    }

    @Override
    public List<PaperResponse> getAllPaperFromAuthor(Integer authorID) {
        Author author = accountRepository.findById(authorID)
                .orElseThrow(() -> new NullPointerException("Author not found. ID: " + authorID))
                .getAuthor();

        List<Paper> papers = author.getPapers();
        return papers.stream()
                .map(this::fromPaper)
                .collect(Collectors.toList());
    }

    @Override
    public List<PaperResponse> getAllPaperFromJournal(Integer journalID) {
        Journal journal = journalRepository.findById(journalID)
                .orElseThrow(() -> new NullPointerException("Journal not found. ID: " + journalID));

        List<Paper> papers = journal.getPapers();
        return papers.stream()
                .map(this::fromPaper)
                .collect(Collectors.toList());
    }

    @Override
    public PaperResponse getPaper(Integer paperID) {
        Paper paper = paperRepository.findById(paperID)
                .orElseThrow(() -> new NullPointerException("No paper found. ID: " + paperID));
        // TODO: author or reviewer or journal
        return modelMapper.map(paper, PaperResponse.class);
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
}