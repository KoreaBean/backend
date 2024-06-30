import ResponseDto from "../response.dto";
import {CommnetListItem} from "../../../types/interface";

export default interface GetCommentListResponseDto extends ResponseDto{
    commentList : CommnetListItem[]
}