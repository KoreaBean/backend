import React, { ChangeEvent, useRef, useState,KeyboardEvent, useEffect } from 'react'
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from '../../contant'
import { useBoardStore, useLoginUserStore } from 'stores'
import path from 'path'
import {useCookies} from "react-cookie";
import {fileUploadRequest, postBoardRequest} from "../../apis";
import {PostBoardRequestDto} from "../../apis/request/board";
import {PostBoardResponseDto} from "../../apis/response/board";
import ResponseDto from "../../apis/response/response.dto";

//          component : 헤더 컴포넌트         //
export default function Header() {

//          state : Login User 상태

const {loginUser, setLoginUser, resetLoginUser} =useLoginUserStore();
const {boardImageFileList ,resetBoard} = useBoardStore();

//          state : path 상태           //
const {pathname} = useLocation();

//          state: cookie 상태            //
const [cookies, setCookies] = useCookies();

//          state : 로그인 상태         //
const [isLogin, setLogin] = useState<boolean>(false);

const isAuthPage = pathname.startsWith(AUTH_PATH());
const isMainPage = pathname === MAIN_PATH();
const isSearchPage = pathname.startsWith(BOARD_PATH()+'/'+SEARCH_PATH(''));
const isBoardDetailPage = pathname.startsWith(BOARD_PATH()+'/'+BOARD_DETAIL_PATH(''))
const isBoardWritePage = pathname.startsWith(BOARD_PATH()+'/'+BOARD_WRITE_PATH())
const isBoardUpdatePage = pathname.startsWith(BOARD_PATH()+'/'+BOARD_UPDATE_PATH(''))
const isUserPage =pathname.startsWith(USER_PATH(''))

console.log(MAIN_PATH())





//          function : 네비게이트  함수         //

const navigate =useNavigate()

//          event handler: 로고 클릭 이벤트 처리 함수         //

const onLogoClickHandler = () => {
  navigate(MAIN_PATH());
}



//          component : 검색 버튼 컴포넌트          //
const SearchButton = () => {

  //          state : 검색 버튼 상태         //
  const [status,setStatus] = useState<boolean>(false);

  //          state : 검색어 상태         //
  const [word, setWord] = useState<string>('');

  //          state : 검색 버튼 요소 참조 상태          //
  const searchButtonRef = useRef<HTMLDivElement | null>(null);
  //          state : effect에서 사용할 searchWord  Param
  const {searchWord} = useParams();



  //        event handler : 검색 아이콘 클릭 이벤트 처리 함수         //
  const onSearchButtonClickHandler = () => {
    if(!status){
      setStatus(!status);
      return;
    } 
    navigate(SEARCH_PATH(word))
  }

  //          event handler : 검색어 키 이벤트 처리 함수          //
  const onSearchWordKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!searchButtonRef.current) return;
    searchButtonRef.current.click();
  }

  //          event handler : 검색어 입력 변경 함수         //
  const onSearchWordChangeHandler = (event : ChangeEvent<HTMLInputElement>) =>{
    setWord(event.target.value);

  }

  //            effect : 검색어 변경 될 때마다 실행될 함수          //
  useEffect(() => {
    if(searchWord){
      setWord(searchWord);
      setStatus(true);
    }
  },[searchWord]);

  useEffect(() => {
    if (cookies.accessToken) setLogin(true)
    else setLogin(false)
  },[cookies])


  if(!status){
    return(
      <div className='icon-button' onClick={onSearchButtonClickHandler}>
        <div className='icon search-right-icon'></div>
      </div>
      )
  }
  return(
    <div className='header-search-input-box'>
      <input className='header-search-input' type='text' placeholder='검색어를 입력해 주세요.' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler}/>
      <div className='icon-button' ref={searchButtonRef} onClick={onSearchButtonClickHandler}>
        <div className='icon search-right-icon'></div>
      </div>
    </div>
  )
}


//          component : 로그인 또는 마이페이지 버튼 컴포넌트          //
const LoginMyPageButton = () => {

  //        event handler : 마이페이지 버튼 클릭 이벤트 처리 함수   //
  const onMyPageButtonClickHandler = ()=> {
    if(!loginUser) return;

    const {email} = loginUser;

    navigate(USER_PATH(email));
  }

  //        event handler : 로그인 버튼 클릭 이벤트 함수          //
  const onLoginButtonClickHandler = () => {
    navigate(AUTH_PATH());
  }

  const {userEmail} = useParams();

  const onLogoutButtonClickHandler = () => {
    resetLoginUser();
    navigate(MAIN_PATH());
  }
  
  //          render : 로그아웃 버튼 컴포넌트 렌더링          //
  if(isLogin && userEmail === loginUser?.email){
    <div className='white-button' onClick={onLogoutButtonClickHandler}>{'로그아웃'}</div>
  }

  if(isLogin){
  //          render : 마이페이지 버튼 렌더링         //
  return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>
  }
  //          render : 로그인 버튼 렌더링         //
  return <div className='black-button' onClick={onLoginButtonClickHandler}>{'로그인'}</div>

}

//          function : post board response 처리 함수
  const postBoardResponse = (responseBody : PostBoardResponseDto | ResponseDto | null) => {
    if (!responseBody) return;

    const {code} = responseBody

    if (code === "AF" || code === "NU"){
      navigate(AUTH_PATH())
      return;
    }
    if (code === "VF"){
      alert("제목과 내용은 필수입니다.")
    }
    if (code === "DBE"){
      alert("데이터베이스 오류입니다.")
    }
    if (code !== "SU"){
      return;
    }
    resetBoard();

    if (!loginUser){
      return;
    }
    const {email} = loginUser
    navigate(USER_PATH(email))

  }


//          component : 업로드 버튼 컴포넌트          //

  const UploadButton = () => {

    //          state : 게시물 상태         //
    const {title, content, boardImageFileList, resetBoard} = useBoardStore();

    //          event handler : 업로드 버튼 클릭 이벤트 함수 처리         //
    const onUploadButtonClickHandler = async () => {
      // JWT 쿠키
      const accessToken = cookies.accessToken;
      // JWT 쿠키가 없다면
      if (!accessToken){
        alert("로그인 후 다시 시도해주세요.")
        return;
      }
      //String 배열의 객체 생성
      const boardImageList : string[] = [];
      // foreach는 동기 작업이 안돼서 for 문 사용
      // 전역 boardImageFIleLIst 에서 file을 하나씩 가져오기
      for (const file of boardImageFileList){
        // FomData 객체 생성
        // FomData 란 Http 요청을 통해 서버로 전송 될 때 'multipart/form-data' 형식으로 인코딩
        const data= new FormData()
        // FomData 에 append 하는데 key 값은 'file' 이고 value 값은 file

        data.append('file',file)

        const url = await fileUploadRequest(data);
        if (url) boardImageList.push(url);
      }
      const requestBody : PostBoardRequestDto = {
        title, content, boardImageList
      }
      postBoardRequest(requestBody,accessToken).then(postBoardResponse)
    }
    //          render : 업로드 버튼 렌더링         //
    if(title && content)
    return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>
    
    //          render : 업로드 불가 버튼 렌더링         //
    return <div className='disable-button' >{'업로드'}</div>
  }

  return (
    
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'Hoons'}</div>
        </div>
        <div className='header-right-box'>
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton/>}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <LoginMyPageButton/>}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton/>}
        </div>
      </div>
    </div>
  )
}
