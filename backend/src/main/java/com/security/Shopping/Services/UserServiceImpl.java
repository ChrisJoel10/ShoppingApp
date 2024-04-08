package com.security.Shopping.Services;

import com.security.Shopping.DataAccess.PasswordRequest;
import com.security.Shopping.DataAccess.UserDetailsResponse;
import com.security.Shopping.DataAccess.UserResponse;
import com.security.Shopping.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.security.Shopping.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User getUser(Long id)
    {
        return new User("1111", "email.com", "test", "test", "password");
    }

    @Override
    public UserResponse registerUser(User user)
    {
        UserResponse response = new UserResponse();

        if(userRepository.existsByUsername(user.getUsername()))
        {
            response.isSuccess = false;
            response.message = "user already exists";
            response.statusCode = 1;
        }
        else if(userRepository.existsByEmail(user.getEmail()))
        {
            response.isSuccess = false;
            response.message = "email already exists";
            response.statusCode = 2;
        }
        else
        {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            response.isSuccess = true;
            response.message = "user registered";
            response.statusCode = 0;
        }
        return response;
    }

    public User getUserDetails(String Username)
    {
        User existingUser = userRepository.findByUsername(Username);
        return existingUser;
    }
    public UserResponse changePassword(PasswordRequest passwordRequest)
    {
        UserResponse response = new UserResponse();

        User existingUser = userRepository.findByUsername(passwordRequest.username);
        if(existingUser != null)
        {
            existingUser.setPassword(passwordRequest.password);
            response.isSuccess = true;
            response.message = "password changed";
            response.statusCode = 0;

        }
        else
        {
            response.isSuccess = false;
            response.message = "user doesn't exist";
            response.statusCode = 1;

        }
        return response;
    }

}
