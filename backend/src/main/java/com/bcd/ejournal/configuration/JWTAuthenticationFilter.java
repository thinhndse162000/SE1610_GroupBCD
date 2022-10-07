package com.bcd.ejournal.configuration;

import com.bcd.ejournal.configuration.jwt.JWTService;
import com.bcd.ejournal.configuration.jwt.payload.JWTPayload;
import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;


@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {
    private JWTService jwtService;
    private AccountRepository accountRepo;

    @Autowired
    public JWTAuthenticationFilter(JWTService jwtService, AccountRepository accountRepo) {
        this.jwtService = jwtService;
        this.accountRepo = accountRepo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String header = request.getHeader(AUTHORIZATION);
        System.out.println("Enter filter: " + header);
        // Check header structure
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = header.split(" ")[1].trim();
        try {
            JWTPayload payload = jwtService.jwtPayloadFromJWT(token);
            Account account = accountRepo.findById(payload.getAccountId())
                    .filter(Account::isEnabled)
                    .orElse(null);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(payload, null,
                    account == null ? List.of() : account.getAuthorities());

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}
