package com.example.backend.dto.request.board;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostBoardRequestDto {

    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotNull // 빈 배열이 올 수 는 있지만 해당 필드는 반드시 있어야 한다.
    private List<String> boardImageList;
}
