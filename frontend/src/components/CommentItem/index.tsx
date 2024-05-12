import React from 'react'
import './style.css'
import { CommnetListItem } from 'types/interface'
import defaultImage from 'assets/image/testImage.png'
interface Props {
  commentList : CommnetListItem
}

export default function CommentItem({commentList} :Props) {

  const {nickname,profileImage,writeDatetime,content} = commentList;



  return (
    <div className='comment-list-item'>
      <div className='comment-list-item-top'>
        <div className='comment-list-item-profile-box'>
          <div className='comment-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultImage})`}}></div>
        </div>
        <div className='comment-list-item-nickname'>{nickname}</div>
        <div className='comment-list-item-divider'>{'|'}</div>
        <div className='comment-list-item-time'>{writeDatetime}</div>
      </div>
      <div className='comment-list-item-main'>
        <div className='comment-list-item-content'>{content}</div>
      </div>
    </div>
  )
}
