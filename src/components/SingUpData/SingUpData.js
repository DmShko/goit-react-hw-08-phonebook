import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate  } from "react-router-dom";

import { addAPI } from '../../API/addUserAPI';

// import { change } from '../../phonebookStore/singUpSlice'

import sinp from './SingUpData.module.css'

export const SingUpData = () => {
  const [ nameValue, setNameValue] = useState('');
  const [ emailValue, setEmailValue] = useState('');
  const [ password, setPassword] = useState('');
  const [nameValid, setInputNameValid] = useState(true);
  const [emailValid, setInputEmailValid] = useState(true);
  const [passwordValid, setInputPasswordValid] = useState(true);


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const clearInputs = () => {
    setNameValue('');
    setEmailValue('');
    setPassword('');
  };

  const addUser = evt => {
    
    // transfer data only, if valid fields is valid
    if (nameValid === false && emailValid === false && passwordValid === false) {
      
      evt.preventDefault();

      dispatch(addAPI({name: nameValue, email: emailValue, password: password})).then(response => { 
         
          if(response.payload === 201) navigate("/login", { replace: true })
        }
      );

    } else {
      evt.preventDefault();
    }  

    clearInputs();
  };

  // check user data (input)
  const checkValid = (data) => {
    
    if (data.validity.patternMismatch === false) {

      switch(data.name) {
        case ('name'):
          setInputNameValid(value => value && data.validity.patternMismatch);
          break;
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
          case ('name'):
            setInputNameValid(value => value || data.validity.patternMismatch);
            break;
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
      case ('name'):
        setNameValue(value);
        break;
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
    <form className={sinp.fise} onSubmit={addUser}>
        <fieldset>
          <legend>SingUp</legend>

            <div className={sinp.field}>
              <label className={sinp.lab}> Name
                <input className={sinp.in} type="text"
              value={nameValue}
              name='name'
              onChange={userDataChange}
              autoComplete="off"
              autoFocus
              // pattern="\w{0}[a-zA-Zа-яА-Я]+\s\w{0}[a-zA-Zа-яА-Я]+"
              placeholder="Enter name..."></input>
            </label>

            <label className={sinp.lab}> Email
                <input className={sinp.in} type="text"
              value={emailValue}
              name='email'
              onChange={userDataChange}
              autoComplete="off"
              // pattern="\w{0}[a-zA-Zа-яА-Я]+\s\w{0}[a-zA-Zа-яА-Я]+"
              placeholder="Enter email..."></input>
            </label>

            <label className={sinp.lab}> Password
                <input className={sinp.in} type="password"
              value={password}
              name='password'
              onChange={userDataChange}
              autoComplete="off"
              // pattern="\w{0}[a-zA-Zа-яА-Я]+\s\w{0}[a-zA-Zа-яА-Я]+"
              placeholder="Enter password..."></input>
            </label>

            <button className={sinp.button}>SingUp</button>
            </div>
          
        </fieldset>
    </form>
  );
};
