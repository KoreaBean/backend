package com.example.backend.dto.response.board;

import com.example.backend.common.ResponseCode;
import com.example.backend.common.ResponseMessage;
import com.example.backend.dto.object.BoardListItem;
import com.example.backend.dto.response.ResponseDto;
import com.example.backend.entity.BoardEntity;
import com.example.backend.entity.BoardListViewEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetLatestBoardListResponseDto extends ResponseDto {

    private List<BoardListItem> latestList;

    private GetLatestBoardListResponseDto(List<BoardListViewEntity> boardListViewEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestList = BoardListItem.getList(boardListViewEntities);
    }

    public static ResponseEntity<GetLatestBoardListResponseDto> success (List<BoardListViewEntity> boardListViewEntities){

        GetLatestBoardListResponseDto result = new GetLatestBoardListResponseDto(boardListViewEntities);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


}
