package com.bcd.ejournal.service.implementation;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.configuration.jwt.JWTService;
import com.bcd.ejournal.configuration.jwt.payload.JWTPayload;
import com.bcd.ejournal.domain.dto.request.AccountChangeForgotPassword;
import com.bcd.ejournal.domain.dto.request.AccountChangePasswordRequest;
import com.bcd.ejournal.domain.dto.request.AccountLoginRequest;
import com.bcd.ejournal.domain.dto.request.AccountSignupRequest;
import com.bcd.ejournal.domain.dto.request.AccountUpdateProfileRequest;
import com.bcd.ejournal.domain.dto.request.TokenRequest;
import com.bcd.ejournal.domain.dto.response.AccountProfileResponse;
import com.bcd.ejournal.domain.dto.response.AccountTokenResponse;
import com.bcd.ejournal.domain.dto.response.AuthorResponse;
import com.bcd.ejournal.domain.dto.response.EducationResponse;
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
                .orElseThrow(() -> new UnauthorizedException("Wrong email or password"));
        if (passwordEncoder.matches(password, acc.getPassword())) {
            if (!acc.isEnable()) {
                sendVerifyEmail(acc);
                throw new UnauthorizedException(
                        "Please verify your account first. An email has been sent to your mail");
            }
            AccountTokenResponse response = new AccountTokenResponse();
            response.setToken(jwtService.jwtFromAccount(acc));
            response.setFullName(acc.getFullName());
            response.setRole(acc.getRole());
            return response;
        } else {
            throw new UnauthorizedException("Wrong email or password");
        }
    }

    @Override
    public void signup(AccountSignupRequest req) {
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
            acc = accountRepository.save(acc);
            sendVerifyEmail(acc);
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityViolationException("Email already exists", ex);
        }
        AccountTokenResponse response = new AccountTokenResponse();
    }

    private void sendVerifyEmail(Account acc) {
        EmailDetail detail = new EmailDetail();
        detail.setToken("Your Acc account has been Created \n\nClick this link to login\n\n"
                + "http://localhost:3000/auth/verify/" + jwtService.jwtShrotDuration(acc));
        emailService.sendEmailSignup(detail, acc.getEmail());
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

        req.setOrganization(req.getOrganization().trim());
        req.setPhone(req.getPhone().trim());

        modelMapper.map(req, acc);

        acc = accountRepository.save(acc);
        return dtoMapper.toAccountProfileResponse(acc);
    }

    @Override
    public AccountProfileResponse getProfile(Integer id) {
        Account acc = accountRepository.findById(id)
                .orElseThrow(() -> new NullPointerException("Account not found - " + id));
        return dtoMapper.toAccountProfileResponse(acc);
    }

    @Override
    public EducationResponse getEducation(Integer accountId) {
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new NullPointerException("Account not found - " + accountId));

        return dtoMapper.toEducationResponse(acc);
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

    @Override
    public void verify(TokenRequest req) {
        final String token = req.getToken();
        try {
            JWTPayload payload = jwtService.jwtPayloadFromJWT(token);
            Account account = accountRepository.findById(payload.getAccountId())
                    .filter(Account::isEnabled)
                    .orElse(null);
            if (payload.isExpired()) {
                sendVerifyEmail(account);
                throw new UnauthorizedException("Your verify link has expired");
            } else if (account != null) {
                accountRepository.updateEnable(account);
            }
        } catch (IllegalArgumentException e) {
            throw new UnauthorizedException(e.getMessage());
        }
    }

    @Override
    public void forgotPassword(String token, AccountChangeForgotPassword req) {
        if (!req.getNewPassword().equals(req.getNewPasswordRetype())) {
            throw new DataIntegrityViolationException("Password mismatch");
        }
        JWTPayload payload = jwtService.jwtPayloadFromJWT(token);
        System.out.println(payload.getAccountId());
        Account acc = accountRepository.findById(payload.getAccountId())
                .filter(Account::isEnabled)
                .orElse(null);
        if (acc != null) {
            acc.setPassword(passwordEncoder.encode(req.getNewPassword()));
            accountRepository.save(acc);
        }
    }
}
