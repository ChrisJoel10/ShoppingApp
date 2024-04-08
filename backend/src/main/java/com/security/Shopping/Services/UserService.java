package com.security.Shopping.Services;

import com.security.Shopping.DataAccess.PasswordRequest;
import com.security.Shopping.DataAccess.UserDetailsResponse;
import com.security.Shopping.DataAccess.UserResponse;
import com.security.Shopping.Entities.User;

public interface UserService {
    public User getUser(Long id);
    public UserResponse registerUser(User user);
    public UserResponse changePassword(PasswordRequest passwordRequest);
    public User getUserDetails(String Username);

}
