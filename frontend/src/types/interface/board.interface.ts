export default interface Board{
  boardNumber : number ;
  title : string;
  content : string;
  boardImageList : string[];
  writeDataTime : string;
  writerEmail : string;
  writerNickname : string;
  writerProfileImage : string | null;
}