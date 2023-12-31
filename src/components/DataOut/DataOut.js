import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deluser } from 'phonebookStore/phoneBookSlice';
import { changeContact } from '../../API/changeContactAPI';
import { changeButtonActive } from '../../phonebookStore/phoneBookSlice';
import { changeContactStore } from '../../phonebookStore/phoneBookSlice';
import { changeActiveInstruction } from '../../phonebookStore/phoneBookSlice';
// import { deleteAPI } from '../../API/DeleteContact';

// add css modules
import o from './DataOut.module.css';

import { deleteContact } from '../../API/delContactAPI';

export const DataOut = ({ print }) => {

  const[changeItem, setChangeItem] = useState(false);
  const[changeButtonVisibility, setChangeButtonVisibility] = useState(false);
  const[instructionKey, setInstructionKey] = useState(false);
  const[changeInputValue, setChangeInputValue] = useState('');

  const selector = useSelector(state => state.phonebook.filter);
  const selectorToken = useSelector(state => state.logIn.token);
  const selectorItem = useSelector(state => state.phonebook.items);

  const dispatch = useDispatch();

  // chage data in App 'state' (delete user) 
  const deleteUser = evt => {
 
    // dispatch(deleteAPI(evt.target.name)); 
    dispatch(deleteContact({id:evt.target.name, token: selectorToken})).then(response => {
      dispatch(deluser(evt.target.name));
    });
    
  };

  // activ/unactive change mode
  const changeActive = evt => {
    
    dispatch(changeButtonActive(evt.currentTarget.id));
      
    if (selectorItem.find(value => value.id === evt.currentTarget.id).active === true && evt.target.type !== 'text') {
     
      setChangeItem(true);

    } 
    if (selectorItem.find(value => value.id === evt.currentTarget.id).active === false && evt.target.type !== 'text'){
      
      setChangeItem(false);

    }

    // deactivate change button
    setChangeButtonVisibility(false);
    
  };

  // change API contact  and in store
  const changeCurrentContact = evt => {
    console.log("!");
    // don't change conctact if user didn't change anything
    if(changeInputValue !== '') {
      // send transform store's string 'Jack Kolins 2323-23-23' to '{name: Jack Kolins, number: 2323-23-23}'
      dispatch(changeContact({id:evt.target.name, token: selectorToken, 
        name: changeInputValue.split('')
        .reduce((total, amount) => {if(!'0123456789-'.includes(amount)) {total.push(amount)} return total}, []).join(''),
          number: changeInputValue.split('')
          .reduce((total, amount) => {if('0123456789-'.includes(amount)) {total.push(amount)} return total}, []).join('')}, 
          )).then(response => {
        dispatch(changeContactStore({name: changeInputValue, id: evt.target.name}));
        // clear change contact value
        setChangeInputValue('');
        // deactivate change button
        setChangeButtonVisibility(false);
      });
    }
  };

  // track new value of change contact input
  const changeInputHandler = evt => {

    if(selectorItem.length !== 0) {
      // activate change button
      if(evt.target.value !== selectorItem.find(value => value.id === evt.target.id).name) {

        setChangeButtonVisibility(true);
        setChangeInputValue(evt.target.value);

      } else {

        setChangeButtonVisibility(false);
        setChangeInputValue('');

      }
     
    }

  };

  // visibility instruction, when hover contact item
  const onInstruction = (evt) => {

    dispatch(changeActiveInstruction({id: evt.currentTarget.id , value: true,})); 

    if (selectorItem.find(value => value.id === evt.currentTarget.id).activeInstruction === false && evt.target.type !== 'button') {
     
      setInstructionKey(true);

    } 
   
  };

  // unvisibility instruction, when hover contact item
  const offInstruction = (evt) => {
    dispatch(changeActiveInstruction({id: evt.currentTarget.id , value: false,})); 
    
    if (selectorItem.find(value => value.id === evt.currentTarget.id).activeInstruction === true && evt.target.type !== 'button') {
     
      setInstructionKey(false);

    } 
  };

  // out data in App 'state' if user name or number contain filter
  return print.name
    .toLowerCase()
    .includes(selector) ? (
    <li className={changeItem ? o.itemActive : o.item} id={print.id} onClick={changeActive} onMouseOut={offInstruction} onMouseOver={onInstruction}>

     { changeItem ? <input className={o.inputChange} type={'text'} autoFocus maxLength={40} id={print.id} defaultValue={print.name} onChange={changeInputHandler}></input> : <p className={o.p}>{print.name}</p>}
     { instructionKey ? <p className={o.inst}>Click to open/close change mode.</p> : <p className={o.inst}></p>}

      <div className={o.buttonSet}>
        { changeButtonVisibility ? <button
          className={o.button}
          name={print.id}
          type="button"
          onClick={changeCurrentContact}
        > 
          Change
        </button> : ''}

        <button
          className={o.button}
          name={print.id}
          type="button"
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
     
    </li>
  ) : (
    ''
  );
}