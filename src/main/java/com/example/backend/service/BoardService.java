package com.example.backend.service;

import com.example.backend.dto.request.board.PostBoardRequestDto;
import com.example.backend.dto.response.board.GetLatestBoardListResponseDto;
import com.example.backend.dto.response.board.GetUserBoardListResponseDto;
import com.example.backend.dto.response.board.PostBoardResponseDto;
import com.example.backend.dto.response.board.PutFavoriteResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {

    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);

    ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email);
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();

    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

}
