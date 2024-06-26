package com.example.backend.service.implement;

import com.example.backend.dto.response.ResponseDto;
import com.example.backend.dto.response.board.GetLatestBoardListResponseDto;
import com.example.backend.dto.response.board.GetUserBoardListResponseDto;
import com.example.backend.dto.response.board.PutFavoriteResponseDto;
import com.example.backend.entity.BoardEntity;
import com.example.backend.entity.BoardListViewEntity;
import com.example.backend.entity.FavoriteEntity;
import com.example.backend.repository.BoardListViewRepository;
import com.example.backend.repository.BoardRepository;
import com.example.backend.repository.FavoriteRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final BoardListViewRepository boardListViewRepository;
    private final FavoriteRepository favoriteRepository;

    @Override
    public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email) {

        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

        try {
            boolean existeduser = userRepository.existsByEmail(email);
            if (!existeduser) return GetUserBoardListResponseDto.noExistUser();

            boardListViewEntities = boardListViewRepository.findByWriteEmailOrderByWriteDatetimeDesc(email);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }


        return GetUserBoardListResponseDto.success(boardListViewEntities);
    }

    @Override
    public ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList() {

        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

        try {

            boardListViewEntities = boardListViewRepository.findByOrderByWriteDatetimeDesc();

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetLatestBoardListResponseDto.success(boardListViewEntities);
    }

    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {

        try {

            boolean existedUser = userRepository.existsByEmail(email);
            if (!existedUser) return PutFavoriteResponseDto.noExistUser();
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);

            if (favoriteEntity == null) {
                favoriteEntity = new FavoriteEntity(email, boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaseFavoriteCount();
            } else {
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaseFavoriteCount();
            }

            boardRepository.save(boardEntity);


        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PutFavoriteResponseDto.success();
    }
}
