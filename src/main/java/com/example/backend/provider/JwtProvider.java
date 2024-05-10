package com.example.backend.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtProvider {
    @Value("${secret-key}")
    private String secretKey;

    public String create(String email){

        // 만료기간 설정 -> 생성 시간으로부터 1시간 +
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        // jwt 빌더
        String jwt = Jwts.builder()
                //알고리즘은 HS256이고, secretKey는 secretKey
                .signWith(SignatureAlgorithm.HS256,secretKey)
                //사용하는 주체는 email
                .setSubject(email)
                // 생성시간은 -> 현재시간
                .setIssuedAt(new Date())
                // 만료시간은 -> 설정한 만료시간
                .setExpiration(expiredDate)
                // 압축
                .compact();
        // 리턴
        return jwt;
    }

    // 검증, jwt를 받아서 검증
    public String validate (String jwt) {

        // claims 는 jwt 에서 payload 부분이며 사용자와 역할이 담겨 있다.
        Claims claims = null;

        try{
            // jwts.parser 를 통해 jwt 파서를 생성하고 setSigningkey안에 secretkey로 서명 검증에 사용할 비밀키 설정
            claims = Jwts.parser().setSigningKey(secretKey)
                    //.parseClaimsJws(jwt)를 호출하여 입력받은 jwt 토큰을 파싱하고 검증
                    // 이 과정에서 서명이 올바른지, 토큰이 만료되지 않았는지 검사
                    .parseClaimsJws(jwt)
                    //검증된 jwt의 payload부분을 가져와 claims 변수에 할당
                    .getBody();

        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
        // 예외가 발생하지 않았다면  토큰의 주체를 리턴 (email)
        return claims.getSubject();
    }
}
