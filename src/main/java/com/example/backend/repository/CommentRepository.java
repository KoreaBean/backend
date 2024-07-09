package com.example.backend.repository;

import com.example.backend.dto.object.CommentListItem;
import com.example.backend.entity.CommentEntity;
import com.example.backend.repository.resultSet.GetCommentListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity,Integer> {

    @Query(
            value =
            "select " +
            "U.nickname as nickname, " +
            "U.profile_image as profileImage, " +
            "C.write_datetime as writeDatetime, " +
            "C.content as content " +
            "from comment as C " +
            "inner Join user as U " +
            "on C.user_email = U.email " +
            "where C.board_number = ?1 " +
            "order by write_datetime desc ",
            nativeQuery = true

    )
    List<GetCommentListResultSet> getCommentList(Integer boarNumber);

}
