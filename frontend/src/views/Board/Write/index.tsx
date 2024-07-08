import React, {ChangeEvent, ChangeEventHandler, useEffect, useRef, useState} from 'react'
import './style.css';
import {useBoardStore, useLoginUserStore} from "../../../stores";
import {useNavigate} from "react-router-dom";
import {MAIN_PATH} from "../../../contant";
import {useCookies} from "react-cookie";


//          component  게시물 작성 컴포넌트          //

export default function BoardWrite() {
    //                  state : 제목 영역 요소 참조 상태                    //
    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    //                  state : 본문 영역 요소 참조 상태                    //
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    //                  state : 이미지 입력 요소 참조 상태                 //
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    //                  state : cookie 상태                       //
    const [cookies, setCookies] = useCookies();

    //                  state : 게시물 상태                  //
    const {title, setTitle} = useBoardStore();
    const {content, setContent} = useBoardStore();
    const {boardImageFileList, setBoardImageFileList} = useBoardStore();
    const {resetBoard} = useBoardStore();

    //                  state : 로그인 유저 상태                   //
    const {loginUser} = useLoginUserStore();

    //                  state 게시물 이미지 미리보기 URL상태                    //
    const  [imageUrls, setImageUrls] = useState<string[]>([]);

    //                  function : 네이게이트 함수                 //
    const navigator = useNavigate();

    //                  event handler : 제목 변경 이벤트 처리                    //
    const onTitleChangeHandler = (event : ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.target
        setTitle(value);
        if (!titleRef.current) return;
        titleRef.current.style.height = 'auto';
        titleRef.current.style.height = `${titleRef.current?.scrollHeight}px`
    }
    //                  event handler : 내용 변경 이벤트 처리                    //
    const onContentChangeHandler = (event : ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.target
        setContent(value)

        if (!contentRef.current) return;

        contentRef.current.style.height = 'auto';
        contentRef.current.style.height = `${contentRef.current?.scrollHeight}px`
    }
    //                  event handler : 이미지 업로드 버튼 클릭 이벤트 처리                    //
    const onImageUploadButtonClickHandler = () => {
        if (!imageInputRef.current) return;
        imageInputRef.current?.click();
    }

    //                  event handler : 이미지 변경 이벤트 처리                   //
    const onImageChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        // 만약 이미지가 들어 있지 않다면 리턴
        if (!event.target.files || !event.target.files.length) return;
        // 이미지가 들어 있다면 이미지를 file 에 매핑
        // file 은 File 타입이고, file name 은 이미지 명 ex) 비비.png , file의 type 은 image/png
        const file = event.target.files[0];
        console.log("file : " + file + ", fileName : " + file.name + " , fileType : "+ file.type)
        // 미리 보기용 URL ,
        // URL.createObjectURL 메서드는 브라우저 환경에서 파일 또는 Blob 객체를 위한 임시 URL을 생성한다.
        // 이 URL은 브라우저의 메모리에만 존재하며, 웹 페이지에서 미리보기 등의 목적으로 사용할 수 있다.
        const imageUrl = URL.createObjectURL(file); // http://localhost:3000/07018ad9-27ca-411c-a876-a0054b27c497 -> 이게 브라우저 메모리에 있는 파일 URL
        //첫 이미지를 등록할 때는 빈 배열 값을 복사해서 newImageUrls 에 넣는 것 이지만, 두번째 이미지 넣을 때는 이전 이미지 상태를 유지하기 위해 이렇게 코드 작성
        // map 돌면서 할 수도 있지만 스프레드 연산자로 간단하게 작성 가능함
        // const newImageUrls = [...imageUrls, imageUrl] << 이렇게 , 기존 imageUrls 값을 복사 하고 , 새로운 값인 imageUrl을 추가해서 newImageUrls에 맵핑
        const newImageUrls = imageUrls.map(img => img);
        // newImageUrls에 imageUrl push
        newImageUrls.push(imageUrl);
        // 미리보기용 값 도 최신화
        setImageUrls(newImageUrls);

        // 이제 사용자가 게시판 업로드 할 시 백엔드로 해당 이미지들 전송 해 줄 백엔드 업로드 용 작성
        // 백엔드 업로드 용 URL
        // 이것도 동일하게 첫 이미지는 빈 배열이지만, 두번째 이미지 일 경우는 이전 상태 유지하기 위해 코드 작성
        const newBoardImageFileList = boardImageFileList.map(img => img);
        // 새로운 이미지 file push ,  근데 여기는 file 푸쉬 하네
        newBoardImageFileList.push(file);
        // 백엔드 용 이미지 최신화
        setBoardImageFileList(newBoardImageFileList);
        // 동일한 이미지 업로드 시 value 초기화 안해주면 안들어감
        if (!imageInputRef.current) return;
        imageInputRef.current.value = ''
    }


    //                  event handler : 이미지 닫기 버튼 클릭 이벤트 처리                 //
    const onImageCloseButtonClickHandler = (deleteIndex : number) => {
        if (!imageInputRef.current) return;
        imageInputRef.current.value = '';
        //미리보기 URL
        const newImageUrls = imageUrls.filter((url, index) => index !== deleteIndex)
        setImageUrls(newImageUrls);
        // 백엔드 업로드용 URL
        const newBoardImageFileList = boardImageFileList.filter((url,index) => index !== deleteIndex)
        setBoardImageFileList(newBoardImageFileList);

    }


    //                  effect : 첫 마운트 시 실행될 함수                 //
    useEffect(() => {
        const accessToken = cookies.accessToken;
        if (!accessToken){
            navigator(MAIN_PATH());
            return;
        }

        resetBoard();
    }, [])

  return (
      <div id='board-write-wrapper'>
        <div className='board-write-container'>
          <div className='board-write-box'>
              <div className='board-write-title-box'>
                  <textarea ref={titleRef} className='board-write-title-textarea' rows={1}  placeholder='제목을 작성해주세요' value={title} onChange={onTitleChangeHandler}/>
              </div>
              <div className='divider'></div>
              <div className='board-write-content-box'>
                  <textarea ref={contentRef} className='board-write-content-textarea' placeholder={'본문을 작성해주세요'} value={content} onChange={onContentChangeHandler}/>
                  <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
                      <div className='icon image-box-light-icon'></div>
                  </div>
                  <input ref={imageInputRef} type={'file'} accept={'image/*'} style={{display : 'none'}} onChange={onImageChangeHandler}/>
              </div>
              {imageUrls.map((imageUrl, index) =>
                  (
                  <div className='board-write-images-box'>
                      <div className='board-write-image-box'>
                          <img className='board-write-image' src={imageUrl}/>
                          <div className='icon-button image-close'onClick={ () => onImageCloseButtonClickHandler(index)}>
                              <div className='icon close-icon'></div>
                          </div>
                      </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
  )
}
