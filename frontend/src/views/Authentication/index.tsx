import React, {useState, KeyboardEvent, useRef, ChangeEvent} from 'react'
import './style.css';
import InputBox from "../../components/InputBox";
import Top3item from "../../components/Top3item";
import {SignInRequestDto} from "../../apis/request/auth";
import {signInRequest, signUnRequest} from "../../apis";
import {SignInResponseDto, SignUpResponseDto} from "../../apis/response/auth";
import {ResponseDto} from "../../apis/response";
import {useCookies} from "react-cookie";
import {MAIN_PATH} from "../../contant";
import {useNavigate} from "react-router-dom";
import {text} from "stream/consumers";
import {Address, useDaumPostcodePopup} from "react-daum-postcode";
import signUpRequestDto from "../../apis/request/auth/sign-up.request.dto";
import responseDto from "../../apis/response/response.dto";


//          component : 인증 화면 컴포넌트        //
export default function Authentication() {

  //          state : 화면 상태
  const [view, setView] = useState<'sign-in'|'sign-up'>('sign-in')

  //          state : 쿠키 상태
  const [cookies, setCookies] = useCookies();

  //          function : navigator 함수
  const navigator = useNavigate();




  //          Component : Sign in Card

  const SignInCard = () => {

    //          state : 이메일 요소 참조 상태
    const emailRef = useRef<HTMLInputElement | null>(null)
    //          state : 패스워드 요소 참조 상태
    const passwordRef = useRef<HTMLInputElement | null>(null)

    //          state : 이메일 상태
    const [email, setEmail] = useState<string>('')

    //          state : 패스워드 상태
    const [password, setPassword] = useState<string>('')

    //          state : 패스워드 타입 상태
    const [passwordType,setPasswordType] = useState<'text'|'password'>('password');

    //          state : 에러 상태
    const [error, setError] = useState<boolean>(false);

    //          state : 패스워드 버튼 아이콘 상태
    const [passwordButtonIcon,setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon')


    //          event Handler : 패스워드 버튼 클릭 이벤트 처리 함수
    const onPasswordButtonClickHandler = () => {
      if (passwordType === 'text'){
        setPasswordType('password')
        setPasswordButtonIcon('eye-light-off-icon')
      }else {
        setPasswordType('text')
        setPasswordButtonIcon('eye-light-on-icon')
      }
    }

    //          event Handler : 이메일 인풋 키 다운 이벤트 처리
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    }
    //          event Handler : password 인풋 키 다운 이벤트 처리
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignInButtonClickHandler()
    }

    //          event Handler : 이메일 변경 이벤트 처리
    const onEmailChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setEmail(value)
    }
    //          event Handler : 비밀번호 변경 이벤트 처리
    const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setPassword(value)
    }



    //          event handler : 로그인 버튼 클릭 이벤트 처리
    const onSignInButtonClickHandler = () => {
      const requestBody : SignInRequestDto = {email, password};
      signInRequest(requestBody).then(signInResponse);
    }

    //          function : sign in response 처리 함수
    const signInResponse = (responseBody : SignInResponseDto | ResponseDto | null) => {
      if (!responseBody){
        alert('네트워크 이상입니다.');
        return;
      }
      const {code} = responseBody;
      console.log(responseBody)
      if (code === 'DBE'){alert('데이터베이스 오류입니다.')}
      if (code === 'SF' || code === 'VF' || code === null){setError(true)}
      if (code !== 'SU') {
        setError(true)
        return;
      }

      const {token, expirationTime} = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);
      setCookies('acceessToken', token,{expires, path:MAIN_PATH()})
      navigator(MAIN_PATH())
    }

    const onChangeViewHandler = () => {
      setView('sign-up')
    }

    return(
        <div className='auth-card'>
          <div className='auth-card-box'>
            <div className='auth-card-top'>
              <div className='auth-card-title-box'>
                <div className='auth-card-title'>{'로그인'}</div>
              </div>
              <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' value={email} onChange={onEmailChangeHandler} error={error} onKeyDown={onEmailKeyDownHandler}/>
              <InputBox ref={passwordRef} label={'패스워드'} type={passwordType} placeholder={'비밀번호를 입력해주세요.'} value={password} onChange={onPasswordChangeHandler} error={error} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
            </div>
            <div className='auth-card-bottom'>
              {
               error &&
                  <div className='auth-sign-in-error-box'>
                    <div className='auth-sign-in-error-message'>
                      {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요'}
                    </div>
                  </div>
              }
              <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
              <div className='auth-description-box'>
                <div className='auth-description'>{'신규 사용자이신가요?'}<span className='auth-description-link' onClick={onChangeViewHandler}>{'회원가입'}</span></div>
              </div>
            </div>
          </div>
        </div>
    )
  }

  //          Component : Sign Up Card

  const SignUnCard = () => {

    //          state : 페이지 번호 상태
    const [page, setPage] = useState<1| 2>(1);

    //          state : 이메일 요소 참조 상태
    const emailRef = useRef<HTMLInputElement | null>( null);


    //          state : 이메일 상태
    const [email, setEmail] = useState<string>('');

    //          state : 패스워드 상태
    const [password, setPassword] = useState<string>('');

    //          state : 패스워드 요소 참조 상태
    const  passwordRef = useRef<HTMLInputElement | null>(null)


    //          state : 패스워드 확인 상태
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    //          state : 패스워드 요소 참조 상태
    const passwordCheckRef = useRef<HTMLInputElement | null>( null)

    //          state : 패스워드 타입 상태
    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password')

    //          state : 패스워드 체크 타입 상태
    const [passwordCheckType, setPasswordCheckType] = useState<'password' | 'text'>('password')

    //          state : 이메일에러 상태
    const [isEmailError,setIsEmailError] = useState<boolean>(false)
    //          state : 패스워드에러 상태
    const [isPasswordError,setIsPasswordError] = useState<boolean>(false)
    //          state : 패워드 체크에러 상태
    const [isPasswordCheckError,setIsPasswordCheckError] = useState<boolean>(false)

    //          state : 이메일 에러 메시지 상태
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')

    //          state : 패스워드 에러 메시지 상태
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')

    //          state : 패스워드 확인 에러 메시지 상태
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('')


    //          state : 패스워드 버튼 아이콘 상태
    const [passwordButtonIcon, setPasswordButtonIcon] =useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon')

    //          state : 패스워드 체크 버튼 아이콘 상태
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] =useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon')


    //          state : 닉네임 상태
    const [nickname, setNickname] = useState<string>('')

    //          state : 핸드폰 번호 상태
    const [telNumber, setTelNumber] = useState<string>('')
    //          state 주소 상태
    const [address, setAddress] = useState<string>('')
    //          state : 상세 주소 상태
    const [addressDetail,setAddressDetail] = useState<string>('')

    //          state : 개인 정보 동의 상태
    const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false)


    //          state : 닉네임 ref
    const nickNameRef = useRef<HTMLInputElement | null>(null)

    //          state : 핸드폰 번호 ref
    const tellNumberRef = useRef<HTMLInputElement | null>(null)
    //          state : 주소 ref
    const addressRef = useRef<HTMLInputElement | null>(null)
    //          state : 상세 주소 ref
    const addressDetailRef = useRef<HTMLInputElement | null>(null)

    //          state : 닉네임 에러 상태
    const [isNickNameError,setIsNickNameError] = useState<boolean>(false)
    //          state : 닉네임 에러 메시지 상태
    const [nickNameErrorMessage, setNickNameErrorMessage] = useState<string>('')

    //          state : 핸드폰 번호 에러 상태
    const [isTellNumberError, setTellNumberError] = useState<boolean>(false)
    //          state : 핸드폰 번호 에러 메시지 상태
    const [tellNumberErrorMessage, setTellNumberErrorMessage] = useState<string>('')

    //          state : 주소 에러 상태
    const [isAddressError, setAddressError] = useState<boolean>(false)
    //          state : 주소 에러 메시지 상태
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>('')
    //          state : 개인정보 동의 에러 상태
    const [isAgreedPersonalError, setIsAgreedPersonalError] = useState<boolean>(false)
    //          state : 개인정보 동의 에러 메시지 상태
    const [agreedPersonalErrorMessage, setAgreedPersonalErrorMessage] = useState<string>('')


    //          function :  다음 주소 검색 팝업 오픈 함수
    const open = useDaumPostcodePopup()




    //          event Handler : 이메일 변경 이벤트 처리
    const onEmailChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setEmail(value)
    }


    //          event Handler : 비밀번호 변경 이벤트 처리
    const onPasswordChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setPassword(value)
    }


    //          event Handler : 비밀번호 확인 변경 이벤트 처리
    const onPasswordCheckChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setPasswordCheck(value)
    }


    //          event handler : 이메일 엔터 키 이벤트 핸들러
    const onEmailKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef) return;
      passwordRef.current?.focus()
    }
    //          event handler : 패스워드 Ref 키 이벤트 핸들러
    const onPasswordKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordCheckRef) return;
      passwordCheckRef.current?.focus()
    }
    //          event handler : 패스워드 확인 Ref엔터 키 이벤트 핸들러
    const onPasswordCheckKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onNextButtonClickHandler()
      if (!nickNameRef.current) return;
      nickNameRef.current?.focus()
    }

    //          event handler : 패스워드 버튼 아이콘 이벤트 핸들러
    const onPasswordButtonIconHandler = () => {

      if (passwordType == 'password'){
        setPasswordButtonIcon('eye-light-on-icon')
        setPasswordType('text')
      }else {
        setPasswordButtonIcon('eye-light-off-icon')
        setPasswordType('password')

      }
    }



    //          event handler : 패스워드 체크 버튼 아이콘 이벤트 핸들러
    const onPasswordCheckButtonIconHandler = () => {
      if (passwordCheckType == 'password'){
        setPasswordCheckButtonIcon('eye-light-on-icon')
        setPasswordCheckType('text')
      }else {
        setPasswordCheckButtonIcon('eye-light-off-icon')
        setPasswordCheckType('password')

      }
    }

    //          event handler 다음 버튼 클릭 이벤트 처리
    const onNextButtonClickHandler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z0-9]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if (!isEmailPattern){
        setIsEmailError(true)
        setEmailErrorMessage('이메일 주소 포맷이 맞지 않습니다. 중복되는 이메일 주소입니다.')
      }
      if (isEmailPattern) {
        setIsEmailError(false)
        setEmailErrorMessage('')
      }

      const isCheckPassword = password.trim().length >= 8
      if (!isCheckPassword){
        setIsPasswordError(true)
        setPasswordErrorMessage("패스워드는 8자 이상 입력해주세요.")
      }else {
        setIsPasswordError(false)
        setPasswordErrorMessage('')
      }

      const isEqualPassword = password === passwordCheck
      if (!isEqualPassword){
        setIsPasswordCheckError(true)
        setPasswordCheckErrorMessage("비밀번호가 일치하지 않습니다.")
      }else {
        setIsPasswordCheckError(false)
        setPasswordCheckErrorMessage('')
      }
      if (!isEmailPattern || !isCheckPassword || !isEqualPassword) return;

      setPage(2)
    }

    //          event handler : 회원가입 버튼 클릭 이벤트 처리
    const onSignUpButtonClickHandler = () => {
      if (!agreedPersonal){
        alert('개인정보를 동의 해주세요')
        return;
      }
      alert('회원가입 버튼!')

      const requestBody: signUpRequestDto = {email,password,nickname,telNumber,address,addressDetail,agreedPersonal}
      signUnRequest(requestBody).then(signUpResponse)
    }

    //          function : 회원가입 요청 처리 함수
    const signUpResponse = (responseBody : ResponseDto | SignUpResponseDto | null) => {
      if (!responseBody) {
        alert('네트워크 이상입니다.')
        return;
      }
      const {code} = responseBody

      if (code !== 'SU'){
        alert(code)
        return;
      }
      alert("회원가입 성공")
      navigator(MAIN_PATH())

    }



    //          event handler : 로그인 버튼 클릭 핸들러
    const onSignInClickHandler = () => {
      setView("sign-in")
    }


    //          event handler : 닉네임 변경 핸들러
    const nickNameChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target
      setNickname(value)
    }

    //          event handler : 핸드폰 번호 변경 핸들러
    const tellNumberChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target
      setTelNumber(value)
    }

    //          event handler : 상세 주소 변경 핸들러
    const addressDetailChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target
      setAddressDetail(value)
    }

    //          event handler : 닉네임 ref 변경 핸들러
    const nickNameRefChangeHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!tellNumberRef.current) return;
      tellNumberRef.current?.focus()
    }

    //          event handler : 핸드폰 번호 ref 변경 핸들러
    const tellNumberRefChangeHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if (event.key == 'Enter' || event.key == 'Tab'){
        addressButtonClickHandler()

      }else return;
    }

    //          event handler : 주소 ref 변경 핸들러
    const addressRefChangeHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!addressDetailRef) return;
      addressDetailRef.current?.focus()
    }

    //        event handler : 상세주소 ref 변경 핸들러
    const addressDetailRefChangeHandler = (event : KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignUpButtonClickHandler()

    }

    //         event handler : 주소 아이콘 클릭 핸들러
    const addressButtonClickHandler = () => {
      open({onComplete});
    }

    //         event handler : 다음 주소 검색 완료 이벤트 처리
    const onComplete = (data : Address) => {
      const {address} = data
      setAddress(address)
      if (!addressDetailRef.current) return;
      addressDetailRef.current?.focus()
    }

    //          event handler : 개인정보 동의 체크박스 클릭 이벤트
    const onAgreedPersonalClickHandler = () => {
      setAgreedPersonal(!agreedPersonal)
      setIsAgreedPersonalError(false)
    }




    //          render : sign Up card 컴포넌트 랜더링
    return(
        <div className='auth-card'>
          <div className='auth-card-box'>
            <div className='auth-card-top'>
              <div className='auth-card-title-box'>
                <div className='auth-card-title'>{'회원가입'}</div>
                <div className='auth-card-page'>{`${page}/2`}</div>
              </div>
              {page === 1 && (
                <>
                  <InputBox ref={emailRef} label={'이메일 주소*'} type={'text'} placeholder={'이메일 주소를 입력해주세요'} value={email} onChange={onEmailChangeHandler} error={isEmailError} onKeyDown={onEmailKeyDownHandler} message={emailErrorMessage}/>
                  <InputBox ref={passwordRef} label={'비밀번호*'} type={passwordType} placeholder={'비밀번호를 입력해주세요'} value={password} onChange={onPasswordChangeHandler} error={isPasswordError} onKeyDown={onPasswordKeyDownHandler} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonClick={onPasswordButtonIconHandler}/>
                  <InputBox ref={passwordCheckRef} label={'비밀번호 확인*'} type={passwordCheckType} placeholder={'비밀번호를 다시 입력해주세요'} value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} onKeyDown={onPasswordCheckKeyDownHandler} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonIconHandler}/>
                </>
              )}

              {page === 2 && (
                  <>
                    <InputBox ref={nickNameRef} label={"닉네임*"} type={"text"} placeholder={"닉네임을 입력해주세요"} value={nickname} onChange={nickNameChangeHandler} error={isNickNameError}  onKeyDown={nickNameRefChangeHandler} message={nickNameErrorMessage}/>
                    <InputBox ref={tellNumberRef} label={"핸드폰 번호*"} type={"text"} placeholder={"핸드폰 번호를 입력해주세요"} value={telNumber} onChange={tellNumberChangeHandler} error={isTellNumberError}  onKeyDown={tellNumberRefChangeHandler} message={tellNumberErrorMessage}/>
                    <InputBox ref={addressRef} label={"주소*"} type={"text"} placeholder={"우편번호 찾기"} value={address} onChange={nickNameChangeHandler} error={isAddressError}  onKeyDown={addressRefChangeHandler} icon={'expand-right-light-icon'} onButtonClick={addressButtonClickHandler} message={addressErrorMessage}/>
                    <InputBox ref={addressDetailRef} label={"상세 주소"} type={"text"} placeholder={"상세 주소를 입력해주세요"} value={addressDetail} onChange={addressDetailChangeHandler} onKeyDown={addressDetailRefChangeHandler} error={false}/>

                  </>

              )}


            </div>
            <div className='auth-card-bottom'>
              {page === 1 && (
                  <div className='black-large-full-button' onClick={onNextButtonClickHandler}>{'다음 단계'}</div>
              )}
              {page === 2 && (
                  <>
                    <div className='auth-consent-box'>
                      <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>
                        <div className={`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-right-icon'}`}onClick={onAgreedPersonalClickHandler}></div>
                      </div>
                      <div className={isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>{'개인정보동의'}</div>
                      <div className='auth-consent-link'>{'더보기 >'}</div>
                    </div>
                    <div className='black-large-full-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                  </>
              )}
              <div className='auth-description-box'>
                <div className='auth-description'>{'이미 계정이 있으신가요?'}<span className='auth-description-link' onClick={onSignInClickHandler}>{'로그인'}</span></div>
              </div>
            </div>
          </div>
        </div>
    )
  }



  //          render
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다'}</div>
              <div className='auth-jumbotron-text'>{'Hoons BOARD 입니다.'}</div>
            </div>
          </div>
        </div>
        <div>
          {view == 'sign-in' && <SignInCard/>}
          {view == 'sign-up' && <SignUnCard/>}
        </div>
      </div>
    </div>
  )
}
