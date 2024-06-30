package com.example.backend.dto.response.board;

import com.example.backend.common.ResponseCode;
import com.example.backend.common.ResponseMessage;
import com.example.backend.dto.object.BoardListItem;
import com.example.backend.dto.response.ResponseDto;
import com.example.backend.entity.BoardListViewEntity;
import lombok.Getter;

import java.util.List;

@Getter
public class GetTop3BoardListResponseDto extends ResponseDto {

    private List<BoardListItem> top3List;

    private GetTop3BoardListResponseDto(List<BoardListViewEntity> boardListViewEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }
}
