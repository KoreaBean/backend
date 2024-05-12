import {ResponseCode} from "../../types/emun";

interface ResponseDto{
    code : ResponseCode;
    message : string;
}

export default ResponseDto;