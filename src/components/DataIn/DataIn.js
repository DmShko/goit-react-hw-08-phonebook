import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { add } from '../phonebookStore/phonebookSlice';
// import { addAPI } from '../../API/AddContact';
import Notiflix from 'notiflix';

import { addContact } from '../../API/addContactAPI'
import { add } from '../../phonebookStore/phoneBookSlice'
import { ReactComponent as LogWarning } from '../../images/warning-svgrepo-com.svg'

// add css modules
import di from './DataIn.module.css';

export const DataIn = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { register, handleSubmit, formState:{errors}, reset} = useForm({mode: 'onBlur'});
 
  // const [inputNameValid, setInputNameValid] = useState('');
  // const [inputNumberValid, setInputNumberValid] = useState('');

  const dispatch = useDispatch();
  const selector = useSelector(state => state.phonebook.items);
  const selectorToken = useSelector(state => state.logIn.token);

  // const clearInputs = () => {
  //   setName('');
  //   setNumber('');
  // };

  // transfer contacts data to method in App 'reducer'
  const addUser = (_, evt) => {
    // transfer data only, if valid fields is valid
    // if (inputNameValid === false && inputNumberValid === false) {
 
      evt.preventDefault();
      
      if (
        selector.find(element => element.name === [name, number].join(' ')) !==
        undefined
      ) {
        Notiflix.Notify.warning(`"${name}" is already in contacts!`, {
          position: 'center-top',
          fontSize: '24px',
        });
      } else {
        // sdd user to Redux store
        dispatch(addContact({data:{name, number}, token: selectorToken})).then(response =>
          {
            dispatch(add({name, number, response}))}
        );
      }

      // dispatch(add({name, number,}));
    // } else {
    //   evt.preventDefault();
    // }

    reset({Name: '', Number: ''});
    // clearInputs();
  };

  // const checkValid = data => {
  //   // CHANGE 'VALID' PROPERTIES OF inputs ON BASE PREVIOUS VALUE
  //   if (data.validity.patternMismatch === false) {
  //     data.name === 'name'
  //       ? setInputNameValid(value => value && data.validity.patternMismatch)
  //       : setInputNumberValid(value => value && data.validity.patternMismatch);
  //   } else {
  //     data.name === 'name'
  //       ? setInputNameValid(value => value || data.validity.patternMismatch)
  //       : setInputNumberValid(value => value || data.validity.patternMismatch);
  //   }
  // };

  const stateChange = data => {
    const { name, value } = data;

    // change 'name' and 'number' without use previous value
    name === 'Name' ? setName(value) : setNumber(value);

  };

  const inputChange = evt => {
    // change valid properties of inputs states, so that output users only, if bouth input fields contain valid value
    // checkValid(evt.target);
    // change 'name' and 'number' fields in 'data'
    stateChange(evt.target);
  };

  return (
    <>
      <form onSubmit={handleSubmit(addUser)} className={di.form}>
        <label className={di.lable}>
          <p className={di.text}>Name</p>
          <input {...register('Name', {required: 'Please fill the Name field!', 
          
            maxLength: {value:16, message: 'Invalid length!'},  value:name, pattern: {value: /\w{0}[a-zA-Zа-яА-Я]+\s\w{0}[a-zA-Zа-яА-Я]+/, message: 'Invalid Name!'}})}
            
            className={di.input}
           
            style={errors?.Name ? {borderBottom: 'orange solid 3px'} : {borderBottom: 'lightblue solid 3px'}}
            // name="name"
            type="text"
            // maxLength={16}
            onChange={inputChange}
            // pattern="\w{0}[a-zA-Zа-яА-Я]+\s\w{0}[a-zA-Zа-яА-Я]+"
            title="Please, use only letters and space in the following form: ... ...!"
            placeholder="Only letters ... ..."
           
          ></input>
        </label>

        <label className={di.lable}>
          <p className={di.text}>Number</p>
          <input
            {...register('Number', {required: 'Please fill the Number field!', 
            
            maxLength: {value:11, message: 'Invalid length!'}, value:number, pattern: {value: /\d{0}[0-9]+-\d{0}[0-9]+-\d{0}[0-9]+/, message: 'Invalid Number!'}})}

            className={di.input}
            
            style={errors?.Number ? {borderBottom: 'orange solid 3px'} : {borderBottom: 'lightblue solid 3px'}}

            // name="number"
            type="tel"
            // maxLength={11}
            onChange={inputChange}
            // pattern="\d{0}[0-9]+-\d{0}[0-9]+-\d{0}[0-9]+"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +
            in the following form: ...-...-...!"
            placeholder="Only digits ...-...-..."
            // required
          ></input>
        </label>

        <button className={di.button} type="submit">
          Add contact
        </button>
        
      </form>
      <div className={di.warning}>
        <LogWarning style={{width: '25px', height: '25px', stroke: 'orange'}}/>
        <div style={{height: '10px', width: '100%'}}> {errors?.Name ? <p style={{fontSize: '16px', color: 'orange', margin: 0}}>{errors?.Name ? errors?.Name?.message : ''}</p> 
        : <p style={{fontSize: '16px', color: 'orange', margin: 0}}>{errors?.Number ? errors?.Number?.message: ''}</p>}</div>
      </div>
      
    </>
  );
};
