import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deluser } from 'phonebookStore/phoneBookSlice';
import { changeButtonActive } from '../../phonebookStore/phoneBookSlice'
// import { deleteAPI } from '../../API/DeleteContact';

// add css modules
import o from './DataOut.module.css';

import { deleteContact } from '../../API/delContactAPI';

export const DataOut = ({ print }) => {

  const[changeItem, setChangeItem] = useState(false);

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

  const changeContact = (evt) => {
    
    dispatch(changeButtonActive());
   
    if (selectorItem.map(value => { return value.id === evt.target.name}).active) {
      evt.target.style.backgroundColor='grey'  
      setChangeItem(true);
    } else {
      evt.target.style.backgroundColor='lightgrey';
      setChangeItem(false);
    }
  };

  // out data in App 'state' if user name or number contain filter
  return print.name
    .toLowerCase()
    .includes(selector) ? (
    <li className={o.item} onClick={changeContact}>
     { changeItem ? <input defaultValue={print.name}></input> : <p> {print.name}</p>}
      <button
        className={o.button}
        name={print.id}
        type="button"
        onClick={deleteUser}
      >
        Delete
      </button>
    </li>
  ) : (
    ''
  );
}