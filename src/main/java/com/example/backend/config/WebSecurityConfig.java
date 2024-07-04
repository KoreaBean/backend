package com.example.backend.config;

import com.example.backend.filter.JwtAuthenticationFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.*;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception{


        httpSecurity.cors(CorsConfigurer::and)
                        .csrf(CsrfConfigurer::disable)
                                .httpBasic(HttpBasicConfigurer::disable)
                                        .sessionManagement(SessionManagementConfigurer -> SessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        httpSecurity.authorizeHttpRequests(request -> request
                .requestMatchers("/*","/api/v1/auth/**","/api/v1/user/**","/api/v1/board/**","avi/v1/user","/file/*").permitAll()
                .anyRequest().authenticated());



        httpSecurity.exceptionHandling(ExceptionHandlingConfigurer -> ExceptionHandlingConfigurer.authenticationEntryPoint(new FailedAuthenticationEntryPoint()));
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();


    }

}

class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)throws IOException, ServletException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{ \"code\" : \"AF \", \" message \" : \" Authorization Failed. \"}");

    }

}
