package com.bcd.ejournal.service.implementation;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.configuration.jwt.JWTService;
import com.bcd.ejournal.domain.dto.request.AccountChangePasswordRequest;
import com.bcd.ejournal.domain.dto.request.AccountLoginRequest;
import com.bcd.ejournal.domain.dto.request.AccountSignupRequest;
import com.bcd.ejournal.domain.dto.request.AccountUpdateProfileRequest;
import com.bcd.ejournal.domain.dto.response.AccountProfileResponse;
import com.bcd.ejournal.domain.dto.response.AccountTokenResponse;
import com.bcd.ejournal.domain.dto.response.AuthorResponse;
import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.domain.entity.Author;
import com.bcd.ejournal.domain.entity.EmailDetail;
import com.bcd.ejournal.domain.entity.Reviewer;
import com.bcd.ejournal.domain.enums.AccountRole;
import com.bcd.ejournal.domain.enums.AccountStatus;
import com.bcd.ejournal.domain.exception.UnauthorizedException;
import com.bcd.ejournal.repository.AccountRepository;
import com.bcd.ejournal.service.AccountService;
import com.bcd.ejournal.service.EmailService;
import com.bcd.ejournal.utils.DTOMapper;


@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JWTService jwtService;
    private final EmailService emailService;
    private final DTOMapper dtoMapper;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository, PasswordEncoder passwordEncoder,
            ModelMapper modelMapper, JWTService jwtService, DTOMapper dtoMapper, EmailService emailService) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.dtoMapper = dtoMapper;

    }

    @Override
    public AccountTokenResponse login(AccountLoginRequest req) {
        String email = req.getEmail();
        String password = req.getPassword();
        Account acc = accountRepository.findByEmailAndStatusEqualsOpen(email)
                .orElseThrow(() -> new UnauthorizedException("Account not found"));
        if (passwordEncoder.matches(password, acc.getPassword())) {
            AccountTokenResponse response = new AccountTokenResponse();
            response.setToken(jwtService.jwtFromAccount(acc));
            response.setFullName(acc.getFullName());
            response.setRole(acc.getRole());
            return response;
        } else {
            throw new UnauthorizedException("Account not found");
        }
    }

    @Override
    public AccountTokenResponse signup(AccountSignupRequest req) {
        if (!req.getPassword().equals(req.getPasswordRetype())) {
            throw new DataIntegrityViolationException("Password mismatch");
        }

        // trim white space
        req.setEmail(req.getEmail().trim());
        req.setFirstName(req.getFirstName().trim());
        req.setLastName(req.getLastName().trim());
        req.setOrganization(req.getOrganization().trim());
        req.setPhone(req.getPhone().trim());

        // TODO: validate date of birth

        Account acc = modelMapper.map(req, Account.class);
        acc.setAccountId(0);
        acc.setPassword(passwordEncoder.encode(req.getPassword()));
        acc.setRole(AccountRole.MEMBER);
        acc.setStatus(AccountStatus.OPEN);
        String slug = req.getFirstName() + "-" + req.getLastName();
        acc.setSlug(slug.toLowerCase());

        Author author = new Author();
        author.setAccount(acc);
        author.setIntroduction("");
        author.setEducation("");

        Reviewer reviewer = new Reviewer();
        reviewer.setReviewerId(0);
        reviewer.setInvitable(true);
        reviewer.setAccount(acc);
        acc.setAuthor(author);
        acc.setReviewer(reviewer);
        try {
        	EmailDetail detail = new EmailDetail();
            acc = accountRepository.save(acc);
            detail.setToken("http://localhost:3000/verify?token="+	jwtService.jwtShrotDuration(acc));
            emailService.sendEmailSignup(detail, req);
            
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityViolationException("Email already exists", ex);
        }
        AccountTokenResponse response = new AccountTokenResponse();
        response.setToken(jwtService.jwtFromAccount(acc));
        response.setFullName(acc.getFullName());
        response.setRole(acc.getRole());
        return response;
    }

    @Override
    public void changePassword(Integer id, AccountChangePasswordRequest req) {
        if (!req.getNewPassword().equals(req.getNewPasswordRetype())) {
            throw new DataIntegrityViolationException("Password mismatch");
        }
        Account acc = accountRepository.findById(id)
                .orElseThrow(() -> new NullPointerException("Account not found - " + id));
        if (passwordEncoder.matches(req.getOldPassword(), acc.getPassword())) {
            acc.setPassword(passwordEncoder.encode(req.getNewPassword()));
            accountRepository.save(acc);
        } else {
            throw new DataIntegrityViolationException("Password mismatch");
        }
    }

    @Override
    public AccountProfileResponse updateProfile(Integer id, AccountUpdateProfileRequest req) {
        Account acc = accountRepository.findById(id)
                .orElseThrow(() -> new NullPointerException("Account not found - " + id));

        req.setFirstName(req.getFirstName().trim());
        req.setLastName(req.getLastName().trim());
        req.setOrganization(req.getOrganization().trim());
        req.setPhone(req.getPhone().trim());

        // TODO: validate date of birth
        modelMapper.map(req, acc);
        String slug = req.getFirstName() + "-" + req.getLastName();
        acc.setSlug(slug.toLowerCase());

        acc = accountRepository.save(acc);
        return modelMapper.map(acc, AccountProfileResponse.class);
    }

    @Override
    public AccountProfileResponse getProfile(Integer id) {
        Account acc = accountRepository.findById(id)
                .orElseThrow(() -> new NullPointerException("Account not found - " + id));
        return dtoMapper.toAccountProfileResponse(acc);
    }

    @Override
    public void archiveAccount(Integer id) {
        Account acc = accountRepository.findById(id)
                .orElseThrow(() -> new NullPointerException("Account not found - " + id));
        acc.setStatus(AccountStatus.ARCHIVED);
        accountRepository.save(acc);
    }

    @Override
    public AuthorResponse getAuthorFromSlug(String slug) {
        Account acc = accountRepository.findBySlug(slug)
            .orElseThrow(() -> new NullPointerException("No author found. Slug: " + slug));
        return dtoMapper.toAuthorResponse(acc.getAuthor());
    }
}
