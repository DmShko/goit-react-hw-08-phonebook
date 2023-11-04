import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from "react-router-dom";

import { onAPI } from '../../API/onUserAPI';
// import { Loader } from 'components/Loader/Loader';

import logi from './LogInData.module.css'

export const LogInData = () => {

  const [ emailValue, setEmailValue] = useState('');
  const [ password, setPassword] = useState('');
  
  const [emailValid, setInputEmailValid] = useState(true);
  const [passwordValid, setInputPasswordValid] = useState(true);

  const selectorStatusTextLogIn = useSelector(state => state.logIn.statusText);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if(selectorStatusTextLogIn === 'OK') navigate("/", { replace: true });
    // eslint-disable-next-line
  },[selectorStatusTextLogIn])

  const clearInputs = () => {
   
    setEmailValue('');
    setPassword('');
  };

  const logIn = evt => {
    
    // transfer data only, if valid fields is valid
    if (emailValid === false && passwordValid === false) {

      evt.preventDefault();

      dispatch(onAPI({email: emailValue, password: password}));

    }else {
      evt.preventDefault();
    }  

    clearInputs();
  };

  // check user data (input)
  const checkValid = (data) => {
    if (data.validity.patternMismatch === false) {

      switch(data.name) {
        case ('email'):
          setInputEmailValid(value => value && data.validity.patternMismatch);
          break;
        case ('password'):
          setInputPasswordValid(value => value && data.validity.patternMismatch);
          break;
        default:;
      }
              
    } else {
        switch(data.name) {
          case ('email'):
            setInputEmailValid(value => value || data.validity.patternMismatch);
            break;
          case ('password'):
            setInputPasswordValid(value => value || data.validity.patternMismatch);
            break;
          default:;
      }
    }
  };

  const stateChange = data => {

    const { name, value } = data;

    // change data without use previous value
    switch(name) {
      case ('email'):
        setEmailValue(value);
        break;
      case ('password'):
        setPassword(value);
        break;
      default:;
    }
    
  };

  // event press submit button
  const userDataChange = evt => {

    checkValid(evt.target);

    stateChange(evt.target);

  };

  return (
   <form onSubmit={logIn}>
        <fieldset >
          <legend >LogIn</legend>
            <div className={logi.field}>
              <label className={logi.lab}> Email
                <input
                type="text"
                value={emailValue}
                name='email'
                onChange={userDataChange}
                autoComplete="off"
                autoFocus
                placeholder="Enter email..."></input>
              </label>

            <label className={logi.lab}> Password
              <input
              type="text"
              value={password}
              name='password'
              onChange={userDataChange}
              autoComplete="off"
              
              placeholder="Enter password..."></input>
            </label>

            <button>LogIn</button>
          </div>
          
        </fieldset>
    </form>
  );
}