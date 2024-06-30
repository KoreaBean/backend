import {SignInRequestDto, SignUpRequestDto} from "./request/auth";
import axios from "axios";
import {SignInResponseDto, SignUpResponseDto} from "./response/auth";
import {ResponseDto} from "./response";
import {GetCommentListResponseDto} from "./response/board";
import {networkInterfaces} from "os";
import responseDto from "./response/response.dto";
import {GetSignInUserResponseDto} from "./response/user";

const DOMAIN = 'http://localhost:8080';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UN_URL = () => `${API_DOMAIN}/auth/sign-up`;
const authorization = (accessToken : string) => {
    return {headers: {Authorization: `Bearer ${accessToken}`}}
}

// const GET_FAVORITE_LIST_URL = (boardNumber : number | string) => {`${API_DOMAIN}/board/${boardNumber}/favorite-list`}
//
// const GET_COMMENT_LIST_URL = (boardNumber : string | number) => {`${API_DOMAIN}/board/${boardNumber}/comment-list`}

// export const getFavoriteListRequest = async (boardNumber : number | string) => {
//
//     const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
//         .then(response => {
//             const responseBody = GetFavoriteListResponseDto = response.data;
//             return responseBody;
//         }).catch(error => {
//             if (!error.response) return null;
//             const responseBody : ResponseDto =error.response.data;
//             return responseBody;
//         })
//
//     return result ;
//
// }

// export const getCommentListRequest = async (boardNumber : string | number) => {
//     const result = await  axios.get(GET_COMMENT_LIST_URL(boardNumber))
//         .then(response => {
//             const responseBody : GetCommentListResponseDto = response.data
//             return responseBody;
//         }).catch(error => {
//             if (!error.response) return null
//             const responseBody : responseDto = error.response.data
//             return responseBody;
//         })
//
//     return result
// }


export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(),requestBody)
        .then(response => {
            const responseBody : SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody
        })
    return result;
}
export const signUnRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UN_URL(),requestBody)
        .then(response => {
            const responseBody : SignUpResponseDto = response.data;
            return responseBody
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody
        })
    return result
}

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const getSignInUserRequest = async (accessToken : string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(response => {
            const responseBody : GetSignInUserResponseDto = response.data;
            return responseBody;
        }).catch(error => {
            if (!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })
}

