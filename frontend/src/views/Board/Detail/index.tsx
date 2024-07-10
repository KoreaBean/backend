import React, {useEffect, useState} from 'react'
import './style.css';
import FavoriteItem from "../../../components/FavoriteItem";
import {CommnetListItem, FavoriteListItem} from "../../../types/interface";
import favoriteListMock from "../../../mocks/favorite-list.mock";
import CommentListMock from "../../../mocks/comment-list.mock";
import CommentItem from "../../../components/CommentItem";
import Pagination from "../../../components/Pagination";
import defaultProfileImage from 'assets/image/default-profile-image.png'

//          component 게시물 전체 컴포넌트          //
export default function BoardDetail() {

  //          state : more 버튼 상태          //
  const [showMore, setShowMore] = useState<boolean>(false)


  //          event handler : more 버튼 클릭 이벤트 처리         //
  const onMoreButtonClickHandler = () => {
    setShowMore(!showMore)
  }

  //          component 게시물 상세 상단 컴포넌트          //
  const BoardDetailTop = () => {

    return (
        <div id='board-detail-top'>
          <div className='board-detail-top-header'>
            <div className='board-detail-title'>{'오늘 점심 뭐먹지 맛있는 거 먹고 싶은데 추천 부탁 온ㄹ 점심 뭐먹지 맛있는ㄴ거 먹고 싶은데 추천 부탁'}</div>
            <div className='board-detail-top-sub-box'>
              <div className='board-detail-write-info-box'>
                <div className='board-detail-writer-profile-image' style={{backgroundImage : `url(${defaultProfileImage})`}}></div>
                <div className='board-detail-writer-nickname'>{'안녕하세요'}</div>
                <div className='board-detail-info-divider'>{"\|"}</div>
                <div className='board-detail-write-date'>{'2024-01-01'}</div>
              </div>
              <div className='icon-button' onClick={onMoreButtonClickHandler}>
                <div className='icon more-icon'></div>
              </div>
              {showMore &&  <div className='board-detail-more-box'>
                <div className='board-detail-update-button'>{'수정'}</div>
                <div className='divider'></div>
                <div className='board-detail-delete-button'>{'삭제'}</div>
              </div>}
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-top-main'>
            <div className='board-detail-main-text'>{'오늘 점심을 뭐먹을지 너무 고민이 되는데 뭐 먹을까? 나점심떄 오늘 ㅈㅁ시 ㅁ뭐거머긍리지 '}</div>
            <img className='board-detail-main-image' src={'https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202407/10/THEFACT/20240710134521464legf.jpg'} ></img>
          </div>
        </div>
    )
  }



  //          component 게시물 상세 하단 컴포넌트          //
  const BoardDetailBottom = () => {

    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([])
    const [commentList, setCommentList] = useState<CommnetListItem[]>([])

    useEffect(() => {
      setFavoriteList(favoriteListMock)
      setCommentList(CommentListMock)
    })

    return (
        <div id='board-detail-bottom'>
          <div className='board-detail-bottom-button-box'>
            <div className='board-detail-bottom-button-group'>
              <div className='icon-button'>
                <div className='icon favorite-fill-icon'></div>
              </div>
              <div className='board-detail-bottom-button-text'>{`종아요 ${12}`}</div>
              <div className='icon-button'>
                <div className='icon up-light-icon'></div>
              </div>
            </div>
            <div className='board-detail-bottom-button-group'>
              <div className='icon-button'>
                <div className='icon comment-icon'></div>
              </div>
              <div className='board-detail-bottom-button-text'>{`댓글 ${12}`}</div>
              <div className='icon-button'>
                <div className='icon up-light-icon'></div>
              </div>
            </div>
          </div>
          <div className='board-detail-bottom-favorite-box'>
            <div className='board-detail-bottom-favorite-container'>
              <div className='board-detail-bottom-favorite-title'>{'좋아요'}<span className='emphasis'>12</span></div>
              <div className='board-detail-bottom-favorite-contents'>
                {favoriteList.map((item) => <FavoriteItem favoriteItem={item}/> )}
              </div>
            </div>
          </div>
          <div className='board-detail-bottom-comment-box'>
            <div className='board-detail-bottom-comment-container'>
              <div className='board-detail-bottom-comment-title'>{'댓글'}<span className='emphasis'>{'12'}</span></div>
              <div className='board-detail-bottom-comment-list-container'>
                {commentList.map((item) => <CommentItem commentList={item} />)}
              </div>
            </div>
            <div className='divider'></div>
            <div className='board-detail-bottom-comment-pagination-box'>
              <Pagination />
            </div>
            <div className='board-detail-bottom-comment-input-container'>
              <div className='board-detail-bottom-comment-input-container'>
                <textarea className='board-detail-bottom-comment-textarea' placeholder={'댓글을 작성해 주세요.'} />
                <div className='board-detail-bottom-comment-button-box'>
                  <div className='disable-button'>{'댓글달기'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }


  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>

        <BoardDetailTop/>
        <BoardDetailBottom/>

      </div>
    </div>
  )
}
