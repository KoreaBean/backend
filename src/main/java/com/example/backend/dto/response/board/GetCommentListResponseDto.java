package com.example.backend.dto.response.board;

import com.example.backend.common.ResponseCode;
import com.example.backend.common.ResponseMessage;
import com.example.backend.dto.object.CommentListItem;
import com.example.backend.dto.response.ResponseDto;
import com.example.backend.repository.resultSet.GetCommentListResultSet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
public class GetCommentListResponseDto extends ResponseDto {

    List<CommentListItem> commentList = new ArrayList<>();



    private GetCommentListResponseDto(List<GetCommentListResultSet> list) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.commentList = CommentListItem.copyList(list);
    }



    public static ResponseEntity<? super GetCommentListResponseDto> success(List<GetCommentListResultSet> list){
        GetCommentListResponseDto result = new GetCommentListResponseDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> existedBoard(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
