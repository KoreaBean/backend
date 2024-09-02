import React, {useEffect} from 'react';
import './App.css';
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH, BOARD_DETAIL_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH } from './contant';

import Container from 'layouts/Container';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Authentication from 'views/Authentication';
import BoardDetail from 'views/Board/Detail';
import BoardUpdate from 'views/Board/Update';
import BoardWrite from 'views/Board/Write';
import Main from 'views/Main';
import Search from 'views/Search';
import UserP from 'views/User';
import {useCookies} from "react-cookie";
import {useLoginUserStore} from "./stores";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import {getSignInUserRequest} from "./apis";
import {GetSignInUserResponseDto} from "./apis/response/user";
import {User} from "./types/interface";
import ResponseDto from "./apis/response/response.dto";

function App() {
  //          state : 로그인 유저 전역 상태
  const {setLoginUser, resetLoginUser} = useLoginUserStore();
  //          state : cookie 상태
  const [cookies, setCookies] = useCookies();

  const getSignInUserResponse = (responseBody : GetSignInUserResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const {code} = responseBody;
    if (code == 'AF' || code == 'NU' || code == 'DBE'){
      resetLoginUser()
      return;
    }
    const loginUser : User = {...responseBody as GetSignInUserResponseDto}
    setLoginUser(loginUser)
  }


  //          effect : accessToken cookie 값이 변경될 떄마다 실행될 함수
  useEffect(() => {
    if (!cookies.accessToken){
      resetLoginUser()
      return;
    }
    getSignInUserRequest(cookies.accessToken)
        .then(getSignInUserResponse)


  },[cookies.accessToken])




  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Container/>}>
            <Route path={MAIN_PATH()} element={<Main/>}/>
            <Route path={AUTH_PATH()} element={<Authentication/>}/>
            <Route path={SEARCH_PATH(':searchWord')} element={<Search/>}/>
            <Route path={USER_PATH(':userEmail')} element={<UserP/>}/>
            <Route path='/board'>
              <Route path={BOARD_WRITE_PATH()} element={<BoardWrite/>}/>
              <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate/>}/>
              <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail/>}/>
            </Route>
            <Route path='*' element={<h1>404 Not Found</h1>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
