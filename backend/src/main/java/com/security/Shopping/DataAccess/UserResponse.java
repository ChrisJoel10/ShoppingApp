package com.security.Shopping.DataAccess;

public class UserResponse {

    public boolean isSuccess;
    public String message;
    public int statusCode;

    public UserResponse(boolean isSuccess, String message, int statusCode) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.statusCode = statusCode;
    }

    public UserResponse() {
    }
}
