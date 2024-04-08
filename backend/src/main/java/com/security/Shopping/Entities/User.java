package com.security.Shopping.Entities;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
public class User {
    @Id
    private String username;
    @Column(unique = true)
    private String email;
    @Column(nullable = false)
    private String firstname;
    @Column(nullable = false)
    private String lastname;
    @Column(nullable = false)
    private String password;
    public User(String username, String email, String firstname, String lastname, String password)
    {
        this.username = username;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
    }

    public User(){}

    public String getUsername()
    {
        return this.username;
    }
    public String getEmail() { return this.email; }
    public String getFirstname() { return this.firstname; }
    public String getLastname() { return this.lastname; }
    public String getPassword() { return this.password; }

    public void setPassword(String password) { this.password = password; }
}
