import {KeyboardEvent,ChangeEvent, forwardRef} from 'react'
import './style.css';

interface Props {

  label : string;
  type : 'text' | 'password';
  placeholder : string;
  value : string;
  onChange : (event : ChangeEvent<HTMLInputElement>) => void;
  error : boolean;

  // icon이 없으면 null 이 나올 수 있음. 필수가 아닌 값은 ? 붙여주기.
  icon? : 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';

  onButtonClick? :() => void;

  message? : string;

  onKeyDown? : (event : KeyboardEvent<HTMLInputElement>) => void;

}

//          component : InputBox 컴포넌트               //
const InputBox = forwardRef<HTMLInputElement,Props>((props : Props,ref) => {

const {label, type,error, placeholder, value, onChange, onButtonClick, icon, message, onKeyDown} = props;



//          event handler : input 키 이벤트 처리 함수       //
const onKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
  if(!onKeyDown) return;
  onKeyDown(event);
} 


  return (
    <div className='inputbox'>
      <div className='inputbox-lable'>{label}</div>
      <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
        <input ref={ref} type={type} className='input'placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler} />
        {onButtonClick !== undefined && (
          <div className='icon-button' onClick={onButtonClick}>
            {icon !== undefined && (<div className={`icon ${icon}`}></div>)}
          </div>
        )}
      </div>
      {message !== undefined && <div className='inputbox-message'>{message}</div>}
    </div>
  )
});

export default InputBox;