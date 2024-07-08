package com.example.backend.repository;

import com.example.backend.entity.BoardEntity;
import com.example.backend.repository.resultSet.GetBoardResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity,Integer> {

    BoardEntity findByBoardNumber(int boardNumber);

    boolean existsByBoardNumber(int boardNumber);

    @Query(
            value =
            "SELECT " +
            "B.board_number AS board_number, " +
            "B.title AS title, " +
            "B.content AS content, " +
            "B.write_datetime AS write_datetime, " +
            "B.writer_email AS writer_email, " +
            "U.nickname AS writer_nickname, " +
            "U.profile_image AS writer_profile_image " +
            "from board AS B " +
            "INNER JOIN user AS U " +
            "ON B.writer_email = U.email " +
            "WHERE board_number = ?1 ",// ?1 은 getBoard 에서의 첫번째 매개변수를 넣겠다
            nativeQuery = true
    )
    GetBoardResultSet getBoard(Integer boardNumber);


}
