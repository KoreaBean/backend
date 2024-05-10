package com.example.backend.service.implement;

import com.example.backend.dto.request.auth.SignUpRequestDto;
import com.example.backend.dto.response.ResponseDto;
import com.example.backend.dto.response.auth.SignUpResponseDto;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        try {
            String email = dto.getEmail();
            boolean existsByEmail = userRepository.existsByEmail(email);
            if(existsByEmail) return SignUpResponseDto.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existsByNickname = userRepository.existsByNickname(nickname);
            if(existsByNickname) return SignUpResponseDto.duplicateNickname();

            String telnumber = dto.getTelNumber();
            boolean existsByTelNumber = userRepository.existsByTelNumber(telnumber);
            if(existsByTelNumber) return SignUpResponseDto.duplicateTelNumber();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }
}
