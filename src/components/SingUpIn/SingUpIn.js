import { useState } from 'react';

// import { addAPI } from '../../API/addUserAPI';
import Notiflix from 'notiflix';

// add css modules
import di from './DataIn.module.css';
import { getAPI } from 'API/GetContacts';

export const DataIn = () => {
  const [ nameValue, setNameValue] = useState('');
  const [ emailValue, setEmailValue] = useState('');
  const [ password, setPassword] = useState('');
  const [nameValid, setInputNameValid] = useState(true);
  const [emailValid, setInputEmailValid] = useState(true);
  const [passwordValid, setInputPasswordValid] = useState(true);

  const addUser = evt => {
    
    // transfer data only, if valid fields is valid
    if (nameValid === false && emailValid === false && passwordValid === false) {

     
      evt.preventDefault();
    }
      

    clearInputs();
  };

  // check user data (input)
  const checkValid = (data) => {
    if (data.validity.patternMismatch === false) {

      switch(data) {
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
        switch(data) {
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
    <form onSubmit={addUser}>
        <fieldset>
          <legend>SingUp</legend>

          <label> Name
            <input type="text"
          value={nameValue}
          name='name'
          onChange={userDataChange}
          autoComplete="off"
          autoFocus
          placeholder="Enter name..."></input>
          </label>

          <label> Email
            <input type="text"
          value={emailValue}
          name='email'
          onChange={userDataChange}
          autoComplete="off"
          autoFocus
          placeholder="Enter surname..."></input>
          </label>

          <label> Password
            <input type="text"
          value={password}
          name='password'
          onChange={userDataChange}
          autoComplete="off"
          autoFocus
          placeholder="Enter password..."></input>
          </label>

          <button>SingUp</button>
        </fieldset>
    </form>
  );
};
