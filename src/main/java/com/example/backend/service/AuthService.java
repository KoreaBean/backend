package com.example.backend.service;

import com.example.backend.dto.request.auth.SignUpRequestDto;
import com.example.backend.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
