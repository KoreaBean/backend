package com.example.backend.filter;

import com.example.backend.provider.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String token = parseBearerToken(request);
            if (token == null){
                filterChain.doFilter(request,response);
                return;
            }
            String email = jwtProvider.validate(token);

            if (email == null) {
                return;
            }

            // 1. 첫번쨰는 아이디 2. 두번쨰는 password, 3번쨰는 권한
            AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);

            // 웹인증 세부정보 소스
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            //외부에서 사용할 수 있도록 컨텍스트에 등록
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

            securityContext.setAuthentication(authenticationToken);

            SecurityContextHolder.setContext(securityContext);
        }catch (Exception e ){
            e.printStackTrace();

        }
        // 모두 통과했으면 다음 필터로 넘기기
        filterChain.doFilter(request, response);
    }

    private String parseBearerToken (HttpServletRequest request){

        String authorization = request.getHeader("Authorization");

        // .hasText 는 null 이거나 길이가 0 이거나 공백이면 false 반환,
        // 그렇지 않으면 true
        boolean hasAuthorization = StringUtils.hasText(authorization);

        if (!hasAuthorization) return null;
        // authorization의 시작이 Bearer 가 아니면 null 반환
        boolean isBearer = authorization.startsWith("Bearer ");

        if (isBearer) return null;
        // 최종적으로 다 통과하면 7번째부터 토큰 회수
        String token = authorization.substring(7);

        return token;
    }

}
