package com.example.backend.dto.response.board;

import com.example.backend.common.ResponseCode;
import com.example.backend.common.ResponseMessage;
import com.example.backend.dto.response.ResponseDto;
import com.example.backend.entity.ImageEntity;
import com.example.backend.repository.resultSet.GetBoardResultSet;
import lombok.Getter;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
public class GetBoardResponseDto extends ResponseDto {

    private Integer boardNumber;
    private String title;
    private String content;
    private List<String> boardImageList;
    private String writeDataTime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImage;


    private GetBoardResponseDto(GetBoardResultSet resultSet, List<ImageEntity> imageEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);


        List<String> boardImageList = new ArrayList<>();
        for (ImageEntity imageEntity : imageEntities) {
            boardImageList.add(imageEntity.getImage());
        }
        this.boardNumber = resultSet.getBoard_number();
        this.title = resultSet.getTitle();
        this.content = resultSet.getContent();
        this.boardImageList = boardImageList;
        this.writeDataTime = resultSet.getWrite_datetime();
        this.writerEmail = resultSet.getWriter_email();
        this.writerNickname = resultSet.getWriter_nickname();
        this.writerProfileImage = resultSet.getWriter_profile_image();
    }



    public static ResponseEntity<GetBoardResponseDto> success(GetBoardResultSet resultSet, List<ImageEntity> imageEntities){
        GetBoardResponseDto result = new GetBoardResponseDto(resultSet,imageEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
