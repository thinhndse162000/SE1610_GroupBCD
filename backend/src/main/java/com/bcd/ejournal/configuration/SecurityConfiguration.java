package com.bcd.ejournal.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.bcd.ejournal.domain.enums.AccountRole;

@Configuration
public class SecurityConfiguration {
    private final JWTAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    public SecurityConfiguration(JWTAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

// FIXME:
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().antMatchers(POST, "/user", "/user/login");
//    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");

        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.formLogin().disable();
        http.logout().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.cors();

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeRequests()
            .anyRequest().permitAll();

        // http.authorizeRequests()
        //     .antMatchers("/auth", "/auth/signup").permitAll()
        //     .antMatchers("/journal/paper", "/journal", "/journal/{id}/invitation").hasRole(AccountRole.MANAGER.name())
        //     .antMatchers(HttpMethod.POST, "journal/{id}/invitation").hasRole(AccountRole.MANAGER.name())
        //     .antMatchers(HttpMethod.PUT, "/journal/{id}").hasRole(AccountRole.ADMIN.name())
        //     .antMatchers(HttpMethod.DELETE, "/journal/{id}").hasRole(AccountRole.ADMIN.name())
        //     .antMatchers(HttpMethod.POST, "/journal").hasRole(AccountRole.ADMIN.name())
        //     .anyRequest().authenticated();

        return http.build();
    }
}
