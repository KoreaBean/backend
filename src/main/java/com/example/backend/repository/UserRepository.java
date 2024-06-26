package com.example.backend.repository;

import com.example.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,String> {

    boolean existsByEmail(String Email);
    boolean existsByNickname(String Nickname);
    boolean existsByTelNumber(String TelNumber);


    UserEntity findByEmail(String email);

}
