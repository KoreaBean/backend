package com.example.backend.controller;

import com.example.backend.dto.request.board.PostBoardRequestDto;
import com.example.backend.dto.request.board.PostCommentRequestDto;
import com.example.backend.dto.response.board.*;
import com.example.backend.service.BoardService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;


    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto>postBoard
            (@RequestBody @Valid PostBoardRequestDto dto, @AuthenticationPrincipal String email)
    {
        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(dto, email);
        return response;
    }

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
    // 특정 게시물 상세보기
    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto>getBoard(@PathVariable("boardNumber")Integer boardNumber){
        ResponseEntity response = boardService.getBoard(boardNumber);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 특정 게시글 좋아요 
    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
            @PathVariable("boardNumber") int boardNUmber, @AuthenticationPrincipal String email)
    {
        ResponseEntity<? super PutFavoriteResponseDto> response = boardService.putFavorite(boardNUmber, email);
        return response;
    }
    // 좋아요 리스트
    @GetMapping("/{boardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(@PathVariable("boardNumber")Integer boardNumber){
        ResponseEntity<? super GetFavoriteListResponseDto> response = boardService.getFavoriteList(boardNumber);
        return response;
    }

    // 댓글 작성
    @PostMapping("/{boardNumber}/comment")
    ResponseEntity<? super PostCommentResponseDto> postComment(@PathVariable("boardNumber")Integer boardNumber,@RequestBody@Valid PostCommentRequestDto dto, @AuthenticationPrincipal String email){

        ResponseEntity<? super PostCommentResponseDto> response = boardService.postComment(dto, boardNumber, email);
        return response;
    }

    // 댓글 리스트
    @GetMapping("/{boardNumber}/comment-list")
    ResponseEntity<? super GetCommentListResponseDto>getCommentList(@PathVariable("boardNumber")Integer boarNumber){
        ResponseEntity<? super GetCommentListResponseDto> response = boardService.getCommentList(boarNumber);
        return  response;
    }

}
