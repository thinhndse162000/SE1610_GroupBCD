package com.bcd.ejournal.domain.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bcd.ejournal.domain.enums.AccountRole;
import com.bcd.ejournal.domain.enums.AccountStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Account implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;
    private String email;
    private String password;
    private String phone;
    private String firstName;
    private String lastName;
    private String organization;
    private Date dateOfBirth;
    @Enumerated(EnumType.STRING)
    private AccountRole role;
    @Enumerated(EnumType.STRING)
    private AccountStatus status;
    private String slug;
    private boolean enable;
    
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Author author;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Reviewer reviewer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "Manager",
            joinColumns = @JoinColumn(name = "accountId", referencedColumnName = "accountId"),
            inverseJoinColumns = @JoinColumn(name = "journalId", referencedColumnName = "journalId"))
    private Journal journal;

    public String getFullName() {
        return firstName + " " + lastName;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority(role.name()));
        if (role == AccountRole.MANAGER) {
            list.add(new SimpleGrantedAuthority(AccountRole.MEMBER.name()));
        }
        return list;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status == AccountStatus.OPEN;
    }
}
