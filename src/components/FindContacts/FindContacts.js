import { useSelector, useDispatch } from 'react-redux';
// import { changeFilter } from 'phonebookStore/singUpSlice';

// add css modules
import fi from '../FindContacts/FindContacts.module.css';

export const FindContacts = () => {

  const find = useSelector(state => state.phonebook.filter);
  const dispatch = useDispatch();

  const findContact = evt => {
    
    // send value of filter to reducer function
    // dispatch(changeFilter(evt.target.value.toLowerCase()));
    
  };

  return (
    
    <label className={fi.label}>
      Find contact by name
      <input
        value={find}
        className={fi.input}
        name="userFind"
        type="text"
        onChange={findContact}
      ></input>
    </label>
  
  );
}

