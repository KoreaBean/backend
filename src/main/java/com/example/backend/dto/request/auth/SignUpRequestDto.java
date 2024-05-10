package com.example.backend.dto.request.auth;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

    @NotBlank // 문자열에서 null이 아니여야 하고, 빈 문자열로 이루어지지 않아야함, 공백이 아니여야 함
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 20)
    private String password;

    @NotBlank
    private String nickname;

    @NotBlank
    @Pattern(regexp = "[0-9]{11,13}$")
    private String telNumber;

    @NotBlank // notBlank 와 notempty는 문자열에서만 쓸 수 있음
    private String address;

    private String addressDetail;

    @NotNull // 참조용 변수에서는 모두다 사용할 수 있음
    @AssertTrue // 무조건 true만
    private Boolean agreedPersonal;

}
