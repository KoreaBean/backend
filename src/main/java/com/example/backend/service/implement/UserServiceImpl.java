package com.example.backend.service.implement;

import com.example.backend.dto.response.ResponseDto;
import com.example.backend.dto.response.user.GetSignInUserResponseDto;
import com.example.backend.dto.response.user.GetUserResponseDto;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {

        UserEntity userEntity = null;

        try {

            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetSignInUserResponseDto.notExistUser();




        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String email) {

        UserEntity userEntity = null;

        try {

            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return GetUserResponseDto.noExistUser();
            }

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }


        return GetUserResponseDto.success(userEntity);
    }
}
