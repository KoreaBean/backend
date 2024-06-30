package com.example.backend.service;

import com.example.backend.dto.response.user.GetSignInUserResponseDto;
import com.example.backend.dto.response.user.GetUserResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {


    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);


    ResponseEntity<? super GetUserResponseDto> getUser(String email);

}
