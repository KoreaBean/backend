package com.example.backend.repository;

import com.example.backend.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity,Integer> {

    BoardEntity findByBoardNumber(int boardNumber);


}
