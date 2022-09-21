package com.bcd.ejournal.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Account implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountID;
    private String email;
    private String password;
    private String phone;
    private String firstName;
    private String lastName;
    private String organization;
    private Date dateOfBirth;
    private String profileImage;
    private Integer roleId;
    private boolean status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "AuthorID", referencedColumnName = "AuthorID")
    private Author author;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ReviewerID", referencedColumnName = "ReviewerID")
    private Reviewer reviewer;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<>();

        if (roleId == 1) {
            list.add(new SimpleGrantedAuthority("ADMIN"));
        } else {
            list.add(new SimpleGrantedAuthority("MEMBER"));
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
        return status;
    }

}