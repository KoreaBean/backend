package com.example.backend.repository;

import com.example.backend.dto.object.FavoriteListItem;
import com.example.backend.entity.FavoriteEntity;
import com.example.backend.entity.primary.FavoritePk;
import com.example.backend.repository.resultSet.GetFavoriteListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {

    FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);


    @Query(value =
            "SELECT " +
            "U.email as email, " +
            "U.nickname as nickname, " +
            "U.profile_image as profileImage " +
            "from favorite as F " +
            "inner Join user as U " +
            "on F.user_email = U.email " +
            "where F.board_number = ?1 ",
            nativeQuery = true
    )
    List<GetFavoriteListResultSet> getFavoriteList(Integer boardNumber);

}
