package com.example.backend.repository;

import com.example.backend.entity.BoardListViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity,Integer> {

    List<BoardListViewEntity> findByOrderByWriteDatetimeDesc();

    List<BoardListViewEntity> findByWriteEmailOrderByWriteDatetimeDesc(String writerEmail);
}
