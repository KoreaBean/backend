import React from 'react'
import 'components/Top3item/style.css';
import defualtImage from 'assets/image/testImage.png';
import { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';

interface Props {
  top3ListItem : BoardListItem
}

//        component : Top 3 List item 컴포넌트          //
export default function Top3item({top3ListItem} : Props) {


  // properties         //
  const {boardNumber, title,content,boardTitleImage,favoriteCount, commentCount,viewCount,writeDatetime,writerNickname,writerProfileImage} = top3ListItem


  //      function 네비게이션

  //const navigator = useNavigate();

  // event handler

  const onClick = () => {
    //navigator(boardNumber);
  }



  //          render : Top 3 List Item 컴포넌트 렌더링  //
  return (
    <div className='top-3-list-item' style={{backgroundImage: `url(${boardTitleImage})`}} onClick={onClick}>
      <div className='top-3-list-item-main-box'>
        <div className='top-3-list-item-top'>
          <div className='top-3-list-item-profile-box'>
            <div className='top-3-list-item-profile-image' style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defualtImage})`}}>
            </div>
          </div>
          <div className='top-3-list-item-write-box'>
            <div className='top-3-list-item-nickname'>{writerNickname}</div>
            <div className='top-3-list-item-write-date'>{writeDatetime}</div>
          </div>
        </div>
        <div className='top-3-list-item-mid'>
          <div className='top-3-list-item-title'>{title}</div>
          <div className='top-3-list-item-content'>{content}</div>
        </div>
        <div className='top-3-list-item-bottom'>
          <div className='top-3-list-item-counts'>{`댓글 ${commentCount} ； 좋아요 ${favoriteCount} ； 조회수 ${viewCount}`}</div>
        </div>
      </div>
    </div>
  )
}
