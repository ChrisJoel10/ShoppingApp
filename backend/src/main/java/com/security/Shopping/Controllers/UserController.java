package com.security.Shopping.Controllers;

import com.security.Shopping.DataAccess.LoginRequest;
import com.security.Shopping.DataAccess.PasswordRequest;
import com.security.Shopping.DataAccess.UserDetailsResponse;
import com.security.Shopping.DataAccess.UserResponse;
import com.security.Shopping.Entities.User;
import com.security.Shopping.Security.JwtUtils;
import com.security.Shopping.Services.UserService;
import com.security.Shopping.util.LoggedinUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, JwtUtils jwtTokenUtil, UserDetailsService userDetailsService)
    {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/getuserbyid")
    public User getUser(@RequestParam int id)
    {
        return userService.getUser(1L);
    }

    @PostMapping("/registeruser")
    public UserResponse registerUser(@RequestBody User user)
    {
        return userService.registerUser(user);
    }

    @PostMapping("/changePwd")
    public UserResponse changePassword(@RequestBody PasswordRequest passwordRequest)
    {
        String username = LoggedinUser.getUsername();
        passwordRequest.username = username;
        return userService.changePassword(passwordRequest);
    }

    @GetMapping("/getUserDetails")
    public ResponseEntity<?> getUserDetails()
    {
        String username = LoggedinUser.getUsername();
        User userResponse = userService.getUserDetails(username);
        if(userResponse != null)
        {
            return new ResponseEntity<>(new UserDetailsResponse(userResponse.getUsername(), userResponse.getFirstname(), userResponse.getLastname(), userResponse.getEmail()) , HttpStatus.OK);
        }
        else
        {
            HashMap<String, String> map = new HashMap<>();
            map.put("isSuccess", "false");
            map.put("message", "Incorrect Username or Password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            // Invalid credentials, return 401 Unauthorized
            HashMap<String, String> map = new HashMap<>();
            map.put("isSuccess", "false");
            map.put("message", "Incorrect Username or Password");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

        String token = jwtTokenUtil.generateJwtToken(userDetails);
        Map<String, String> result =  new HashMap<>();
        result.put("token", token);
        result.put("isSuccess", "true");
        // Return the JWT token in the response
        return new ResponseEntity<>(result , HttpStatus.OK);
    }

}
