import { User } from "types/interface";
import { create } from "zustand";

interface LoginUserStore {

  loginUser : User | null ;
  setLoginUser : (loginUser : User) => void;
  resetLoginUser : () => void;
}
//          create는 zustand 의 create 로 사용
const useLoginUserStore =  create<LoginUserStore> (set => ({
  loginUser : null,
  setLoginUser : (loginUser) => set(state => ({...state, loginUser})),
  resetLoginUser : () => set(state => ({...state, loginUser : null}))
})); 

export default useLoginUserStore;