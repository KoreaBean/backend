package com.example.backend.controller;

import com.example.backend.dto.response.board.GetLatestBoardListResponseDto;
import com.example.backend.dto.response.board.GetUserBoardListResponseDto;
import com.example.backend.dto.response.board.PutFavoriteResponseDto;
import com.example.backend.service.BoardService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/user-boardlist/{email}")
    public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(@PathVariable("email") String email) {
        ResponseEntity<? super GetUserBoardListResponseDto> response = boardService.getUserBoardList(email);

        return response;
    }

    @GetMapping("/latest-list")
    public ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList() {
        ResponseEntity<? super GetLatestBoardListResponseDto> response = boardService.getLatestBoardList();

        return response;
    }

    @PutMapping("/{boardNUmber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
            @PathVariable("boardNumber") int boardNUmber, @AuthenticationPrincipal String email)
    {
        ResponseEntity<? super PutFavoriteResponseDto> response = boardService.putFavorite(boardNUmber, email);
        return response;
    }
}
