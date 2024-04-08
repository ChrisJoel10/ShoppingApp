package com.security.Shopping.DataAccess;

public class UserDetailsResponse {
    public String username;
    public String firstname;
    public String lastname;
    public String email;

    public UserDetailsResponse(String username, String firstname, String lastname, String email) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    public UserDetailsResponse() {
    }
}
