import React from 'react'
import './style.css'
import { FavoriteListItem } from 'types/interface'
import defaultImage from 'assets/image/dog.png'


interface Props {
  favoriteItem : FavoriteListItem
}


export default function FavoriteItem({favoriteItem}:Props) {

  const {nickname,profileImage} = favoriteItem


  return (
    <div className='favorite-list-item'>
      <div className='favorite-list-item-profile-box'>
        <div className='favorite-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultImage})`}}></div>
      </div>
      <div className='favorite-list-item-nickname'>{nickname}</div>
    </div>
  )
}
